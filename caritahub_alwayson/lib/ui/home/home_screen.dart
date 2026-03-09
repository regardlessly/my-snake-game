import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/ui/day_view/day_view_screen.dart';
import 'package:caritahub_alwayson/ui/week_view/week_view_screen.dart';
import 'package:caritahub_alwayson/ui/trend_view/trend_view_screen.dart';
import 'package:caritahub_alwayson/ui/settings/settings_screen.dart';
import 'package:caritahub_alwayson/ui/tester/tester_dashboard.dart';
import 'package:intl/intl.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  Timer? _refreshTimer;

  @override
  void initState() {
    super.initState();
    // Collect health data immediately when screen opens
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _collectAndRefresh();
    });
    // Auto-refresh every 5 minutes while app is open
    _refreshTimer = Timer.periodic(const Duration(minutes: 5), (_) {
      _collectAndRefresh();
    });
  }

  @override
  void dispose() {
    _refreshTimer?.cancel();
    super.dispose();
  }

  Future<void> _collectAndRefresh() async {
    try {
      final collector = ref.read(healthDataCollectorProvider);
      await collector.collectNow();
    } catch (e) {
      debugPrint('Health collection error: $e');
    }
    ref.invalidate(todayStepsProvider);
    ref.invalidate(lastHeartbeatProvider);
  }

  Future<void> _onRefresh() async {
    await _collectAndRefresh();
  }

  @override
  Widget build(BuildContext context) {
    final isTester = ref.watch(testerModeProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('CaritaHub'),
        actions: [
          if (isTester)
            IconButton(
              icon: const Icon(Icons.developer_mode),
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (_) => const TesterDashboard()),
              ),
            ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const SettingsScreen()),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _onRefresh,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              const _StatusCard(),
              const SizedBox(height: 16),
              _NavigationGrid(isTester: isTester),
            ],
          ),
        ),
      ),
    );
  }
}

/// Home Status Card - always visible to all users.
class _StatusCard extends ConsumerWidget {
  const _StatusCard();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todaySteps = ref.watch(todayStepsProvider);
    final lastHeartbeat = ref.watch(lastHeartbeatProvider);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Steps row
            todaySteps.when(
              data: (steps) => Row(
                children: [
                  Icon(Icons.directions_walk,
                      size: 40, color: AppTheme.stepsColor(steps, 5000)),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        NumberFormat('#,###').format(steps),
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.stepsColor(steps, 5000),
                        ),
                      ),
                      Text(
                        'steps today',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ],
                  ),
                ],
              ),
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Text('Error: $e'),
            ),
            const Divider(height: 24),

            // Activity status + sync + service dot
            Row(
              children: [
                Expanded(
                  child: todaySteps.when(
                    data: (steps) {
                      final status = steps > 1000
                          ? 'Active today'
                          : steps > 0
                              ? 'Quiet today'
                              : 'No data yet';
                      return Text(status,
                          style: Theme.of(context).textTheme.bodyMedium);
                    },
                    loading: () => const Text('...'),
                    error: (_, __) => const Text('Unknown'),
                  ),
                ),
                // Sync time
                lastHeartbeat.when(
                  data: (hb) {
                    if (hb == null) return const Text('No sync');
                    final ago = DateTime.now().difference(hb.timestamp);
                    final color = AppTheme.syncColor(ago);
                    return Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        StatusDot(color: color),
                        const SizedBox(width: 6),
                        Text(
                          'Synced ${_formatDuration(ago)} ago',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    );
                  },
                  loading: () => const SizedBox.shrink(),
                  error: (_, __) => const SizedBox.shrink(),
                ),
              ],
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

class _NavigationGrid extends StatelessWidget {
  final bool isTester;

  const _NavigationGrid({required this.isTester});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: _NavCard(
                icon: Icons.bar_chart,
                label: 'Day View',
                subtitle: 'Hourly timeline',
                onTap: () => Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const DayViewScreen())),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _NavCard(
                icon: Icons.calendar_view_week,
                label: 'Week View',
                subtitle: '7-day summary',
                onTap: () => Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const WeekViewScreen())),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _NavCard(
                icon: Icons.trending_up,
                label: 'Trends',
                subtitle: '4-week analysis',
                onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => const TrendViewScreen())),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: isTester
                  ? _NavCard(
                      icon: Icons.developer_mode,
                      label: 'Tester',
                      subtitle: 'Debug tools',
                      onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const TesterDashboard())),
                    )
                  : const SizedBox.shrink(),
            ),
          ],
        ),
      ],
    );
  }
}

class _NavCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String subtitle;
  final VoidCallback onTap;

  const _NavCard({
    required this.icon,
    required this.label,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Icon(icon, size: 32,
                  color: Theme.of(context).colorScheme.primary),
              const SizedBox(height: 8),
              Text(label,
                  style: Theme.of(context).textTheme.titleSmall),
              Text(subtitle,
                  style: Theme.of(context).textTheme.bodySmall),
            ],
          ),
        ),
      ),
    );
  }
}
