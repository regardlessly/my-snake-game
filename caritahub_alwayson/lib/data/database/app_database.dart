import 'dart:io';

import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

part 'app_database.g.dart';

// ── Tables ──────────────────────────────────────────────────────────────────

class StepHourlyRaw extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get memberId => text()();
  TextColumn get date => text()(); // YYYY-MM-DD
  IntColumn get hour => integer()(); // 0-23
  IntColumn get stepCount => integer()();
  TextColumn get source => text()(); // health_connect | healthkit
  DateTimeColumn get capturedAt => dateTime()();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

class StepDailySummary extends Table {
  TextColumn get memberId => text()();
  TextColumn get date => text()(); // YYYY-MM-DD
  IntColumn get totalSteps => integer()();
  IntColumn get activeHours => integer()();
  IntColumn get peakHour => integer()();
  IntColumn get firstActiveHour => integer()();
  IntColumn get lastActiveHour => integer()();
  RealColumn get activityWindowHours => real()();
  IntColumn get dayOfWeek => integer()(); // 0=Mon...6=Sun
  BoolColumn get hasWearableSleep => boolean().withDefault(const Constant(false))();
  IntColumn get sleepOnsetTime => integer().nullable()();
  IntColumn get sleepOffsetTime => integer().nullable()();
  IntColumn get sleepDurationMin => integer().nullable()();
  RealColumn get sleepEfficiencyPct => real().nullable()();
  IntColumn get wakeEpisodes => integer().nullable()();
  DateTimeColumn get computedAt => dateTime()();

  @override
  Set<Column> get primaryKey => {memberId, date};
}

class BehaviouralFlags extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get memberId => text()();
  TextColumn get flagDate => text()(); // YYYY-MM-DD
  TextColumn get flagType => text()();
  TextColumn get severity => text()(); // low | medium | high
  RealColumn get value => real()();
  RealColumn get baseline => real()();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
}

class ServiceHeartbeats extends Table {
  IntColumn get id => integer().autoIncrement()();
  DateTimeColumn get timestamp => dateTime()();
  TextColumn get platform => text()();
  TextColumn get triggerSource => text()();
  IntColumn get stepsCaptured => integer().withDefault(const Constant(0))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

class DataGaps extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get memberId => text()();
  TextColumn get gapDate => text()();
  IntColumn get gapStartHour => integer()();
  IntColumn get gapEndHour => integer()();
  IntColumn get gapDurationMinutes => integer()();
  DateTimeColumn get detectedAt => dateTime()();
}

/// GPS location log captured every 30 minutes by the background service.
/// Also records home-departure and home-arrival events.
class LocationLogs extends Table {
  IntColumn get id => integer().autoIncrement()();
  DateTimeColumn get timestamp => dateTime()();
  RealColumn get latitude => real()();
  RealColumn get longitude => real()();
  RealColumn get accuracyMeters => real()();
  RealColumn get altitudeMeters => real().nullable()();
  RealColumn get speedMs => real().nullable()(); // metres per second
  /// null = routine log, 'left_home' = departure event, 'arrived_home' = arrival event
  TextColumn get event => text().nullable()();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

// ── Database ────────────────────────────────────────────────────────────────

@DriftDatabase(tables: [
  StepHourlyRaw,
  StepDailySummary,
  BehaviouralFlags,
  ServiceHeartbeats,
  DataGaps,
  LocationLogs,
])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  AppDatabase.forTesting(super.e);

  @override
  int get schemaVersion => 2;

  @override
  MigrationStrategy get migration => MigrationStrategy(
        onCreate: (m) => m.createAll(),
        onUpgrade: (m, from, to) async {
          if (from < 2) await m.createTable(locationLogs);
        },
      );

  // ── Step Hourly Raw ──

  Future<void> upsertHourlySteps({
    required String memberId,
    required String date,
    required int hour,
    required int stepCount,
    required String source,
  }) async {
    final existing = await (select(stepHourlyRaw)
          ..where((t) =>
              t.memberId.equals(memberId) &
              t.date.equals(date) &
              t.hour.equals(hour)))
        .getSingleOrNull();

    if (existing != null) {
      await (update(stepHourlyRaw)..where((t) => t.id.equals(existing.id)))
          .write(StepHourlyRawCompanion(
        stepCount: Value(stepCount),
        capturedAt: Value(DateTime.now()),
      ));
    } else {
      await into(stepHourlyRaw).insert(StepHourlyRawCompanion.insert(
        memberId: memberId,
        date: date,
        hour: hour,
        stepCount: stepCount,
        source: source,
        capturedAt: DateTime.now(),
      ));
    }
  }

  Future<List<StepHourlyRawData>> getHourlyStepsForDate(
      String memberId, String date) {
    return (select(stepHourlyRaw)
          ..where(
              (t) => t.memberId.equals(memberId) & t.date.equals(date))
          ..orderBy([(t) => OrderingTerm.asc(t.hour)]))
        .get();
  }

  Future<List<StepHourlyRawData>> getUnsyncedHourlySteps() {
    return (select(stepHourlyRaw)
          ..where((t) => t.synced.equals(false))
          ..limit(500))
        .get();
  }

  Future<void> markHourlyStepsSynced(List<int> ids) {
    return (update(stepHourlyRaw)..where((t) => t.id.isIn(ids)))
        .write(const StepHourlyRawCompanion(synced: Value(true)));
  }

  // ── Step Daily Summary ──

  Future<void> upsertDailySummary(StepDailySummaryCompanion summary) {
    return into(stepDailySummary).insertOnConflictUpdate(summary);
  }

  Future<StepDailySummaryData?> getDailySummary(
      String memberId, String date) {
    return (select(stepDailySummary)
          ..where(
              (t) => t.memberId.equals(memberId) & t.date.equals(date)))
        .getSingleOrNull();
  }

  Future<List<StepDailySummaryData>> getDailySummariesForRange(
      String memberId, String startDate, String endDate) {
    return (select(stepDailySummary)
          ..where((t) =>
              t.memberId.equals(memberId) &
              t.date.isBiggerOrEqualValue(startDate) &
              t.date.isSmallerOrEqualValue(endDate))
          ..orderBy([(t) => OrderingTerm.asc(t.date)]))
        .get();
  }

  Future<List<StepDailySummaryData>> getUnsyncedDailySummaries() {
    // Daily summaries don't have a synced column in the plan,
    // but we track sync status via step_hourly_raw
    return (select(stepDailySummary)..limit(100)).get();
  }

  // ── Behavioural Flags ──

  Future<int> insertFlag(BehaviouralFlagsCompanion flag) {
    return into(behaviouralFlags).insert(flag);
  }

  Future<List<BehaviouralFlag>> getFlagsForDate(
      String memberId, String date) {
    return (select(behaviouralFlags)
          ..where(
              (t) => t.memberId.equals(memberId) & t.flagDate.equals(date)))
        .get();
  }

  Future<List<BehaviouralFlag>> getRecentFlags(
      String memberId, {int limit = 50}) {
    return (select(behaviouralFlags)
          ..where((t) => t.memberId.equals(memberId))
          ..orderBy([(t) => OrderingTerm.desc(t.createdAt)])
          ..limit(limit))
        .get();
  }

  Future<List<BehaviouralFlag>> getUnsyncedFlags() {
    return (select(behaviouralFlags)
          ..where((t) => t.synced.equals(false))
          ..limit(200))
        .get();
  }

  Future<void> markFlagsSynced(List<int> ids) {
    return (update(behaviouralFlags)..where((t) => t.id.isIn(ids)))
        .write(const BehaviouralFlagsCompanion(synced: Value(true)));
  }

  // ── Service Heartbeats ──

  Future<int> insertHeartbeat(ServiceHeartbeatsCompanion heartbeat) {
    return into(serviceHeartbeats).insert(heartbeat);
  }

  Future<ServiceHeartbeat?> getLastHeartbeat() {
    return (select(serviceHeartbeats)
          ..orderBy([(t) => OrderingTerm.desc(t.timestamp)])
          ..limit(1))
        .getSingleOrNull();
  }

  Future<List<ServiceHeartbeat>> getHeartbeatsForLast48Hours() {
    final cutoff = DateTime.now().subtract(const Duration(hours: 48));
    return (select(serviceHeartbeats)
          ..where((t) => t.timestamp.isBiggerOrEqualValue(cutoff))
          ..orderBy([(t) => OrderingTerm.desc(t.timestamp)]))
        .get();
  }

  Future<double> computeUptimePercent(DateTime since) {
    return customSelect(
      'SELECT COUNT(DISTINCT strftime(\'%Y-%m-%d %H\', timestamp)) as active_hours '
      'FROM service_heartbeats WHERE timestamp >= ?',
      variables: [Variable.withDateTime(since)],
      readsFrom: {serviceHeartbeats},
    ).getSingle().then((row) {
      final activeHours = row.read<int>('active_hours');
      final totalHours =
          DateTime.now().difference(since).inHours.clamp(1, 999999);
      return (activeHours / totalHours) * 100;
    });
  }

  // ── Data Gaps ──

  Future<void> insertDataGap(DataGapsCompanion gap) {
    return into(dataGaps).insert(gap).then((_) {});
  }

  Future<List<DataGap>> getRecentGaps({int limit = 50}) {
    return (select(dataGaps)
          ..orderBy([(t) => OrderingTerm.desc(t.detectedAt)])
          ..limit(limit))
        .get();
  }

  // ── Location Logs ──

  Future<int> insertLocationLog(LocationLogsCompanion log) =>
      into(locationLogs).insert(log);

  Future<LocationLog?> getLastLocationLog() {
    return (select(locationLogs)
          ..orderBy([(t) => OrderingTerm.desc(t.timestamp)])
          ..limit(1))
        .getSingleOrNull();
  }

  Future<List<LocationLog>> getRecentLocationLogs({int limit = 50}) {
    return (select(locationLogs)
          ..orderBy([(t) => OrderingTerm.desc(t.timestamp)])
          ..limit(limit))
        .get();
  }

  Future<List<LocationLog>> getUnsyncedLocationLogs() {
    return (select(locationLogs)
          ..where((t) => t.synced.equals(false))
          ..limit(200))
        .get();
  }

  Future<void> markLocationLogsSynced(List<int> ids) {
    return (update(locationLogs)..where((t) => t.id.isIn(ids)))
        .write(const LocationLogsCompanion(synced: Value(true)));
  }

  // ── Maintenance ──

  Future<void> purgeOldData(int retentionDays) async {
    final cutoffDate = DateTime.now()
        .subtract(Duration(days: retentionDays))
        .toIso8601String()
        .substring(0, 10);

    await (delete(stepHourlyRaw)
          ..where((t) => t.date.isSmallerThanValue(cutoffDate)))
        .go();
    await (delete(stepDailySummary)
          ..where((t) => t.date.isSmallerThanValue(cutoffDate)))
        .go();
    await (delete(behaviouralFlags)
          ..where((t) => t.flagDate.isSmallerThanValue(cutoffDate)))
        .go();
  }

  Future<void> clearAllData() async {
    await delete(stepHourlyRaw).go();
    await delete(stepDailySummary).go();
    await delete(behaviouralFlags).go();
    await delete(serviceHeartbeats).go();
    await delete(dataGaps).go();
    await delete(locationLogs).go();
  }
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dir = await getApplicationDocumentsDirectory();
    final file = File(p.join(dir.path, 'caritahub_alwayson.sqlite'));
    return NativeDatabase.createInBackground(file);
  });
}
