import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';
import 'package:caritahub_alwayson/services/health/health_bridge_service.dart';
import 'package:caritahub_alwayson/services/analysis/behavioural_analyser.dart';
import 'package:caritahub_alwayson/services/sync/sync_engine.dart';
import 'package:caritahub_alwayson/services/health/health_data_collector.dart';

// ── Database ────────────────────────────────────────────────────────────────

final databaseProvider = Provider<AppDatabase>((ref) {
  final db = AppDatabase();
  ref.onDispose(() => db.close());
  return db;
});

// ── Services ────────────────────────────────────────────────────────────────

final healthBridgeProvider = Provider<HealthBridgeService>((ref) {
  return HealthBridgeService();
});

final behaviouralAnalyserProvider = Provider<BehaviouralAnalyser>((ref) {
  return BehaviouralAnalyser(ref.watch(databaseProvider));
});

final healthDataCollectorProvider = Provider<HealthDataCollector>((ref) {
  final db = ref.watch(databaseProvider);
  final bridge = ref.watch(healthBridgeProvider);
  return HealthDataCollector(db: db, bridge: bridge);
});

final syncEngineProvider = Provider<SyncEngine>((ref) {
  final db = ref.watch(databaseProvider);
  // Base URL configured via environment or settings
  return SyncEngine(database: db, baseUrl: 'https://caritahub-aac-dev.int.weeswares.com');
});

// ── App State ───────────────────────────────────────────────────────────────

final memberIdProvider = StateProvider<String>((ref) => 'local_device');

final testerModeProvider = StateProvider<bool>((ref) => false);

final selectedDateProvider = StateProvider<DateTime>((ref) => DateTime.now());

// ── Shared Preferences ─────────────────────────────────────────────────────

final sharedPreferencesProvider = FutureProvider<SharedPreferences>((ref) {
  return SharedPreferences.getInstance();
});

// ── Data Queries ────────────────────────────────────────────────────────────

final todayStepsProvider = FutureProvider.autoDispose<int>((ref) async {
  final db = ref.watch(databaseProvider);
  final memberId = ref.watch(memberIdProvider);
  final today = DateTime.now().toIso8601String().substring(0, 10);
  final summary = await db.getDailySummary(memberId, today);
  return summary?.totalSteps ?? 0;
});

final hourlyStepsProvider =
    FutureProvider.autoDispose.family<List<StepHourlyRawData>, String>(
  (ref, date) async {
    final db = ref.watch(databaseProvider);
    final memberId = ref.watch(memberIdProvider);
    return db.getHourlyStepsForDate(memberId, date);
  },
);

final dailySummaryProvider =
    FutureProvider.autoDispose.family<StepDailySummaryData?, String>(
  (ref, date) async {
    final db = ref.watch(databaseProvider);
    final memberId = ref.watch(memberIdProvider);
    return db.getDailySummary(memberId, date);
  },
);

final weekSummariesProvider = FutureProvider.autoDispose
    .family<List<StepDailySummaryData>, DateTime>((ref, weekStart) async {
  final db = ref.watch(databaseProvider);
  final memberId = ref.watch(memberIdProvider);
  final startDate = weekStart.toIso8601String().substring(0, 10);
  final endDate = weekStart
      .add(const Duration(days: 6))
      .toIso8601String()
      .substring(0, 10);
  return db.getDailySummariesForRange(memberId, startDate, endDate);
});

final trendDataProvider = FutureProvider.autoDispose<List<StepDailySummaryData>>(
  (ref) async {
    final db = ref.watch(databaseProvider);
    final memberId = ref.watch(memberIdProvider);
    final end = DateTime.now();
    final start = end.subtract(const Duration(days: 28));
    return db.getDailySummariesForRange(
      memberId,
      start.toIso8601String().substring(0, 10),
      end.toIso8601String().substring(0, 10),
    );
  },
);

final recentFlagsProvider =
    FutureProvider.autoDispose<List<BehaviouralFlag>>((ref) async {
  final db = ref.watch(databaseProvider);
  final memberId = ref.watch(memberIdProvider);
  return db.getRecentFlags(memberId);
});

final lastHeartbeatProvider =
    FutureProvider.autoDispose<ServiceHeartbeat?>((ref) async {
  final db = ref.watch(databaseProvider);
  return db.getLastHeartbeat();
});

final heartbeatHistoryProvider =
    FutureProvider.autoDispose<List<ServiceHeartbeat>>((ref) async {
  final db = ref.watch(databaseProvider);
  return db.getHeartbeatsForLast48Hours();
});

final uptimePercentProvider = FutureProvider.autoDispose<double>((ref) async {
  final db = ref.watch(databaseProvider);
  final since = DateTime.now().subtract(const Duration(hours: 24));
  return db.computeUptimePercent(since);
});
