import 'dart:async';
import 'dart:io';

import 'package:drift/drift.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:workmanager/workmanager.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:logger/logger.dart';

import 'package:caritahub_alwayson/core/constants.dart';
import 'package:caritahub_alwayson/core/enums.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';
import 'package:caritahub_alwayson/services/health/health_data_collector.dart';
import 'package:caritahub_alwayson/services/location/location_service.dart';
import 'package:caritahub_alwayson/services/sync/sync_engine.dart';

// ── Top-level entry points ──────────────────────────────────────────────────
//
// flutter_background_service and workmanager require top-level Dart functions
// (not static class methods) as entry points. The Dart VM resolves entry
// points by callback handle and will reject class members that aren't
// properly annotated for native access.
//
// All background logic lives here (file-level). BackgroundServiceManager
// only handles main-isolate control (start/stop/health checks).

final _bgLog = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
    dateTimeFormat: DateTimeFormat.onlyTimeAndSinceStart,
  ),
  filter: ProductionFilter(),
);

/// Entry point called by flutter_background_service when the service starts.
/// Runs in a separate Dart isolate — no access to main isolate state.
@pragma('vm:entry-point')
void bgServiceOnStart(ServiceInstance service) async {
  _bgLog.i('Background service isolate started');

  // Call setAsForegroundService IMMEDIATELY — before any DB or heavy init.
  // Android requires startForeground() within 5 seconds of startForegroundService().
  // The Flutter isolate startup + DB init can exceed that budget if delayed.
  if (service is AndroidServiceInstance) {
    await service.setAsForegroundService();
    _bgUpdateNotification(service, AppConstants.serviceNotificationTitle,
        'Health monitoring active');
  }

  try {
    final db = AppDatabase();
    final locationSvc = LocationService(db: db);
    Timer? syncTimer;
    Timer? gpsTimer;

    // Stop command from main isolate.
    if (service is AndroidServiceInstance) {
      service.on('stopService').listen((_) {
        _bgLog.i('Received stopService command');
        syncTimer?.cancel();
        gpsTimer?.cancel();
        service.stopSelf();
      });
    }

    // Delay first sync cycle by 60 s to avoid DB write conflict with the
    // main isolate which runs health collection immediately on app open.
    await Future.delayed(const Duration(seconds: 60));
    await _bgRunSyncCycle(db: db, service: service);

    syncTimer = Timer.periodic(
      AppConstants.dataCollectionInterval,
      (_) => _bgRunSyncCycle(db: db, service: service),
    );

    // GPS logging every 30 minutes (first log after 30 min delay so the
    // user has time to grant background location permission).
    gpsTimer = Timer.periodic(
      const Duration(minutes: 30),
      (_) => _bgLogGps(locationSvc),
    );

    service.invoke('serviceRunning', {'isRunning': true});
  } catch (e, st) {
    _bgLog.e('Background service fatal error', error: e, stackTrace: st);
  }
}

/// iOS background fetch handler.
@pragma('vm:entry-point')
Future<bool> bgServiceOnIosBackground(ServiceInstance service) async {
  try {
    final db = AppDatabase();
    await _bgRunSyncCycle(db: db, service: service);
  } catch (e, st) {
    _bgLog.e('iOS background handler error', error: e, stackTrace: st);
  }
  return true;
}

/// WorkManager entry point — runs as a watchdog every 15 minutes.
@pragma('vm:entry-point')
void bgCallbackDispatcher() {
  Workmanager().executeTask((taskName, inputData) async {
    _bgLog.i('WorkManager watchdog fired: $taskName');

    try {
      final running = await FlutterBackgroundService().isRunning();

      if (!running) {
        _bgLog.w('Foreground service not running — restarting');
        await FlutterBackgroundService().startService();
      }

      final db = AppDatabase();

      // GPS: log position if last log was more than 25 min ago
      // (guards against double-logging when foreground service is also running).
      try {
        final lastLog = await db.getLastLocationLog();
        final shouldLogGps = lastLog == null ||
            DateTime.now().difference(lastLog.timestamp).inMinutes >= 25;
        if (shouldLogGps) {
          final locationSvc = LocationService(db: db);
          await _bgLogGps(locationSvc);
        }
      } catch (e) {
        _bgLog.w('WorkManager GPS log skipped: $e');
      }

      await _bgRunSyncCycle(
        db: db,
        service: null,
        triggerSource: TriggerSource.workManager,
      );

      return true;
    } catch (e, st) {
      _bgLog.e('WorkManager watchdog error', error: e, stackTrace: st);
      return false;
    }
  });
}

// ── File-level background helpers ───────────────────────────────────────────

Future<void> _bgRunSyncCycle({
  required AppDatabase db,
  ServiceInstance? service,
  TriggerSource triggerSource = TriggerSource.foregroundService,
}) async {
  final cycleStart = DateTime.now();
  _bgLog.i('Sync cycle started (trigger: ${triggerSource.value})');

  // 0. Attempt health data collection.
  //    Health Connect reads work from a Service context (no Activity needed).
  //    Wrapped in try-catch: if the plugin isn't available in this isolate the
  //    service keeps running — it just won't show steps on the notification.
  int stepsCaptured = 0;
  try {
    final collector = HealthDataCollector(db: db);
    final result = await collector.collectNow();
    stepsCaptured = result < 0 ? 0 : result;
    _bgLog.i('Background health collection: $stepsCaptured steps');
  } catch (e) {
    _bgLog.w('Background health collection skipped: $e');
  }

  // 1. Heartbeat.
  try {
    await db.insertHeartbeat(ServiceHeartbeatsCompanion.insert(
      timestamp: cycleStart,
      platform: Platform.isAndroid ? 'android' : 'ios',
      triggerSource: triggerSource.value,
      stepsCaptured: Value(stepsCaptured),
    ));
    _bgLog.d('Heartbeat recorded');
  } catch (e, st) {
    _bgLog.e('Heartbeat recording failed', error: e, stackTrace: st);
  }

  // 2. Update notification.
  final timeStr = _bgFormatTime(cycleStart);
  if (service is AndroidServiceInstance) {
    final body = stepsCaptured > 0
        ? '$stepsCaptured steps · last sync $timeStr'
        : 'Monitoring active · last sync $timeStr';
    _bgUpdateNotification(service, AppConstants.serviceNotificationTitle, body);
  }

  // 3. Sync if connected.
  try {
    final connectivity = await Connectivity().checkConnectivity();
    final isConnected =
        connectivity.any((r) => r != ConnectivityResult.none);

    if (isConnected) {
      await _bgTriggerSync(db);
    } else {
      _bgLog.d('No connectivity — sync deferred');
    }
  } catch (e, st) {
    _bgLog.e('Sync trigger failed', error: e, stackTrace: st);
  }

  final elapsed = DateTime.now().difference(cycleStart);
  _bgLog.i('Sync cycle complete in ${elapsed.inSeconds}s');
}

/// Logs the current GPS position and emits home-transition events.
/// Non-fatal: if GPS unavailable or permission denied, logs and returns.
Future<void> _bgLogGps(LocationService locationSvc) async {
  try {
    final hasPermission = await LocationService.hasPermission();
    if (!hasPermission) {
      _bgLog.w('GPS log skipped — location permission not granted');
      return;
    }
    final event = await locationSvc.logCurrentPosition();
    if (event != null) {
      _bgLog.i('📍 Location event: $event');
    } else {
      _bgLog.d('📍 GPS position logged (no home transition)');
    }
  } catch (e, st) {
    _bgLog.e('GPS logging failed', error: e, stackTrace: st);
  }
}

Future<void> _bgTriggerSync(AppDatabase db) async {
  SyncEngine? engine;
  try {
    engine = SyncEngine(
      database: db,
      baseUrl: 'https://caritahub-aac-dev.int.weeswares.com',
    );
    await engine.syncAll();
    _bgLog.d('Sync completed');
  } catch (e, st) {
    _bgLog.e('Sync failed', error: e, stackTrace: st);
  } finally {
    engine?.dispose();
  }
}

void _bgUpdateNotification(
    AndroidServiceInstance service, String title, String content) {
  service.setForegroundNotificationInfo(title: title, content: content);
}

String _bgFormatTime(DateTime dt) {
  final h = dt.hour.toString().padLeft(2, '0');
  final m = dt.minute.toString().padLeft(2, '0');
  return '$h:$m';
}

// ───────────────────────────────────────────────────────────────────────────

/// Main-isolate controller for the always-on background service.
///
/// Handles initialization, start/stop, and health checks.
/// All background isolate logic lives in the top-level functions above.
class BackgroundServiceManager {
  BackgroundServiceManager._();

  static final _log = Logger(
    printer: PrettyPrinter(
      methodCount: 0,
      dateTimeFormat: DateTimeFormat.onlyTimeAndSinceStart,
    ),
    filter: ProductionFilter(),
  );

  static const String _workManagerTaskName = 'caritahub_watchdog';
  static const String _workManagerTaskTag = 'caritahub';

  static const AndroidNotificationChannel _notificationChannel =
      AndroidNotificationChannel(
    AppConstants.serviceNotificationChannelId,
    AppConstants.serviceNotificationChannelName,
    description: 'Persistent notification for health data monitoring',
    importance: Importance.low,
    showBadge: false,
  );

  static const int _notificationId = 888;

  // ── Initialization ──────────────────────────────────────────────────────

  static Future<void> initialize() async {
    _log.i('Initializing background service components');

    try {
      await _initNotificationChannel();
    } catch (e) {
      _log.e('Notification channel init failed', error: e);
    }

    try {
      await _initForegroundService();
    } catch (e) {
      _log.e('Foreground service init failed', error: e);
    }

    try {
      await _initWorkManager();
    } catch (e) {
      _log.e('WorkManager init failed', error: e);
    }

    _log.i('Background service components initialized');
  }

  static Future<void> _initNotificationChannel() async {
    final plugin = FlutterLocalNotificationsPlugin();

    if (Platform.isAndroid) {
      final android = plugin
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>();
      await android?.createNotificationChannel(_notificationChannel);
    }

    await plugin.initialize(
      const InitializationSettings(
        android: AndroidInitializationSettings('@mipmap/ic_launcher'),
        iOS: DarwinInitializationSettings(),
      ),
    );
  }

  static Future<void> _initForegroundService() async {
    final service = FlutterBackgroundService();

    await service.configure(
      androidConfiguration: AndroidConfiguration(
        onStart: bgServiceOnStart,              // top-level function ✓
        autoStart: false,
        isForegroundMode: true,
        autoStartOnBoot: false,
        notificationChannelId: AppConstants.serviceNotificationChannelId,
        initialNotificationTitle: AppConstants.serviceNotificationTitle,
        initialNotificationContent: 'Starting health monitoring...',
        foregroundServiceNotificationId: _notificationId,
        // Only declare 'health' here. Including 'location' would require
        // ACCESS_FINE_LOCATION to already be granted before startForeground()
        // is called. If the user hasn't granted location permission yet,
        // Android 14+ throws a SecurityException and the notification never
        // appears. The manifest still declares 'location' so GPS logging can
        // work once the user grants the permission.
        foregroundServiceTypes: [
          AndroidForegroundType.health,
        ],
      ),
      iosConfiguration: IosConfiguration(
        autoStart: false,
        onForeground: bgServiceOnStart,         // top-level function ✓
        onBackground: bgServiceOnIosBackground, // top-level function ✓
      ),
    );
  }

  static Future<void> _initWorkManager() async {
    Workmanager().initialize(bgCallbackDispatcher); // top-level function ✓

    await Workmanager().registerPeriodicTask(
      _workManagerTaskName,
      _workManagerTaskName,
      frequency: AppConstants.workManagerInterval,
      tag: _workManagerTaskTag,
      existingWorkPolicy: ExistingPeriodicWorkPolicy.keep,
      constraints: Constraints(
        networkType: NetworkType.notRequired,
        requiresBatteryNotLow: false,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresStorageNotLow: false,
      ),
      backoffPolicy: BackoffPolicy.exponential,
      backoffPolicyDelay: const Duration(minutes: 1),
    );

    _log.i('WorkManager watchdog registered (every 15 min)');
  }

  // ── Service Control ─────────────────────────────────────────────────────

  static Future<void> startService() async {
    _log.i('Starting background service');
    await FlutterBackgroundService().startService();
  }

  static Future<void> stopService() async {
    _log.i('Stopping background service');
    FlutterBackgroundService().invoke('stopService');
  }

  static Future<bool> isRunning() async =>
      FlutterBackgroundService().isRunning();

  // ── Service Health ──────────────────────────────────────────────────────

  static Future<bool> checkServiceHealth() async {
    try {
      final db = AppDatabase();
      final lastHeartbeat = await db.getLastHeartbeat();

      if (lastHeartbeat == null) {
        _log.w('No heartbeat records found — service may not have started');
        return false;
      }

      final elapsed = DateTime.now().difference(lastHeartbeat.timestamp);
      final isHealthy = elapsed < AppConstants.heartbeatWarningThreshold;

      if (!isHealthy) {
        _log.w(
          'Service unhealthy: last heartbeat ${elapsed.inMinutes} min ago '
          '(threshold: ${AppConstants.heartbeatWarningThreshold.inMinutes} min)',
        );
      }

      return isHealthy;
    } catch (e, st) {
      _log.e('Service health check failed', error: e, stackTrace: st);
      return false;
    }
  }

  static Future<void> restartIfNeeded() async {
    final running = await isRunning();
    final healthy = await checkServiceHealth();

    if (!running || !healthy) {
      _log.w('Service restart triggered (running=$running, healthy=$healthy)');
      if (running) {
        await stopService();
        await Future.delayed(const Duration(seconds: 2));
      }
      await startService();
    }
  }

  static Future<double> getUptimePercent({
    Duration window = const Duration(hours: 48),
  }) async {
    try {
      final db = AppDatabase();
      final since = DateTime.now().subtract(window);
      return await db.computeUptimePercent(since);
    } catch (e) {
      _log.e('Failed to compute uptime', error: e);
      return 0.0;
    }
  }
}
