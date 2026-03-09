import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';

class WeekViewScreen extends ConsumerStatefulWidget {
  const WeekViewScreen({super.key});

  @override
  ConsumerState<WeekViewScreen> createState() => _WeekViewScreenState();
}

class _WeekViewScreenState extends ConsumerState<WeekViewScreen> {
  late DateTime _weekStart;

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _weekStart = now.subtract(Duration(days: now.weekday - 1)); // Monday
  }

  @override
  Widget build(BuildContext context) {
    final weekData = ref.watch(weekSummariesProvider(_weekStart));
    final isTester = ref.watch(testerModeProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Week View')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Week navigator
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: const Icon(Icons.chevron_left),
                  onPressed: () => setState(() =>
                      _weekStart = _weekStart.subtract(const Duration(days: 7))),
                ),
                Text(
                  '${DateFormat('d MMM').format(_weekStart)} - '
                  '${DateFormat('d MMM').format(_weekStart.add(const Duration(days: 6)))}',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                IconButton(
                  icon: const Icon(Icons.chevron_right),
                  onPressed: _weekStart
                          .add(const Duration(days: 7))
                          .isBefore(DateTime.now())
                      ? () => setState(() =>
                          _weekStart = _weekStart.add(const Duration(days: 7)))
                      : null,
                ),
              ],
            ),
            const SizedBox(height: 16),

            weekData.when(
              data: (summaries) => Column(
                children: [
                  _buildWeekChart(summaries),
                  const SizedBox(height: 16),
                  _buildSummaryCards(summaries),
                  if (isTester) ...[
                    const SizedBox(height: 16),
                    _buildFlagTable(summaries),
                  ],
                ],
              ),
              loading: () => const LoadingCard(),
              error: (e, _) => ErrorCard(message: '$e'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWeekChart(List<StepDailySummaryData> summaries) {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    final Map<int, int> daySteps = {};
    for (int i = 0; i < 7; i++) {
      daySteps[i] = 0;
    }
    for (final s in summaries) {
      daySteps[s.dayOfWeek] = s.totalSteps;
    }

    // Calculate baseline (28-day median approximation)
    final allSteps = summaries.map((s) => s.totalSteps).toList();
    final baseline = allSteps.isNotEmpty
        ? allSteps.reduce((a, b) => a + b) / allSteps.length
        : 0.0;

    final maxY = daySteps.values
            .fold<int>(0, (a, b) => a > b ? a : b)
            .toDouble() *
        1.2;

    return SizedBox(
      height: 220,
      child: BarChart(
        BarChartData(
          maxY: maxY > 0 ? maxY : 100,
          titlesData: FlTitlesData(
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, _) {
                  final idx = value.toInt();
                  if (idx < 0 || idx > 6) return const SizedBox.shrink();
                  return Text(dayNames[idx],
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: idx >= 5
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ));
                },
              ),
            ),
            leftTitles: const AxisTitles(
                sideTitles: SideTitles(showTitles: false)),
            topTitles: const AxisTitles(
                sideTitles: SideTitles(showTitles: false)),
            rightTitles: const AxisTitles(
                sideTitles: SideTitles(showTitles: false)),
          ),
          gridData: const FlGridData(show: false),
          borderData: FlBorderData(show: false),
          extraLinesData: ExtraLinesData(
            horizontalLines: [
              if (baseline > 0)
                HorizontalLine(
                  y: baseline,
                  color: AppTheme.grey,
                  strokeWidth: 1,
                  dashArray: [5, 5],
                  label: HorizontalLineLabel(
                    show: true,
                    labelResolver: (_) => 'Baseline',
                    style: const TextStyle(fontSize: 10, color: AppTheme.grey),
                  ),
                ),
            ],
          ),
          barGroups: List.generate(7, (i) {
            final steps = daySteps[i] ?? 0;
            final isWeekend = i >= 5;
            final aboveBaseline = steps >= baseline;
            return BarChartGroupData(
              x: i,
              barRods: [
                BarChartRodData(
                  toY: steps.toDouble(),
                  color: isWeekend
                      ? (aboveBaseline
                          ? AppTheme.primaryGreen.withValues(alpha: 0.7)
                          : AppTheme.amber)
                      : (aboveBaseline
                          ? AppTheme.primaryGreen
                          : AppTheme.amber),
                  width: 24,
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(4)),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }

  Widget _buildSummaryCards(List<StepDailySummaryData> summaries) {
    final thisWeekTotal =
        summaries.fold<int>(0, (a, s) => a + s.totalSteps);
    final weekdaySteps = summaries
        .where((s) => s.dayOfWeek < 5)
        .map((s) => s.totalSteps)
        .toList();
    final weekendSteps = summaries
        .where((s) => s.dayOfWeek >= 5)
        .map((s) => s.totalSteps)
        .toList();
    final weekdayAvg = weekdaySteps.isNotEmpty
        ? weekdaySteps.reduce((a, b) => a + b) / weekdaySteps.length
        : 0.0;
    final weekendAvg = weekendSteps.isNotEmpty
        ? weekendSteps.reduce((a, b) => a + b) / weekendSteps.length
        : 0.0;
    final ratio = weekdayAvg > 0 ? weekendAvg / weekdayAvg : 0.0;
    final activeDays =
        summaries.where((s) => s.totalSteps > 0).length;

    return Row(
      children: [
        Expanded(
          child: MetricCard(
            label: 'This Week',
            value: NumberFormat.compact().format(thisWeekTotal),
            icon: Icons.directions_walk,
          ),
        ),
        Expanded(
          child: MetricCard(
            label: 'Wknd/Wkdy',
            value: ratio.toStringAsFixed(2),
            icon: Icons.compare_arrows,
            color: ratio < 0.6 ? AppTheme.amber : null,
          ),
        ),
        Expanded(
          child: MetricCard(
            label: 'Active Days',
            value: '$activeDays/7',
            icon: Icons.calendar_today,
          ),
        ),
      ],
    );
  }

  Widget _buildFlagTable(List<StepDailySummaryData> summaries) {
    // Placeholder for tester flag display
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Flags (Tester)',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            const Text('Flag analysis will appear here after data collection.',
                style: TextStyle(color: AppTheme.grey)),
          ],
        ),
      ),
    );
  }
}
