import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';

class TrendViewScreen extends ConsumerWidget {
  const TrendViewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final trendData = ref.watch(trendDataProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('4-Week Trends')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: trendData.when(
          data: (data) => Column(
            children: [
              _TrendLineChart(data: data),
              const SizedBox(height: 16),
              _TrendDirectionBadge(data: data),
              const SizedBox(height: 16),
              _WeekendDeclinePanel(data: data),
              const SizedBox(height: 16),
              _DayOfWeekHeatmap(data: data),
            ],
          ),
          loading: () => const LoadingCard(message: 'Loading trend data...'),
          error: (e, _) => ErrorCard(message: '$e'),
        ),
      ),
    );
  }
}

/// 28-day rolling daily step totals with 7-day moving average overlay.
class _TrendLineChart extends StatelessWidget {
  final List<StepDailySummaryData> data;

  const _TrendLineChart({required this.data});

  @override
  Widget build(BuildContext context) {
    if (data.isEmpty) {
      return const Card(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text('No trend data available yet'),
        ),
      );
    }

    final dailySpots = <FlSpot>[];
    final avgSpots = <FlSpot>[];

    for (int i = 0; i < data.length; i++) {
      dailySpots.add(FlSpot(i.toDouble(), data[i].totalSteps.toDouble()));

      // 7-day moving average
      if (i >= 6) {
        final window = data.sublist(i - 6, i + 1);
        final avg = window.map((d) => d.totalSteps).reduce((a, b) => a + b) /
            window.length;
        avgSpots.add(FlSpot(i.toDouble(), avg));
      }
    }

    final maxY =
        data.map((d) => d.totalSteps).reduce((a, b) => a > b ? a : b) * 1.2;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('28-Day Activity',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 12),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  maxY: maxY.toDouble(),
                  minY: 0,
                  titlesData: FlTitlesData(
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        interval: 7,
                        getTitlesWidget: (value, _) {
                          final idx = value.toInt();
                          if (idx < 0 || idx >= data.length) {
                            return const SizedBox.shrink();
                          }
                          return Text(
                            DateFormat('d/M').format(
                                DateTime.parse(data[idx].date)),
                            style: const TextStyle(fontSize: 9),
                          );
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
                  lineBarsData: [
                    LineChartBarData(
                      spots: dailySpots,
                      isCurved: false,
                      color: AppTheme.primaryGreen.withValues(alpha: 0.4),
                      dotData: const FlDotData(show: false),
                      barWidth: 1,
                    ),
                    if (avgSpots.isNotEmpty)
                      LineChartBarData(
                        spots: avgSpots,
                        isCurved: true,
                        color: AppTheme.primaryGreen,
                        dotData: const FlDotData(show: false),
                        barWidth: 2.5,
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Trend direction badge: up/flat/down arrow with % change.
class _TrendDirectionBadge extends StatelessWidget {
  final List<StepDailySummaryData> data;

  const _TrendDirectionBadge({required this.data});

  @override
  Widget build(BuildContext context) {
    if (data.length < 14) {
      return const SizedBox.shrink();
    }

    final midpoint = data.length ~/ 2;
    final firstHalf = data.sublist(0, midpoint);
    final secondHalf = data.sublist(midpoint);

    final firstAvg =
        firstHalf.map((d) => d.totalSteps).reduce((a, b) => a + b) /
            firstHalf.length;
    final secondAvg =
        secondHalf.map((d) => d.totalSteps).reduce((a, b) => a + b) /
            secondHalf.length;

    final change = firstAvg > 0
        ? ((secondAvg - firstAvg) / firstAvg * 100)
        : 0.0;

    final icon = change > 5
        ? Icons.trending_up
        : change < -5
            ? Icons.trending_down
            : Icons.trending_flat;
    final color = change > 5
        ? AppTheme.primaryGreen
        : change < -5
            ? AppTheme.red
            : AppTheme.amber;
    final label = change > 5
        ? 'Improving'
        : change < -5
            ? 'Declining'
            : 'Stable';

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 32),
            const SizedBox(width: 12),
            Column(
              children: [
                Text(label,
                    style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: color)),
                Text('${change.toStringAsFixed(1)}% vs prior period',
                    style: Theme.of(context).textTheme.bodySmall),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Weekend decline panel: last 4 weekend averages.
class _WeekendDeclinePanel extends StatelessWidget {
  final List<StepDailySummaryData> data;

  const _WeekendDeclinePanel({required this.data});

  @override
  Widget build(BuildContext context) {
    final weekendDays = data.where((d) => d.dayOfWeek >= 5).toList();
    if (weekendDays.isEmpty) return const SizedBox.shrink();

    // Group by week
    final weeks = <int, List<int>>{};
    for (final d in weekendDays) {
      final date = DateTime.parse(d.date);
      final weekNum = date.difference(DateTime(date.year)).inDays ~/ 7;
      weeks.putIfAbsent(weekNum, () => []).add(d.totalSteps);
    }

    final weekAvgs = weeks.entries.toList()
      ..sort((a, b) => a.key.compareTo(b.key));
    final lastFour = weekAvgs.length > 4
        ? weekAvgs.sublist(weekAvgs.length - 4)
        : weekAvgs;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Weekend Activity (Last ${lastFour.length} Weeks)',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 12),
            SizedBox(
              height: 60,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: lastFour.map((entry) {
                  final avg =
                      entry.value.reduce((a, b) => a + b) / entry.value.length;
                  final maxAvg = lastFour
                      .map((e) =>
                          e.value.reduce((a, b) => a + b) / e.value.length)
                      .reduce((a, b) => a > b ? a : b);
                  final ratio = maxAvg > 0 ? avg / maxAvg : 0.0;
                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(NumberFormat.compact().format(avg.round()),
                              style: const TextStyle(fontSize: 10)),
                          const SizedBox(height: 2),
                          Container(
                            height: 40 * ratio,
                            decoration: BoxDecoration(
                              color: AppTheme.primaryGreen
                                  .withValues(alpha: 0.3 + 0.7 * ratio),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Day-of-week heatmap: 7 cols (Mon-Sun) x up to 4 rows (weeks).
class _DayOfWeekHeatmap extends StatelessWidget {
  final List<StepDailySummaryData> data;

  const _DayOfWeekHeatmap({required this.data});

  @override
  Widget build(BuildContext context) {
    if (data.isEmpty) return const SizedBox.shrink();

    // Group data into weeks
    final weeks = <int, Map<int, int>>{};
    for (final d in data) {
      final date = DateTime.parse(d.date);
      final weekNum = date.difference(DateTime(date.year)).inDays ~/ 7;
      weeks.putIfAbsent(weekNum, () => {});
      weeks[weekNum]![d.dayOfWeek] = d.totalSteps;
    }

    final sortedWeeks = weeks.entries.toList()
      ..sort((a, b) => a.key.compareTo(b.key));
    final lastFourWeeks = sortedWeeks.length > 4
        ? sortedWeeks.sublist(sortedWeeks.length - 4)
        : sortedWeeks;

    // Overall baseline for color
    final allSteps = data.map((d) => d.totalSteps).toList()..sort();
    final median = allSteps.isNotEmpty
        ? allSteps[allSteps.length ~/ 2].toDouble()
        : 1.0;

    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Day-of-Week Pattern',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 12),
            // Header
            Row(
              children: [
                const SizedBox(width: 32),
                ...dayLabels.map((l) => Expanded(
                      child: Center(
                          child: Text(l,
                              style: const TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold))),
                    )),
              ],
            ),
            const SizedBox(height: 4),
            // Rows
            ...lastFourWeeks.asMap().entries.map((entry) {
              final weekData = entry.value.value;
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 2),
                child: Row(
                  children: [
                    SizedBox(
                      width: 32,
                      child: Text('W${entry.key + 1}',
                          style: const TextStyle(fontSize: 10)),
                    ),
                    ...List.generate(7, (dow) {
                      final steps = weekData[dow] ?? 0;
                      final ratio = median > 0 ? steps / median : 0.0;
                      return Expanded(
                        child: Container(
                          margin: const EdgeInsets.all(1),
                          height: 28,
                          decoration: BoxDecoration(
                            color: _heatmapColor(ratio),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Center(
                            child: Text(
                              steps > 0
                                  ? NumberFormat.compact().format(steps)
                                  : '-',
                              style: const TextStyle(
                                  fontSize: 8, color: Colors.white),
                            ),
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Color _heatmapColor(double ratio) {
    if (ratio >= 1.2) return AppTheme.primaryGreen;
    if (ratio >= 0.8) return AppTheme.primaryGreen.withValues(alpha: 0.6);
    if (ratio >= 0.5) return AppTheme.amber;
    if (ratio > 0) return AppTheme.red.withValues(alpha: 0.7);
    return AppTheme.grey.withValues(alpha: 0.2);
  }
}
