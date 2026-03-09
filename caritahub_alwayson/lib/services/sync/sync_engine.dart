import 'dart:async';
import 'dart:math';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:drift/drift.dart';
import 'package:dio/dio.dart';
import 'package:logger/logger.dart';

import 'package:caritahub_alwayson/core/constants.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';

// ── Retry Interceptor ────────────────────────────────────────────────────────

/// Queued interceptor that retries failed requests with exponential backoff.
///
/// Uses [QueuedInterceptorsWrapper] so that concurrent requests are serialised
/// while a retry sequence is in progress, preventing thundering-herd effects
/// on a recovering network.
class RetryInterceptor extends QueuedInterceptorsWrapper {
  RetryInterceptor({
    required this.dio,
    this.maxRetries = AppConstants.maxRetryAttempts,
    this.baseBackoff = AppConstants.retryBackoffBase,
    Logger? logger,
  }) : _log = logger ?? Logger(printer: PrettyPrinter(methodCount: 0));

  final Dio dio;
  final int maxRetries;
  final Duration baseBackoff;
  final Logger _log;

  /// Header key injected into each request to track how many attempts
  /// have been made so far. Not sent over the wire -- Dio strips
  /// unknown internal headers.
  static const _retryCountHeader = 'x-retry-count';

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    final requestOptions = err.requestOptions;
    final attempt = requestOptions.headers[_retryCountHeader] as int? ?? 0;

    // Only retry on network errors, timeouts, and 5xx server errors.
    final shouldRetry = _isRetryable(err) && attempt < maxRetries;

    if (!shouldRetry) {
      _log.w(
        'Sync request failed permanently '
        '[${requestOptions.method} ${requestOptions.path}] '
        'after $attempt attempt(s): ${err.message}',
      );
      return handler.next(err);
    }

    final nextAttempt = attempt + 1;
    final delay = _backoffDuration(nextAttempt);

    _log.i(
      'Retrying [${requestOptions.method} ${requestOptions.path}] '
      'attempt $nextAttempt/$maxRetries in ${delay.inSeconds}s',
    );

    await Future<void>.delayed(delay);

    // Clone options with bumped attempt counter.
    requestOptions.headers[_retryCountHeader] = nextAttempt;

    try {
      final response = await dio.fetch<dynamic>(requestOptions);
      return handler.resolve(response);
    } on DioException catch (retryErr) {
      return handler.next(retryErr);
    }
  }

  /// Exponential backoff with jitter: base * 2^attempt + random(0..base).
  Duration _backoffDuration(int attempt) {
    final exponentialMs =
        baseBackoff.inMilliseconds * pow(2, attempt - 1).toInt();
    final jitterMs = Random().nextInt(baseBackoff.inMilliseconds);
    return Duration(milliseconds: exponentialMs + jitterMs);
  }

  /// Returns `true` for transient errors worth retrying.
  bool _isRetryable(DioException err) {
    switch (err.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.connectionError:
        return true;
      case DioExceptionType.badResponse:
        final statusCode = err.response?.statusCode;
        // Retry server errors (500-599) and 429 Too Many Requests.
        return statusCode != null &&
            (statusCode >= 500 || statusCode == 429);
      default:
        return false;
    }
  }
}

// ── Sync Engine ──────────────────────────────────────────────────────────────

/// Synchronises locally-queued behavioural intelligence data to the
/// CaritaHub REST API.
///
/// Features:
/// - Offline-aware: silently skips when there is no network.
/// - Batched: sends at most [_batchSize] items per HTTP request.
/// - Idempotent: uses a composite key of `member_id + date (+ hour)` so
///   the server can safely de-duplicate repeated uploads.
/// - Retry with exponential backoff via [RetryInterceptor].
class SyncEngine {
  SyncEngine({
    required AppDatabase database,
    required String baseUrl,
    Logger? logger,
  })  : _db = database,
        _log = logger ?? Logger(printer: PrettyPrinter(methodCount: 0)),
        _dio = Dio(
          BaseOptions(
            baseUrl: baseUrl,
            connectTimeout: const Duration(seconds: 30),
            receiveTimeout: const Duration(seconds: 30),
            contentType: 'application/json',
            headers: {
              'Accept': 'application/json',
            },
          ),
        ) {
    _dio.interceptors.add(
      RetryInterceptor(
        dio: _dio,
        maxRetries: AppConstants.maxRetryAttempts,
        baseBackoff: AppConstants.retryBackoffBase,
        logger: _log,
      ),
    );
  }

  final AppDatabase _db;
  final Dio _dio;
  final Logger _log;

  /// Maximum number of records to include in a single POST payload.
  static const int _batchSize = 50;

  // ── Public API ───────────────────────────────────────────────────────────

  /// Runs all sync operations in sequence.
  ///
  /// If the device is offline the call returns immediately without error.
  Future<void> syncAll() async {
    if (!await isConnected()) {
      _log.d('SyncEngine: device is offline -- skipping sync cycle');
      return;
    }

    _log.i('SyncEngine: starting full sync cycle');
    final stopwatch = Stopwatch()..start();

    await syncDailySummaries();
    await syncBehaviouralFlags();
    await syncHeartbeats();

    stopwatch.stop();
    _log.i(
      'SyncEngine: sync cycle complete in ${stopwatch.elapsedMilliseconds}ms',
    );
  }

  /// POST unsynced [StepDailySummary] rows to the daily-summary endpoint.
  ///
  /// Daily summaries do not have their own `synced` column -- the database
  /// helper returns the most recent rows and this method POSTs them
  /// idempotently (the server deduplicates by `member_id + date`).
  Future<void> syncDailySummaries() async {
    if (!await isConnected()) return;

    try {
      final summaries = await _db.getUnsyncedDailySummaries();
      if (summaries.isEmpty) {
        _log.d('SyncEngine: no daily summaries to sync');
        return;
      }

      _log.i('SyncEngine: syncing ${summaries.length} daily summaries');

      final batches = _partition(summaries, _batchSize);
      var batchIndex = 0;

      for (final batch in batches) {
        batchIndex++;
        final payload = batch.map(_dailySummaryToJson).toList();

        try {
          final response = await _dio.post<dynamic>(
            ApiEndpoints.dailySummary,
            data: {'items': payload},
          );

          _log.i(
            'SyncEngine: daily-summary batch $batchIndex/${batches.length} '
            'uploaded (${response.statusCode})',
          );
        } on DioException catch (e) {
          _log.e(
            'SyncEngine: daily-summary batch $batchIndex failed: '
            '${e.message}',
          );
          // Continue with the next batch -- partial progress is better than
          // aborting the entire sync.
        }
      }
    } catch (e, st) {
      _log.e('SyncEngine: unexpected error syncing daily summaries', error: e, stackTrace: st);
    }
  }

  /// POST unsynced [BehaviouralFlags] rows to the flags endpoint.
  ///
  /// Successfully synced flag IDs are marked `synced = true` in the local
  /// database so they are not re-sent.
  Future<void> syncBehaviouralFlags() async {
    if (!await isConnected()) return;

    try {
      final flags = await _db.getUnsyncedFlags();
      if (flags.isEmpty) {
        _log.d('SyncEngine: no behavioural flags to sync');
        return;
      }

      _log.i('SyncEngine: syncing ${flags.length} behavioural flags');

      final batches = _partition(flags, _batchSize);
      var batchIndex = 0;

      for (final batch in batches) {
        batchIndex++;
        final payload = batch.map(_flagToJson).toList();
        final ids = batch.map((f) => f.id).toList();

        try {
          final response = await _dio.post<dynamic>(
            ApiEndpoints.flags,
            data: {'items': payload},
          );

          _log.i(
            'SyncEngine: flags batch $batchIndex/${batches.length} '
            'uploaded (${response.statusCode})',
          );

          // Mark these records as synced locally.
          await _db.markFlagsSynced(ids);
        } on DioException catch (e) {
          _log.e(
            'SyncEngine: flags batch $batchIndex failed: ${e.message}',
          );
        }
      }
    } catch (e, st) {
      _log.e('SyncEngine: unexpected error syncing behavioural flags', error: e, stackTrace: st);
    }
  }

  /// POST unsynced [ServiceHeartbeats] rows to the heartbeat endpoint.
  ///
  /// The heartbeats table does not have a dedicated query for unsynced rows
  /// in the current database, so this method fetches the last 48 hours and
  /// filters to unsynced records.  After a successful POST the rows are
  /// marked synced via a batch update.
  Future<void> syncHeartbeats() async {
    if (!await isConnected()) return;

    try {
      final allRecent = await _db.getHeartbeatsForLast48Hours();
      final unsynced = allRecent.where((h) => !h.synced).toList();

      if (unsynced.isEmpty) {
        _log.d('SyncEngine: no heartbeats to sync');
        return;
      }

      _log.i('SyncEngine: syncing ${unsynced.length} heartbeats');

      final batches = _partition(unsynced, _batchSize);
      var batchIndex = 0;

      for (final batch in batches) {
        batchIndex++;
        final payload = batch.map(_heartbeatToJson).toList();
        final ids = batch.map((h) => h.id).toList();

        try {
          final response = await _dio.post<dynamic>(
            ApiEndpoints.heartbeat,
            data: {'items': payload},
          );

          _log.i(
            'SyncEngine: heartbeat batch $batchIndex/${batches.length} '
            'uploaded (${response.statusCode})',
          );

          // Mark synced.  The database doesn't expose a dedicated helper for
          // heartbeats so we use a raw update via Drift companions.
          await _markHeartbeatsSynced(ids);
        } on DioException catch (e) {
          _log.e(
            'SyncEngine: heartbeat batch $batchIndex failed: ${e.message}',
          );
        }
      }
    } catch (e, st) {
      _log.e('SyncEngine: unexpected error syncing heartbeats', error: e, stackTrace: st);
    }
  }

  /// Returns `true` when the device has any network connectivity.
  Future<bool> isConnected() async {
    try {
      final results = await Connectivity().checkConnectivity();
      // connectivity_plus returns a list; `none` means no connectivity.
      return results.isNotEmpty &&
          !results.contains(ConnectivityResult.none);
    } catch (_) {
      // If the plugin throws (e.g. on unsupported platforms), assume offline
      // to avoid crashing the sync loop.
      return false;
    }
  }

  /// Releases the underlying Dio client and cancels pending requests.
  void dispose() {
    _dio.close(force: true);
    _log.i('SyncEngine: disposed');
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  /// Splits [list] into sublists of at most [size] elements.
  List<List<T>> _partition<T>(List<T> list, int size) {
    final result = <List<T>>[];
    for (var i = 0; i < list.length; i += size) {
      result.add(list.sublist(i, min(i + size, list.length)));
    }
    return result;
  }

  /// Serialise a [StepDailySummaryData] row to a JSON-friendly map.
  ///
  /// The composite idempotency key is `member_id + date`.
  Map<String, dynamic> _dailySummaryToJson(StepDailySummaryData s) {
    return {
      'member_id': s.memberId,
      'date': s.date,
      'total_steps': s.totalSteps,
      'active_hours': s.activeHours,
      'peak_hour': s.peakHour,
      'first_active_hour': s.firstActiveHour,
      'last_active_hour': s.lastActiveHour,
      'activity_window_hours': s.activityWindowHours,
      'day_of_week': s.dayOfWeek,
      'has_wearable_sleep': s.hasWearableSleep,
      'sleep_onset_time': s.sleepOnsetTime,
      'sleep_offset_time': s.sleepOffsetTime,
      'sleep_duration_min': s.sleepDurationMin,
      'sleep_efficiency_pct': s.sleepEfficiencyPct,
      'wake_episodes': s.wakeEpisodes,
      'computed_at': s.computedAt.toUtc().toIso8601String(),
    };
  }

  /// Serialise a [BehaviouralFlag] row to a JSON-friendly map.
  ///
  /// The composite idempotency key is `member_id + flag_date + flag_type`.
  Map<String, dynamic> _flagToJson(BehaviouralFlag f) {
    return {
      'member_id': f.memberId,
      'flag_date': f.flagDate,
      'flag_type': f.flagType,
      'severity': f.severity,
      'value': f.value,
      'baseline': f.baseline,
      'created_at': f.createdAt.toUtc().toIso8601String(),
    };
  }

  /// Serialise a [ServiceHeartbeat] row to a JSON-friendly map.
  ///
  /// The composite idempotency key is `platform + timestamp (truncated to hour)`.
  Map<String, dynamic> _heartbeatToJson(ServiceHeartbeat h) {
    return {
      'timestamp': h.timestamp.toUtc().toIso8601String(),
      'platform': h.platform,
      'trigger_source': h.triggerSource,
      'steps_captured': h.stepsCaptured,
    };
  }

  /// Mark heartbeat rows as synced by ID.
  ///
  /// The [AppDatabase] exposes `markFlagsSynced` but not an equivalent for
  /// heartbeats, so we write directly through the Drift update API.
  Future<void> _markHeartbeatsSynced(List<int> ids) async {
    if (ids.isEmpty) return;

    // Use the database's Drift update builder to set synced = true for
    // the given IDs on the serviceHeartbeats table.
    await (_db.update(_db.serviceHeartbeats)
          ..where((t) => t.id.isIn(ids)))
        .write(const ServiceHeartbeatsCompanion(synced: Value(true)));
  }
}
