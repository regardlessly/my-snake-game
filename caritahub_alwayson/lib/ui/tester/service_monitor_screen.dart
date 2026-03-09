import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/core/constants.dart';
import 'package:caritahub_alwayson/services/background/background_service_manager.dart';
import 'dart:convert';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class ServiceMonitorScreen extends ConsumerWidget {
  const ServiceMonitorScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lastHb = ref.watch(lastHeartbeatProvider);
    final hbHistory = ref.watch(heartbeatHistoryProvider);
    final uptime = ref.watch(uptimePercentProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // Status banner
          lastHb.when(
            data: (hb) => _StatusBanner(heartbeat: hb),
            loading: () => const LoadingCard(),
            error: (e, _) => ErrorCard(message: '$e'),
          ),
          const SizedBox(height: 12),

          // Uptime
          uptime.when(
            data: (pct) => Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    const Icon(Icons.speed, size: 32),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('${pct.toStringAsFixed(1)}%',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: pct >= AppConstants.targetUptimePercent
                                  ? AppTheme.primaryGreen
                                  : AppTheme.red,
                            )),
                        Text('24h Uptime (target: ${AppConstants.targetUptimePercent}%)'),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            loading: () => const SizedBox.shrink(),
            error: (_, __) => const SizedBox.shrink(),
          ),
          const SizedBox(height: 12),

          // Heartbeat timeline
          hbHistory.when(
            data: (heartbeats) => _HeartbeatTimeline(heartbeats: heartbeats),
            loading: () => const LoadingCard(),
            error: (e, _) => ErrorCard(message: '$e'),
          ),
          const SizedBox(height: 12),

          // Manual controls
          _ManualControls(ref: ref),
        ],
      ),
    );
  }
}

class _StatusBanner extends StatelessWidget {
  final ServiceHeartbeat? heartbeat;

  const _StatusBanner({required this.heartbeat});

  @override
  Widget build(BuildContext context) {
    if (heartbeat == null) {
      return Card(
        color: AppTheme.red.withValues(alpha: 0.1),
        child: const Padding(
          padding: EdgeInsets.all(20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error, color: AppTheme.red, size: 32),
              SizedBox(width: 12),
              Text('Service DEAD',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.red,
                  )),
            ],
          ),
        ),
      );
    }

    final ago = DateTime.now().difference(heartbeat!.timestamp);
    final isHealthy = ago < AppConstants.heartbeatWarningThreshold;

    return Card(
      color: isHealthy
          ? AppTheme.primaryGreen.withValues(alpha: 0.1)
          : AppTheme.amber.withValues(alpha: 0.1),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  isHealthy ? Icons.check_circle : Icons.warning,
                  color: isHealthy ? AppTheme.primaryGreen : AppTheme.amber,
                  size: 32,
                ),
                const SizedBox(width: 12),
                Text(
                  isHealthy ? 'Running' : 'Degraded - gaps detected',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: isHealthy ? AppTheme.primaryGreen : AppTheme.amber,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Last heartbeat: ${DateFormat('HH:mm:ss').format(heartbeat!.timestamp)}'
              ' (${_formatDuration(ago)} ago)',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            Text(
              'Trigger: ${heartbeat!.triggerSource}',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }

  String _formatDuration(Duration d) {
    if (d.inMinutes < 1) return '<1 min';
    if (d.inMinutes < 60) return '${d.inMinutes} min';
    return '${d.inHours}h ${d.inMinutes % 60}m';
  }
}

class _HeartbeatTimeline extends StatelessWidget {
  final List<ServiceHeartbeat> heartbeats;

  const _HeartbeatTimeline({required this.heartbeats});

  @override
  Widget build(BuildContext context) {
    if (heartbeats.isEmpty) {
      return const Card(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text('No heartbeat data yet'),
        ),
      );
    }

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('48h Heartbeat Log',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: heartbeats.length.clamp(0, 30),
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, i) {
                final hb = heartbeats[i];
                final gap = i < heartbeats.length - 1
                    ? heartbeats[i]
                        .timestamp
                        .difference(heartbeats[i + 1].timestamp)
                    : Duration.zero;
                final isLargeGap =
                    gap > AppConstants.heartbeatWarningThreshold;

                return ListTile(
                  dense: true,
                  leading: Icon(
                    Icons.favorite,
                    color: isLargeGap ? AppTheme.red : AppTheme.primaryGreen,
                    size: 16,
                  ),
                  title: Text(
                    DateFormat('HH:mm:ss').format(hb.timestamp),
                    style: const TextStyle(fontSize: 13),
                  ),
                  subtitle: Text(
                    '${hb.triggerSource} | ${hb.stepsCaptured} steps',
                    style: const TextStyle(fontSize: 11),
                  ),
                  trailing: isLargeGap && gap.inMinutes > 0
                      ? Text(
                          '${gap.inMinutes}m gap',
                          style: const TextStyle(
                              color: AppTheme.red, fontSize: 11),
                        )
                      : null,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _ManualControls extends StatelessWidget {
  final WidgetRef ref;

  const _ManualControls({required this.ref});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Manual Controls',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                ElevatedButton.icon(
                  onPressed: () => BackgroundServiceManager.restartIfNeeded(),
                  icon: const Icon(Icons.restart_alt, size: 18),
                  label: const Text('Restart Service'),
                ),
                ElevatedButton.icon(
                  onPressed: () async {
                    final syncEngine = ref.read(syncEngineProvider);
                    await syncEngine.syncAll();
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Sync triggered')),
                      );
                    }
                  },
                  icon: const Icon(Icons.sync, size: 18),
                  label: const Text('Sync Now'),
                ),
                OutlinedButton.icon(
                  onPressed: () => _exportLogs(context),
                  icon: const Icon(Icons.share, size: 18),
                  label: const Text('Export Logs'),
                ),
                OutlinedButton.icon(
                  onPressed: () => _confirmClearData(context),
                  icon: const Icon(Icons.delete_forever,
                      size: 18, color: AppTheme.red),
                  label: const Text('Clear Data',
                      style: TextStyle(color: AppTheme.red)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _exportLogs(BuildContext context) async {
    final db = ref.read(databaseProvider);
    final heartbeats = await db.getHeartbeatsForLast48Hours();
    final gaps = await db.getRecentGaps();

    final logData = {
      'exported_at': DateTime.now().toIso8601String(),
      'heartbeats': heartbeats
          .map((h) => {
                'timestamp': h.timestamp.toIso8601String(),
                'trigger': h.triggerSource,
                'steps': h.stepsCaptured,
              })
          .toList(),
      'gaps': gaps
          .map((g) => {
                'date': g.gapDate,
                'start_hour': g.gapStartHour,
                'end_hour': g.gapEndHour,
                'duration_min': g.gapDurationMinutes,
              })
          .toList(),
    };

    final dir = await getApplicationDocumentsDirectory();
    final file = File('${dir.path}/caritahub_debug_log.json');
    await file.writeAsString(const JsonEncoder.withIndent('  ').convert(logData));

    await Share.shareXFiles([XFile(file.path)]);
  }

  Future<void> _confirmClearData(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Clear All Data?'),
        content: const Text(
            'This will delete all locally stored steps, flags, and heartbeats. This cannot be undone.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Cancel')),
          TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Clear', style: TextStyle(color: AppTheme.red))),
        ],
      ),
    );

    if (confirmed == true) {
      final db = ref.read(databaseProvider);
      await db.clearAllData();
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('All local data cleared')),
        );
      }
    }
  }
}
