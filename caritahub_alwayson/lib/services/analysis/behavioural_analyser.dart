import 'package:drift/drift.dart';

import 'package:caritahub_alwayson/core/constants.dart';
import 'package:caritahub_alwayson/core/enums.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';

// ── Helper model ────────────────────────────────────────────────────────────

/// A behavioural signal produced by one of the four analytical dimensions.
class GeneratedFlag {
  final FlagType type;
  final Severity severity;
  final double value;
  final double baseline;
  final String date;

  const GeneratedFlag({
    required this.type,
    required this.severity,
    required this.value,
    required this.baseline,
    required this.date,
  });

  @override
  String toString() =>
      'GeneratedFlag(${type.value}, ${severity.value}, '
      'value=$value, baseline=$baseline, date=$date)';
}

// ── Analyser ────────────────────────────────────────────────────────────────

/// Computes behavioural signals across four analytical dimensions.
///
/// Designed to run after each data-collection cycle.  Call [analyseDay] as the
/// single entry point; it delegates to the four private dimension methods and
/// aggregates every [GeneratedFlag] they produce.
class BehaviouralAnalyser {
  BehaviouralAnalyser(this._db);

  final AppDatabase _db;

  // ──────────────────────────────────────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────────────────────────────────────

  /// Main entry point.  Runs all four analytical dimensions for [memberId] on
  /// [date] (format `YYYY-MM-DD`) and returns every generated flag.
  Future<List<GeneratedFlag>> analyseDay(
    String memberId,
    String date,
  ) async {
    final today = DateTime.parse(date);
    final baselineStart = today
        .subtract(Duration(days: AppConstants.baselineWindowDays))
        .toIso8601String()
        .substring(0, 10);
    final yesterday = today
        .subtract(const Duration(days: 1))
        .toIso8601String()
        .substring(0, 10);

    // Fetch baseline summaries (up to yesterday so today is excluded).
    final baselineSummaries = await _db.getDailySummariesForRange(
      memberId,
      baselineStart,
      yesterday,
    );

    // Today's summary must already be persisted before analysis runs.
    final todaySummary = await _db.getDailySummary(memberId, date);

    if (todaySummary == null || baselineSummaries.length < AppConstants.minBaselineDays) {
      // Not enough data to produce meaningful analysis.
      return const [];
    }

    final flags = <GeneratedFlag>[];

    flags.addAll(
      _analyseAbsoluteActivityLevel(todaySummary, baselineSummaries, date),
    );
    flags.addAll(
      _analyseDayOfWeekPatterns(todaySummary, baselineSummaries, date),
    );
    flags.addAll(
      await _analyseCircadianPatterns(memberId, todaySummary, baselineSummaries, date),
    );
    flags.addAll(
      _analyseWeekOnWeekTrend(todaySummary, baselineSummaries, date),
    );

    return flags;
  }

  /// Compute a [StepDailySummaryCompanion] from raw hourly buckets.
  ///
  /// Intended to be called right before [analyseDay] so that the summary row
  /// is available in the database for every dimension.
  Future<StepDailySummaryCompanion> computeDailySummary(
    String memberId,
    String date,
    List<StepHourlyRawData> hourlyData,
  ) async {
    final totalSteps =
        hourlyData.fold<int>(0, (sum, e) => sum + e.stepCount);

    final activeHours = hourlyData
        .where((e) => e.stepCount >= AppConstants.minStepsForActiveHour)
        .length;

    int peakHour = 0;
    int peakSteps = 0;
    for (final entry in hourlyData) {
      if (entry.stepCount > peakSteps) {
        peakSteps = entry.stepCount;
        peakHour = entry.hour;
      }
    }

    final activeEntries = hourlyData
        .where((e) => e.stepCount >= AppConstants.minStepsForActiveHour)
        .toList();

    int firstActiveHour = 0;
    int lastActiveHour = 23;
    double activityWindowHours = 0;

    if (activeEntries.isNotEmpty) {
      firstActiveHour = activeEntries.first.hour;
      lastActiveHour = activeEntries.last.hour;
      activityWindowHours = (lastActiveHour - firstActiveHour + 1).toDouble();
    }

    final parsedDate = DateTime.parse(date);
    // Dart weekday: 1=Mon...7=Sun.  We store 0=Mon...6=Sun.
    final dayOfWeek = parsedDate.weekday - 1;

    return StepDailySummaryCompanion(
      memberId: Value(memberId),
      date: Value(date),
      totalSteps: Value(totalSteps),
      activeHours: Value(activeHours),
      peakHour: Value(peakHour),
      firstActiveHour: Value(firstActiveHour),
      lastActiveHour: Value(lastActiveHour),
      activityWindowHours: Value(activityWindowHours),
      dayOfWeek: Value(dayOfWeek),
      computedAt: Value(DateTime.now()),
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7.1  Absolute Activity Level
  // ──────────────────────────────────────────────────────────────────────────

  List<GeneratedFlag> _analyseAbsoluteActivityLevel(
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) {
    final flags = <GeneratedFlag>[];
    final steps = today.totalSteps;
    final medianBaseline = _medianSteps(baseline);

    // CRITICAL_INACTIVITY: absolute floor regardless of baseline.
    if (steps < AppConstants.criticalInactivitySteps) {
      flags.add(GeneratedFlag(
        type: FlagType.criticalInactivity,
        severity: Severity.high,
        value: steps.toDouble(),
        baseline: medianBaseline,
        date: date,
      ));
    }

    if (medianBaseline > 0) {
      final ratio = steps / medianBaseline;

      // VERY_LOW_DAILY_STEPS: < 30 % of baseline.
      if (ratio < 0.30) {
        flags.add(GeneratedFlag(
          type: FlagType.veryLowDailySteps,
          severity: Severity.medium,
          value: steps.toDouble(),
          baseline: medianBaseline,
          date: date,
        ));
      } else if (ratio < 0.50) {
        // LOW_DAILY_STEPS: < 50 % of baseline (but >= 30 %).
        flags.add(GeneratedFlag(
          type: FlagType.lowDailySteps,
          severity: Severity.low,
          value: steps.toDouble(),
          baseline: medianBaseline,
          date: date,
        ));
      }
    }

    // SUSTAINED_LOW_ACTIVITY: < 60 % baseline for 5 of the last 7 days.
    if (medianBaseline > 0 && baseline.length >= 7) {
      final last7 = baseline.length >= 7
          ? baseline.sublist(baseline.length - 7)
          : baseline;
      final lowDays = last7
          .where((d) => d.totalSteps < medianBaseline * 0.60)
          .length;

      if (lowDays >= 5) {
        flags.add(GeneratedFlag(
          type: FlagType.sustainedLowActivity,
          severity: Severity.high,
          value: lowDays.toDouble(),
          baseline: medianBaseline,
          date: date,
        ));
      }
    }

    return flags;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7.2  Day-of-Week Pattern Analysis
  // ──────────────────────────────────────────────────────────────────────────

  List<GeneratedFlag> _analyseDayOfWeekPatterns(
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) {
    final flags = <GeneratedFlag>[];

    // Build weekday / weekend averages from the baseline window.
    final weekdaySteps = <int>[];
    final weekendSteps = <int>[];

    for (final s in baseline) {
      if (_isWeekend(s.dayOfWeek)) {
        weekendSteps.add(s.totalSteps);
      } else {
        weekdaySteps.add(s.totalSteps);
      }
    }

    if (weekdaySteps.isEmpty || weekendSteps.isEmpty) return flags;

    final weekdayAvg = _mean(weekdaySteps);
    final weekendAvg = _mean(weekendSteps);

    if (weekdayAvg == 0) return flags;

    final ratio = weekendAvg / weekdayAvg;

    // WEEKEND_ACTIVITY_DROP.
    if (ratio < 0.6) {
      flags.add(GeneratedFlag(
        type: FlagType.weekendActivityDrop,
        severity: Severity.medium,
        value: ratio,
        baseline: 0.6,
        date: date,
      ));
    }

    // SOCIAL_WITHDRAWAL_PROXY: ratio < 0.5 AND weekend total < 3000 steps.
    if (ratio < 0.5 && weekendAvg < 3000) {
      flags.add(GeneratedFlag(
        type: FlagType.socialWithdrawalProxy,
        severity: Severity.high,
        value: weekendAvg,
        baseline: weekdayAvg,
        date: date,
      ));
    }

    // PROGRESSIVE_WEEKEND_DECLINE: weekend avg declining for 4 consecutive
    // calendar weeks.  We need at least 4 weekends in the baseline.
    final weekendByWeek = _groupWeekendStepsByCalendarWeek(baseline);
    if (weekendByWeek.length >= 4) {
      final recentWeeks =
          weekendByWeek.sublist(weekendByWeek.length - 4);
      bool declining = true;
      for (int i = 1; i < recentWeeks.length; i++) {
        if (recentWeeks[i] >= recentWeeks[i - 1]) {
          declining = false;
          break;
        }
      }
      if (declining) {
        flags.add(GeneratedFlag(
          type: FlagType.progressiveWeekendDecline,
          severity: Severity.high,
          value: recentWeeks.last,
          baseline: recentWeeks.first,
          date: date,
        ));
      }
    }

    // WEEKDAY_ANOMALY: a specific weekday is > 40 % below its own 3-week avg.
    if (_isWeekday(today.dayOfWeek)) {
      final sameDowEntries = baseline
          .where((s) => s.dayOfWeek == today.dayOfWeek)
          .toList();
      if (sameDowEntries.length >= 3) {
        final recent3 = sameDowEntries.length >= 3
            ? sameDowEntries.sublist(sameDowEntries.length - 3)
            : sameDowEntries;
        final dowAvg = _mean(
            recent3.map((s) => s.totalSteps).toList());
        if (dowAvg > 0 && today.totalSteps < dowAvg * 0.60) {
          flags.add(GeneratedFlag(
            type: FlagType.weekdayAnomaly,
            severity: Severity.low,
            value: today.totalSteps.toDouble(),
            baseline: dowAvg,
            date: date,
          ));
        }
      }
    }

    return flags;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7.3  Activity Timeline & Circadian Analysis
  // ──────────────────────────────────────────────────────────────────────────

  Future<List<GeneratedFlag>> _analyseCircadianPatterns(
    String memberId,
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) async {
    final flags = <GeneratedFlag>[];

    // ── Tier 1: Phone-only circadian signals ──

    flags.addAll(_tier1CircadianFlags(today, baseline, date));

    // Gather recent summaries (last 3 days including today) for multi-day
    // checks.
    final todayDt = DateTime.parse(date);
    final threeDaysAgoStr = todayDt
        .subtract(const Duration(days: 2))
        .toIso8601String()
        .substring(0, 10);
    final recentSummaries = await _db.getDailySummariesForRange(
      memberId,
      threeDaysAgoStr,
      date,
    );

    // ACTIVITY_WINDOW_CONTRACTION: active window < 8 h for 3 consecutive days.
    if (recentSummaries.length >= 3) {
      final last3 = recentSummaries.length >= 3
          ? recentSummaries.sublist(recentSummaries.length - 3)
          : recentSummaries;
      final allContracted =
          last3.every((s) => s.activityWindowHours < 8.0);
      if (allContracted) {
        flags.add(GeneratedFlag(
          type: FlagType.activityWindowContraction,
          severity: Severity.medium,
          value: today.activityWindowHours,
          baseline: 8.0,
          date: date,
        ));
      }
    }

    // NIGHT_WANDERING: > 200 steps between 01:00 and 04:00.
    final hourlyData = await _db.getHourlyStepsForDate(memberId, date);
    final nightSteps = hourlyData
        .where((e) =>
            e.hour >= AppConstants.nightStartHour &&
            e.hour <= AppConstants.nightEndHour)
        .fold<int>(0, (sum, e) => sum + e.stepCount);

    if (nightSteps > AppConstants.nightWanderingSteps) {
      flags.add(GeneratedFlag(
        type: FlagType.nightWandering,
        severity: Severity.high,
        value: nightSteps.toDouble(),
        baseline: AppConstants.nightWanderingSteps.toDouble(),
        date: date,
      ));
    }

    // MIDDAY_CESSATION: zero steps 12:00-15:00 after morning activity.
    final morningActive = hourlyData.any(
        (e) => e.hour < AppConstants.middayCessationStart &&
            e.stepCount >= AppConstants.minStepsForActiveHour);
    if (morningActive) {
      final middaySteps = hourlyData
          .where((e) =>
              e.hour >= AppConstants.middayCessationStart &&
              e.hour < AppConstants.middayCessationEnd)
          .fold<int>(0, (sum, e) => sum + e.stepCount);
      if (middaySteps == 0) {
        flags.add(GeneratedFlag(
          type: FlagType.middayCessation,
          severity: Severity.medium,
          value: 0,
          baseline: 0,
          date: date,
        ));
      }
    }

    // ── Tier 2: Wearable sleep signals (only when available) ──

    if (today.hasWearableSleep) {
      flags.addAll(
        await _tier2SleepFlags(memberId, today, baseline, date),
      );
    }

    return flags;
  }

  /// Tier 1 circadian flags that only depend on summary-level data.
  List<GeneratedFlag> _tier1CircadianFlags(
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) {
    final flags = <GeneratedFlag>[];

    // LATE_WAKE_PROXY: first active hour shifted > 2 h later vs baseline
    // median first-active-hour.
    final baselineFirstHours =
        baseline.map((s) => s.firstActiveHour).toList()..sort();
    if (baselineFirstHours.isNotEmpty) {
      final medianFirstHour = _medianInt(baselineFirstHours);
      final shift = today.firstActiveHour - medianFirstHour;
      if (shift > 2) {
        flags.add(GeneratedFlag(
          type: FlagType.lateWakeProxy,
          severity: Severity.low,
          value: today.firstActiveHour.toDouble(),
          baseline: medianFirstHour.toDouble(),
          date: date,
        ));
      }
    }

    return flags;
  }

  /// Tier 2 sleep-based flags (wearable data present).
  Future<List<GeneratedFlag>> _tier2SleepFlags(
    String memberId,
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) async {
    final flags = <GeneratedFlag>[];

    // Filter baseline entries that have wearable sleep data.
    final sleepBaseline =
        baseline.where((s) => s.hasWearableSleep).toList();

    // ── SHORT_SLEEP_DURATION: < 360 min for 3+ nights ──

    final todayDt = DateTime.parse(date);
    final sevenDaysAgoStr = todayDt
        .subtract(const Duration(days: 6))
        .toIso8601String()
        .substring(0, 10);
    final recentSleep = await _db.getDailySummariesForRange(
      memberId,
      sevenDaysAgoStr,
      date,
    );
    final shortSleepNights = recentSleep
        .where((s) =>
            s.hasWearableSleep &&
            s.sleepDurationMin != null &&
            s.sleepDurationMin! < 360)
        .length;

    if (shortSleepNights >= 3) {
      flags.add(GeneratedFlag(
        type: FlagType.shortSleepDuration,
        severity: Severity.medium,
        value: shortSleepNights.toDouble(),
        baseline: 360,
        date: date,
      ));
    }

    // ── LOW_SLEEP_EFFICIENCY: < 75 % over 7 days ──

    final efficiencies = recentSleep
        .where((s) =>
            s.hasWearableSleep && s.sleepEfficiencyPct != null)
        .map((s) => s.sleepEfficiencyPct!)
        .toList();

    if (efficiencies.isNotEmpty) {
      final avgEfficiency =
          efficiencies.reduce((a, b) => a + b) / efficiencies.length;
      if (avgEfficiency < 75.0) {
        flags.add(GeneratedFlag(
          type: FlagType.lowSleepEfficiency,
          severity: Severity.medium,
          value: avgEfficiency,
          baseline: 75.0,
          date: date,
        ));
      }
    }

    // ── SLEEP_ONSET_DRIFT: onset > 2 h later vs 28-day baseline ──

    if (today.sleepOnsetTime != null && sleepBaseline.isNotEmpty) {
      final baselineOnsets = sleepBaseline
          .where((s) => s.sleepOnsetTime != null)
          .map((s) => s.sleepOnsetTime!)
          .toList()
        ..sort();

      if (baselineOnsets.isNotEmpty) {
        final medianOnset = _medianInt(baselineOnsets);
        // Onset times stored as minutes-from-midnight; handle wrapping.
        final drift = _minutesDrift(today.sleepOnsetTime!, medianOnset.round());
        if (drift > 120) {
          // > 2 hours later
          flags.add(GeneratedFlag(
            type: FlagType.sleepOnsetDrift,
            severity: Severity.medium,
            value: today.sleepOnsetTime!.toDouble(),
            baseline: medianOnset.toDouble(),
            date: date,
          ));
        }
      }
    }

    // ── RISING_WAKE_EPISODES: week-on-week increase ──

    if (sleepBaseline.length >= 14) {
      final priorWeek = sleepBaseline
          .sublist(sleepBaseline.length - 14, sleepBaseline.length - 7)
          .where((s) => s.wakeEpisodes != null);
      final currentWeek = sleepBaseline
          .sublist(sleepBaseline.length - 7)
          .where((s) => s.wakeEpisodes != null);

      if (priorWeek.isNotEmpty && currentWeek.isNotEmpty) {
        final priorAvg = _mean(
            priorWeek.map((s) => s.wakeEpisodes!).toList());
        final currentAvg = _mean(
            currentWeek.map((s) => s.wakeEpisodes!).toList());

        if (currentAvg > priorAvg && priorAvg > 0) {
          flags.add(GeneratedFlag(
            type: FlagType.risingWakeEpisodes,
            severity: Severity.low,
            value: currentAvg,
            baseline: priorAvg,
            date: date,
          ));
        }
      }
    }

    // ── SLEEP_ACTIVITY_COMPOUND_LOW: low steps AND low sleep efficiency
    //    for 3+ days ──

    if (recentSleep.length >= 3) {
      final medianBaseline = _medianSteps(baseline);
      final compoundLowDays = recentSleep.where((s) {
        final lowSteps =
            medianBaseline > 0 && s.totalSteps < medianBaseline * 0.50;
        final lowSleep = s.hasWearableSleep &&
            s.sleepEfficiencyPct != null &&
            s.sleepEfficiencyPct! < 75.0;
        return lowSteps && lowSleep;
      }).length;

      if (compoundLowDays >= 3) {
        flags.add(GeneratedFlag(
          type: FlagType.sleepActivityCompoundLow,
          severity: Severity.high,
          value: compoundLowDays.toDouble(),
          baseline: 3,
          date: date,
        ));
      }
    }

    return flags;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7.4  Week-on-Week Trend
  // ──────────────────────────────────────────────────────────────────────────

  List<GeneratedFlag> _analyseWeekOnWeekTrend(
    StepDailySummaryData today,
    List<StepDailySummaryData> baseline,
    String date,
  ) {
    final flags = <GeneratedFlag>[];

    // Build weekly averages from the baseline (most recent weeks at the end).
    final weeklyAverages = _computeWeeklyAverages(baseline);

    if (weeklyAverages.length < 2) return flags;

    // ACUTE_WEEKLY_DROP: current week < 70 % of prior week.
    final currentWeekAvg = weeklyAverages.last;
    final priorWeekAvg = weeklyAverages[weeklyAverages.length - 2];

    if (priorWeekAvg > 0 && currentWeekAvg < priorWeekAvg * 0.70) {
      flags.add(GeneratedFlag(
        type: FlagType.acuteWeeklyDrop,
        severity: Severity.high,
        value: currentWeekAvg,
        baseline: priorWeekAvg,
        date: date,
      ));
    }

    // WEEKLY_DECLINING_TREND: 3+ consecutive weeks declining.
    if (weeklyAverages.length >= 3) {
      int consecutiveDeclines = 0;
      for (int i = weeklyAverages.length - 1; i >= 1; i--) {
        if (weeklyAverages[i] < weeklyAverages[i - 1]) {
          consecutiveDeclines++;
        } else {
          break;
        }
      }
      if (consecutiveDeclines >= 3) {
        flags.add(GeneratedFlag(
          type: FlagType.weeklyDecliningTrend,
          severity: Severity.medium,
          value: currentWeekAvg,
          baseline: weeklyAverages[weeklyAverages.length - 1 - consecutiveDeclines],
          date: date,
        ));
      }
    }

    return flags;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Statistical helpers
  // ──────────────────────────────────────────────────────────────────────────

  /// Median of [totalSteps] across the baseline summaries.
  double _medianSteps(List<StepDailySummaryData> summaries) {
    if (summaries.isEmpty) return 0;
    final sorted = summaries.map((s) => s.totalSteps).toList()..sort();
    return _medianFromSortedInts(sorted);
  }

  /// Median value from an already-sorted list of ints.
  double _medianFromSortedInts(List<int> sorted) {
    if (sorted.isEmpty) return 0;
    final mid = sorted.length ~/ 2;
    if (sorted.length.isOdd) {
      return sorted[mid].toDouble();
    }
    return (sorted[mid - 1] + sorted[mid]) / 2.0;
  }

  /// Median of an unsorted list of ints.
  double _medianInt(List<int> values) {
    if (values.isEmpty) return 0;
    final sorted = List<int>.from(values)..sort();
    return _medianFromSortedInts(sorted);
  }

  /// Arithmetic mean from a list of ints.
  double _mean(List<int> values) {
    if (values.isEmpty) return 0;
    return values.reduce((a, b) => a + b) / values.length;
  }

  /// Whether [dayOfWeek] (0=Mon..6=Sun) falls on a weekend.
  bool _isWeekend(int dayOfWeek) => dayOfWeek >= 5; // 5=Sat, 6=Sun

  /// Whether [dayOfWeek] falls on a weekday.
  bool _isWeekday(int dayOfWeek) => dayOfWeek < 5;

  /// Group weekend days by ISO calendar week and return the average step
  /// count for each week, ordered chronologically.
  List<double> _groupWeekendStepsByCalendarWeek(
    List<StepDailySummaryData> baseline,
  ) {
    final weekendEntries =
        baseline.where((s) => _isWeekend(s.dayOfWeek)).toList();

    if (weekendEntries.isEmpty) return const [];

    // Key: ISO week string "YYYY-Www", Value: list of step counts.
    final byWeek = <String, List<int>>{};

    for (final s in weekendEntries) {
      final dt = DateTime.parse(s.date);
      final weekKey = _isoWeekKey(dt);
      byWeek.putIfAbsent(weekKey, () => []).add(s.totalSteps);
    }

    // Sort by week key (lexicographic is correct for ISO week format).
    final sortedKeys = byWeek.keys.toList()..sort();
    return sortedKeys.map((k) => _mean(byWeek[k]!)).toList();
  }

  /// Returns an ISO-week key like "2026-W10".
  String _isoWeekKey(DateTime dt) {
    // ISO 8601 week calculation.
    final dayOfYear = dt.difference(DateTime(dt.year, 1, 1)).inDays + 1;
    final wday = dt.weekday; // 1=Mon..7=Sun
    final weekNumber = ((dayOfYear - wday + 10) / 7).floor();
    final year = weekNumber < 1
        ? dt.year - 1
        : (weekNumber > 52 && dt.month == 1)
            ? dt.year - 1
            : dt.year;
    return '$year-W${weekNumber.toString().padLeft(2, '0')}';
  }

  /// Compute weekly (7-day rolling) averages from daily summaries.
  ///
  /// Returns one average per complete 7-day chunk, ordered oldest-first.
  List<double> _computeWeeklyAverages(List<StepDailySummaryData> summaries) {
    if (summaries.length < 7) return const [];

    final averages = <double>[];
    // Walk from the end in 7-day chunks.
    int i = summaries.length;
    while (i >= 7) {
      final chunk = summaries.sublist(i - 7, i);
      final avg = chunk.fold<int>(0, (s, e) => s + e.totalSteps) / 7.0;
      averages.insert(0, avg);
      i -= 7;
    }
    return averages;
  }

  /// Compute the positive forward drift in minutes between two
  /// minutes-from-midnight values, accounting for midnight wrapping.
  ///
  /// For example an onset that moved from 22:00 (1320 min) to 01:00 (60 min)
  /// is a 180-minute forward drift, not a -1260 drift.
  int _minutesDrift(int currentMinutes, int baselineMinutes) {
    int diff = currentMinutes - baselineMinutes;
    // Normalise to range [0, 1440).
    if (diff < -720) {
      diff += 1440;
    } else if (diff < 0) {
      // Negative drift (earlier) is not considered a forward shift.
      return 0;
    }
    return diff;
  }
}
