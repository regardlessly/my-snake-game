/// Flag types from the Behavioural Flag Taxonomy.
enum FlagType {
  // Tier 1 - Phone step data
  lowDailySteps('LOW_DAILY_STEPS'),
  veryLowDailySteps('VERY_LOW_DAILY_STEPS'),
  criticalInactivity('CRITICAL_INACTIVITY'),
  sustainedLowActivity('SUSTAINED_LOW_ACTIVITY'),
  weekendActivityDrop('WEEKEND_ACTIVITY_DROP'),
  progressiveWeekendDecline('PROGRESSIVE_WEEKEND_DECLINE'),
  weekdayAnomaly('WEEKDAY_ANOMALY'),
  socialWithdrawalProxy('SOCIAL_WITHDRAWAL_PROXY'),
  lateWakeProxy('LATE_WAKE_PROXY'),
  activityWindowContraction('ACTIVITY_WINDOW_CONTRACTION'),
  middayCessation('MIDDAY_CESSATION'),
  nightWandering('NIGHT_WANDERING'),
  weeklyDecliningTrend('WEEKLY_DECLINING_TREND'),
  acuteWeeklyDrop('ACUTE_WEEKLY_DROP'),

  // Tier 2 - Wearable sleep data
  shortSleepDuration('SHORT_SLEEP_DURATION'),
  lowSleepEfficiency('LOW_SLEEP_EFFICIENCY'),
  sleepOnsetDrift('SLEEP_ONSET_DRIFT'),
  risingWakeEpisodes('RISING_WAKE_EPISODES'),
  sleepActivityCompoundLow('SLEEP_ACTIVITY_COMPOUND_LOW');

  const FlagType(this.value);
  final String value;

  int get tier {
    switch (this) {
      case shortSleepDuration:
      case lowSleepEfficiency:
      case sleepOnsetDrift:
      case risingWakeEpisodes:
      case sleepActivityCompoundLow:
        return 2;
      default:
        return 1;
    }
  }

  RimDomain get domain {
    switch (this) {
      case criticalInactivity:
      case middayCessation:
      case nightWandering:
      case acuteWeeklyDrop:
      case shortSleepDuration:
      case lowSleepEfficiency:
      case risingWakeEpisodes:
        return RimDomain.clinical;
      case lowDailySteps:
      case veryLowDailySteps:
      case sustainedLowActivity:
      case weekdayAnomaly:
      case activityWindowContraction:
      case weeklyDecliningTrend:
        return RimDomain.functional;
      case weekendActivityDrop:
      case progressiveWeekendDecline:
      case socialWithdrawalProxy:
      case lateWakeProxy:
      case sleepOnsetDrift:
        return RimDomain.psychosocial;
      case sleepActivityCompoundLow:
        return RimDomain.functional; // also psychosocial
    }
  }
}

enum Severity {
  low('low'),
  medium('medium'),
  high('high');

  const Severity(this.value);
  final String value;
}

enum RimDomain {
  clinical('Clinical'),
  functional('Functional'),
  psychosocial('Psychosocial');

  const RimDomain(this.value);
  final String value;
}

enum TriggerSource {
  foregroundService('foreground_service'),
  workManager('workmanager'),
  alarm('alarm'),
  fcmPush('fcm_push'),
  healthkitDelivery('healthkit_delivery'),
  manual('manual');

  const TriggerSource(this.value);
  final String value;
}

enum SyncStatus {
  pending,
  synced,
  failed,
}
