import 'dart:async';
import 'dart:io';

import 'package:drift/drift.dart';
import 'package:logger/logger.dart';

import 'package:caritahub_alwayson/core/constants.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';
import 'package:caritahub_alwayson/services/health/health_bridge_service.dart';

/// Collects health data from Health Connect / HealthKit and persists it
/// to the local database.
///
/// IMPORTANT: This must run in the **main isolate** because Health Connect
/// requires an Activity context (ComponentActivity) which is only available
/// in the foreground. The background service isolate cannot access Health
/// Connect directly.
class HealthDataCollector {
  final AppDatabase _db;
  final HealthBridgeService _bridge;
  Timer? _periodicTimer;

  static final _log = Logger(
    printer: PrettyPrinter(methodCount: 0),
    filter: ProductionFilter(),
  );

  HealthDataCollector({
    required AppDatabase db,
    HealthBridgeService? bridge,
  })  : _db = db,
        _bridge = bridge ?? HealthBridgeService();

  /// Start periodic data collection in the foreground.
  /// Collects immediately, then every [interval].
  void startPeriodicCollection({
    Duration interval = const Duration(minutes: 5),
  }) {
    _periodicTimer?.cancel();
    // Collect immediately
    collectNow();
    // Then periodically
    _periodicTimer = Timer.periodic(interval, (_) => collectNow());
    _log.i('Periodic health collection started (every ${interval.inMinutes} min)');
  }

  /// Stop periodic collection.
  void stopPeriodicCollection() {
    _periodicTimer?.cancel();
    _periodicTimer = null;
    _log.i('Periodic health collection stopped');
  }

  /// Run a single collection cycle right now.
  /// Returns total steps collected, or -1 on error.
  Future<int> collectNow() async {
    try {
      final today = DateTime.now();
      final dateStr =
          '${today.year}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
      final source = Platform.isAndroid ? 'health_connect' : 'healthkit';
      const memberId = 'local_device';

      _log.d('Collecting health data for $dateStr...');

      // 1. Read hourly step buckets from Health Connect / HealthKit
      final buckets = await _bridge.getHourlyBuckets(today);

      int totalSteps = 0;
      int dataPoints = 0;

      // 2. Upsert each hour into StepHourlyRaw
      for (final entry in buckets.entries) {
        final hour = entry.key;
        final steps = entry.value;
        totalSteps += steps;

        if (steps > 0 || hour <= today.hour) {
          await _db.upsertHourlySteps(
            memberId: memberId,
            date: dateStr,
            hour: hour,
            stepCount: steps,
            source: source,
          );
          dataPoints++;
        }
      }

      // 3. Recompute daily summary
      final hourlyRows = await _db.getHourlyStepsForDate(memberId, dateStr);

      int activeHours = 0;
      int peakHour = 0;
      int peakSteps = 0;
      int firstActive = -1;
      int lastActive = -1;

      for (final row in hourlyRows) {
        if (row.stepCount >= AppConstants.minStepsForActiveHour) {
          activeHours++;
          if (firstActive == -1) firstActive = row.hour;
          lastActive = row.hour;
        }
        if (row.stepCount > peakSteps) {
          peakSteps = row.stepCount;
          peakHour = row.hour;
        }
      }

      final activityWindow = (firstActive >= 0 && lastActive >= 0)
          ? (lastActive - firstActive + 1).toDouble()
          : 0.0;

      await _db.upsertDailySummary(StepDailySummaryCompanion(
        memberId: const Value('local_device'),
        date: Value(dateStr),
        totalSteps: Value(totalSteps),
        activeHours: Value(activeHours),
        peakHour: Value(peakHour),
        firstActiveHour: Value(firstActive >= 0 ? firstActive : 0),
        lastActiveHour: Value(lastActive >= 0 ? lastActive : 0),
        activityWindowHours: Value(activityWindow),
        dayOfWeek: Value(today.weekday - 1),
        computedAt: Value(DateTime.now()),
      ));

      _log.i('Health data collected: $totalSteps steps across $dataPoints hours');
      return totalSteps;
    } catch (e, st) {
      _log.e('Health data collection failed', error: e, stackTrace: st);
      return -1;
    }
  }
}
