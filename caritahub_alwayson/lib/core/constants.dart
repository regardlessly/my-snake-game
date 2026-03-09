// App-wide constants for CaritaHub Always-On Behavioural Intelligence.

class AppConstants {
  AppConstants._();

  static const String appName = 'CaritaHub';
  static const String serviceNotificationTitle = 'CaritaHub health monitoring active';
  static const String serviceNotificationChannelId = 'caritahub_health_service';
  static const String serviceNotificationChannelName = 'Health Monitoring';

  // Background service intervals
  static const Duration dataCollectionInterval = Duration(hours: 1);
  static const Duration workManagerInterval = Duration(minutes: 15);
  static const Duration alarmInterval = Duration(minutes: 20);
  static const Duration syncInterval = Duration(hours: 1);

  // Thresholds
  static const int minStepsForActiveHour = 100;
  static const int criticalInactivitySteps = 500;
  static const int nightWanderingSteps = 200;
  static const int baselineWindowDays = 28;
  static const int minBaselineDays = 7;

  // Activity analysis
  static const int nightStartHour = 1;
  static const int nightEndHour = 4;
  static const int middayCessationStart = 12;
  static const int middayCessationEnd = 15;

  // Heartbeat thresholds
  static const Duration heartbeatWarningThreshold = Duration(minutes: 45);
  static const double targetUptimePercent = 95.0;

  // Sync
  static const int maxRetryAttempts = 5;
  static const Duration retryBackoffBase = Duration(seconds: 30);
  static const int localDataRetentionDays = 90;

  // Tester mode
  static const int testerModeTapCount = 5;
}

class ApiEndpoints {
  ApiEndpoints._();

  static const String dailySummary = '/api/v1/activity/daily-summary';
  static const String flags = '/api/v1/activity/flags';
  static const String heartbeat = '/api/v1/activity/heartbeat';
}
