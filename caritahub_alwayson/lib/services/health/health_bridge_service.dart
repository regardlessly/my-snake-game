import 'dart:io' show Platform;

import 'package:health/health.dart';
import 'package:logger/logger.dart';

/// Data class representing a single sleep session.
class SleepSession {
  /// When the sleep session started.
  final DateTime start;

  /// When the sleep session ended.
  final DateTime end;

  /// Total duration of the session.
  Duration get duration => end.difference(start);

  /// Breakdown of sleep stages within this session.
  /// Keys are stage names (e.g. 'deep', 'light', 'rem', 'awake').
  /// Values are durations in minutes.
  final Map<String, int> stages;

  const SleepSession({
    required this.start,
    required this.end,
    this.stages = const {},
  });

  @override
  String toString() =>
      'SleepSession(start: $start, end: $end, duration: ${duration.inMinutes}m, stages: $stages)';
}

/// Abstracts Health Connect (Android) and HealthKit (iOS) via the `health`
/// package. Provides a unified API for reading step counts, sleep sessions,
/// and heart rate data across both platforms.
///
/// This is a singleton -- obtain the instance via [HealthBridgeService()].
class HealthBridgeService {
  static final HealthBridgeService _instance = HealthBridgeService._internal();
  factory HealthBridgeService() => _instance;
  HealthBridgeService._internal();

  final Health _health = Health();
  final Logger _log = Logger(
    printer: PrettyPrinter(methodCount: 0),
    filter: ProductionFilter(),
  );

  bool _configured = false;

  // ---------------------------------------------------------------------------
  // Health data types per platform
  // ---------------------------------------------------------------------------

  /// The step-counting type is the same enum on both platforms; the health
  /// package handles the underlying mapping.
  static const HealthDataType _stepsType = HealthDataType.STEPS;
  static const HealthDataType _heartRateType = HealthDataType.HEART_RATE;

  /// Sleep types that we request permission for. On Android, SLEEP_SESSION is
  /// available (Health Connect) while on iOS we rely on SLEEP_ASLEEP /
  /// SLEEP_IN_BED etc.
  static List<HealthDataType> get _sleepTypes {
    if (Platform.isAndroid) {
      return const [
        HealthDataType.SLEEP_SESSION,
        HealthDataType.SLEEP_ASLEEP,
        HealthDataType.SLEEP_AWAKE,
        HealthDataType.SLEEP_DEEP,
        HealthDataType.SLEEP_LIGHT,
        HealthDataType.SLEEP_REM,
      ];
    }
    // iOS
    return const [
      HealthDataType.SLEEP_ASLEEP,
      HealthDataType.SLEEP_AWAKE,
      HealthDataType.SLEEP_IN_BED,
      HealthDataType.SLEEP_DEEP,
      HealthDataType.SLEEP_LIGHT,
      HealthDataType.SLEEP_REM,
    ];
  }

  /// All types we need read-access to.
  List<HealthDataType> get _allReadTypes => [
        _stepsType,
        _heartRateType,
        ..._sleepTypes,
      ];

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  /// Ensures the underlying [Health] plugin is configured exactly once.
  Future<void> _ensureConfigured() async {
    if (_configured) return;
    await _health.configure();
    _configured = true;
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /// Returns `true` if the health platform is available on this device.
  ///
  /// On Android this checks whether Health Connect is installed. On iOS this
  /// always returns `true` (HealthKit is a system framework).
  Future<bool> isAvailable() async {
    try {
      await _ensureConfigured();
      if (Platform.isAndroid) {
        return await _health.isHealthConnectAvailable();
      }
      // HealthKit is always available on supported iOS versions.
      return true;
    } catch (e, st) {
      _log.e('isAvailable() failed', error: e, stackTrace: st);
      return false;
    }
  }

  /// Returns `true` if health read permissions are currently granted.
  ///
  /// On Android (Health Connect), the platform does not expose permission
  /// status directly. We probe by attempting a small data read — if it
  /// succeeds (even returning zero results) the permissions are granted.
  /// On iOS, `hasPermissions()` returns the actual status.
  Future<bool> checkPermissionsGranted() async {
    try {
      await _ensureConfigured();
      final result = await _health.hasPermissions(_allReadTypes);
      if (result != null) return result;

      // Android: hasPermissions() always returns null. Probe with a read.
      final now = DateTime.now();
      await _health.getHealthDataFromTypes(
        types: [_stepsType],
        startTime: now.subtract(const Duration(hours: 1)),
        endTime: now,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Request read permissions for steps, sleep, and heart rate data.
  ///
  /// Returns `true` when the permission dialog was shown successfully (iOS) or
  /// when the user granted permission (Android). Returns `false` on error or
  /// denial.
  Future<bool> requestPermissions() async {
    try {
      await _ensureConfigured();

      final types = _allReadTypes;
      final permissions = List<HealthDataAccess>.filled(
        types.length,
        HealthDataAccess.READ,
      );

      final granted = await _health.requestAuthorization(
        types,
        permissions: permissions,
      );

      _log.i('requestPermissions() => $granted');
      return granted;
    } catch (e, st) {
      _log.e('requestPermissions() failed', error: e, stackTrace: st);
      return false;
    }
  }

  /// Returns the total step count between [start] and [end].
  ///
  /// Returns `0` if no data is available or on error.
  Future<int> getStepsForRange(DateTime start, DateTime end) async {
    try {
      await _ensureConfigured();

      final steps = await _health.getTotalStepsInInterval(start, end);
      return steps ?? 0;
    } catch (e, st) {
      _log.e('getStepsForRange() failed', error: e, stackTrace: st);
      return 0;
    }
  }

  /// Returns step counts bucketed by hour (0-23) for the given [date].
  ///
  /// The returned map always has 24 entries (keys 0..23). Hours with no data
  /// will have a value of `0`.
  Future<Map<int, int>> getHourlyBuckets(DateTime date) async {
    // Initialise every hour to 0.
    final buckets = <int, int>{for (var h = 0; h < 24; h++) h: 0};

    try {
      await _ensureConfigured();

      final dayStart = DateTime(date.year, date.month, date.day);
      final dayEnd = dayStart.add(const Duration(days: 1));

      // Fetch granular step data points across the day.
      final dataPoints = await _health.getHealthDataFromTypes(
        types: [_stepsType],
        startTime: dayStart,
        endTime: dayEnd,
      );

      // De-duplicate (the health package may return overlapping records from
      // multiple sources).
      final unique = _health.removeDuplicates(dataPoints);

      for (final dp in unique) {
        final value = dp.value;
        if (value is NumericHealthValue) {
          final steps = value.numericValue.toInt();
          // Attribute the steps to the hour of the data point's start time.
          final hour = dp.dateFrom.hour;
          buckets[hour] = (buckets[hour] ?? 0) + steps;
        }
      }
    } catch (e, st) {
      _log.e('getHourlyBuckets() failed', error: e, stackTrace: st);
    }

    return buckets;
  }

  /// Sets up background delivery of health data updates.
  ///
  /// - **iOS (HealthKit):** Registers the app for background delivery so that
  ///   HealthKit wakes the app when new step data arrives.
  /// - **Android (Health Connect):** Health Connect does not support push-style
  ///   background delivery. This method is a no-op on Android; scheduled
  ///   background tasks (e.g. WorkManager) should be used instead to poll for
  ///   new data.
  Future<void> registerBackgroundObserver() async {
    try {
      await _ensureConfigured();

      if (Platform.isIOS) {
        // HealthKit supports enableBackgroundDelivery for specific types.
        // The `health` package does not expose this directly, so we rely on
        // native-side configuration (Info.plist + AppDelegate setup).
        //
        // If the health package adds enableBackgroundDelivery in a future
        // version, call it here:
        //
        // await _health.enableBackgroundDelivery(
        //   HealthDataType.STEPS,
        //   UpdateFrequency.immediate,
        // );
        _log.i(
          'registerBackgroundObserver(): iOS HealthKit background delivery '
          'must be configured via native AppDelegate. Ensure '
          'UIBackgroundModes includes "processing" and HealthKit background '
          'delivery is enabled in the Xcode project capabilities.',
        );
      } else {
        // Android: Health Connect does not support observer-style delivery.
        // Data collection is driven by foreground service / WorkManager /
        // AlarmManager as configured in the background service layer.
        _log.i(
          'registerBackgroundObserver(): Android Health Connect does not '
          'support background delivery. Use WorkManager or foreground '
          'service to poll for new data.',
        );
      }
    } catch (e, st) {
      _log.e('registerBackgroundObserver() failed', error: e, stackTrace: st);
    }
  }

  /// Returns `true` if a wearable sleep data source is available.
  ///
  /// This performs a probe query for a short recent window. If any sleep data
  /// points are returned, we assume a wearable source exists.
  Future<bool> hasSleepDataSource() async {
    try {
      await _ensureConfigured();

      // Probe the last 7 days for any sleep data.
      final now = DateTime.now();
      final weekAgo = now.subtract(const Duration(days: 7));

      final dataPoints = await _health.getHealthDataFromTypes(
        types: _sleepTypes,
        startTime: weekAgo,
        endTime: now,
      );

      return dataPoints.isNotEmpty;
    } catch (e, st) {
      _log.e('hasSleepDataSource() failed', error: e, stackTrace: st);
      return false;
    }
  }

  /// Returns sleep sessions for the given [date].
  ///
  /// The query window spans from 18:00 on the previous day to 12:00 noon on
  /// [date] to capture overnight sleep that starts the evening before.
  ///
  /// Returns an empty list if no wearable data source is available or on
  /// error.
  Future<List<SleepSession>> getSleepSessions(DateTime date) async {
    try {
      await _ensureConfigured();

      // Sleep window: previous day 18:00 -> given date 12:00.
      final queryStart = DateTime(date.year, date.month, date.day - 1, 18);
      final queryEnd = DateTime(date.year, date.month, date.day, 12);

      final dataPoints = await _health.getHealthDataFromTypes(
        types: _sleepTypes,
        startTime: queryStart,
        endTime: queryEnd,
      );

      if (dataPoints.isEmpty) return [];

      final unique = _health.removeDuplicates(dataPoints);

      // Group data points into sessions. A "session" type (SLEEP_SESSION on
      // Android or SLEEP_IN_BED on iOS) defines the overall session boundary.
      // Individual stage data points (deep, light, rem, awake) that fall
      // within a session boundary are merged into that session's stages map.

      // First, extract session boundaries.
      final sessionTypes = {
        HealthDataType.SLEEP_SESSION,
        HealthDataType.SLEEP_IN_BED,
      };

      final sessionBoundaries = unique
          .where((dp) => sessionTypes.contains(dp.type))
          .toList()
        ..sort((a, b) => a.dateFrom.compareTo(b.dateFrom));

      // Stage data points (not session boundaries).
      final stagePoints =
          unique.where((dp) => !sessionTypes.contains(dp.type)).toList();

      if (sessionBoundaries.isEmpty) {
        // No explicit session boundaries found. Try to synthesize a single
        // session from whatever sleep data points we have.
        if (stagePoints.isEmpty) return [];

        stagePoints.sort((a, b) => a.dateFrom.compareTo(b.dateFrom));
        final earliest = stagePoints.first.dateFrom;
        final latest = stagePoints.fold<DateTime>(
          stagePoints.first.dateTo,
          (prev, dp) => dp.dateTo.isAfter(prev) ? dp.dateTo : prev,
        );

        final stages = _aggregateStages(stagePoints);
        return [
          SleepSession(start: earliest, end: latest, stages: stages),
        ];
      }

      // Build sessions from boundaries.
      final sessions = <SleepSession>[];
      for (final boundary in sessionBoundaries) {
        final sessionStart = boundary.dateFrom;
        final sessionEnd = boundary.dateTo;

        // Find stage points that fall within this session window.
        final relevantStages = stagePoints
            .where((dp) =>
                !dp.dateFrom.isBefore(sessionStart) &&
                !dp.dateTo.isAfter(sessionEnd))
            .toList();

        final stages = _aggregateStages(relevantStages);
        sessions.add(SleepSession(
          start: sessionStart,
          end: sessionEnd,
          stages: stages,
        ));
      }

      return sessions;
    } catch (e, st) {
      _log.e('getSleepSessions() failed', error: e, stackTrace: st);
      return [];
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /// Aggregate a list of sleep-stage data points into a map of
  /// stage name -> total minutes.
  Map<String, int> _aggregateStages(List<HealthDataPoint> stagePoints) {
    final stages = <String, int>{};
    for (final dp in stagePoints) {
      final stageName = _sleepStageLabel(dp.type);
      final minutes = dp.dateTo.difference(dp.dateFrom).inMinutes;
      stages[stageName] = (stages[stageName] ?? 0) + minutes;
    }
    return stages;
  }

  /// Human-readable label for a sleep-stage [HealthDataType].
  String _sleepStageLabel(HealthDataType type) {
    switch (type) {
      case HealthDataType.SLEEP_DEEP:
        return 'deep';
      case HealthDataType.SLEEP_LIGHT:
        return 'light';
      case HealthDataType.SLEEP_REM:
        return 'rem';
      case HealthDataType.SLEEP_AWAKE:
      case HealthDataType.SLEEP_AWAKE_IN_BED:
        return 'awake';
      case HealthDataType.SLEEP_ASLEEP:
        return 'asleep';
      default:
        return 'unknown';
    }
  }
}
