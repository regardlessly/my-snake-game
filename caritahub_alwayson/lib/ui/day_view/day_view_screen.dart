import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/core/constants.dart';

class DayViewScreen extends ConsumerStatefulWidget {
  const DayViewScreen({super.key});

  @override
  ConsumerState<DayViewScreen> createState() => _DayViewScreenState();
}

class _DayViewScreenState extends ConsumerState<DayViewScreen> {
  late DateTime _selectedDate;
  int? _tappedHour;

  @override
  void initState() {
    super.initState();
    _selectedDate = DateTime.now();
  }

  String get _dateStr => _selectedDate.toIso8601String().substring(0, 10);

  @override
  Widget build(BuildContext context) {
    final hourlyData = ref.watch(hourlyStepsProvider(_dateStr));
    final dailySummary = ref.watch(dailySummaryProvider(_dateStr));
    final isTester = ref.watch(testerModeProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Day View')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            DateNavigator(
              date: _selectedDate,
              onDateChanged: (d) => setState(() {
                _selectedDate = d;
                _tappedHour = null;
              }),
            ),
            const SizedBox(height: 16),

            // Hourly bar chart
            hourlyData.when(
              data: (data) => _buildHourlyChart(data),
              loading: () => const LoadingCard(),
              error: (e, _) => ErrorCard(message: '$e'),
            ),

            // Tapped hour detail
            if (_tappedHour != null)
              hourlyData.when(
                data: (data) {
                  final entry = data
                      .where((d) => d.hour == _tappedHour)
                      .firstOrNull;
                  if (entry == null) return const SizedBox.shrink();
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        children: [
                          Text('Hour ${_tappedHour!}:00 - ${_tappedHour! + 1}:00',
                              style: Theme.of(context).textTheme.titleSmall),
                          Text('${entry.stepCount} steps',
                              style: const TextStyle(
                                  fontSize: 24, fontWeight: FontWeight.bold)),
                          Text('Source: ${entry.source}'),
                          Text(
                              'Captured: ${DateFormat.Hms().format(entry.capturedAt)}'),
                        ],
                      ),
                    ),
                  );
                },
                loading: () => const SizedBox.shrink(),
                error: (_, __) => const SizedBox.shrink(),
              ),

            const SizedBox(height: 16),

            // Summary strip
            dailySummary.when(
              data: (summary) => _buildSummaryStrip(summary),
              loading: () => const SizedBox.shrink(),
              error: (_, __) => const SizedBox.shrink(),
            ),

            // Tester-only raw data table
            if (isTester) ...[
              const SizedBox(height: 16),
              hourlyData.when(
                data: (data) => _buildRawDataTable(data),
                loading: () => const SizedBox.shrink(),
                error: (_, __) => const SizedBox.shrink(),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildHourlyChart(List data) {
    // Build 24-hour map
    final Map<int, int> hourMap = {};
    for (int h = 0; h < 24; h++) {
      hourMap[h] = 0;
    }
    for (final entry in data) {
      hourMap[entry.hour] = entry.stepCount;
    }

    final maxSteps =
        hourMap.values.fold<int>(0, (a, b) => a > b ? a : b).toDouble();

    return SizedBox(
      height: 200,
      child: BarChart(
        BarChartData(
          maxY: maxSteps > 0 ? maxSteps * 1.1 : 100,
          barTouchData: BarTouchData(
            touchCallback: (event, response) {
              if (response?.spot != null && event.isInterestedForInteractions) {
                setState(() => _tappedHour = response!.spot!.touchedBarGroupIndex);
              }
            },
          ),
          titlesData: FlTitlesData(
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, _) {
                  if (value.toInt() % 3 == 0) {
                    return Text('${value.toInt()}',
                        style: const TextStyle(fontSize: 10));
                  }
                  return const SizedBox.shrink();
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
          barGroups: List.generate(24, (hour) {
            final steps = hourMap[hour] ?? 0;
            final isNight = hour >= AppConstants.nightStartHour &&
                hour <= AppConstants.nightEndHour;
            final isAnomaly = isNight &&
                steps > AppConstants.nightWanderingSteps;
            final color = isAnomaly
                ? AppTheme.red
                : isNight
                    ? AppTheme.grey
                    : AppTheme.primaryGreen;
            return BarChartGroupData(
              x: hour,
              barRods: [
                BarChartRodData(
                  toY: steps.toDouble(),
                  color: _tappedHour == hour
                      ? Theme.of(context).colorScheme.primary
                      : color,
                  width: 8,
                  borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(2)),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }

  Widget _buildSummaryStrip(dynamic summary) {
    if (summary == null) {
      return const Card(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text('No data for this day'),
        ),
      );
    }
    return Row(
      children: [
        Expanded(
          child: MetricCard(
            label: 'Total Steps',
            value: NumberFormat('#,###').format(summary.totalSteps),
            icon: Icons.directions_walk,
          ),
        ),
        Expanded(
          child: MetricCard(
            label: 'Active Hours',
            value: '${summary.activeHours}',
            icon: Icons.access_time,
          ),
        ),
        Expanded(
          child: MetricCard(
            label: 'Window',
            value: '${summary.activityWindowHours.toStringAsFixed(1)}h',
            icon: Icons.schedule,
          ),
        ),
      ],
    );
  }

  Widget _buildRawDataTable(List data) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Raw Data (Tester)',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            Table(
              columnWidths: const {
                0: FlexColumnWidth(1),
                1: FlexColumnWidth(1.5),
                2: FlexColumnWidth(2),
                3: FlexColumnWidth(1),
              },
              children: [
                const TableRow(children: [
                  Text('Hour', style: TextStyle(fontWeight: FontWeight.bold)),
                  Text('Steps', style: TextStyle(fontWeight: FontWeight.bold)),
                  Text('Captured',
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  Text('Sync', style: TextStyle(fontWeight: FontWeight.bold)),
                ]),
                ...data.map((d) => TableRow(children: [
                      Text('${d.hour}:00'),
                      Text('${d.stepCount}'),
                      Text(DateFormat.Hms().format(d.capturedAt)),
                      Icon(
                        d.synced ? Icons.check_circle : Icons.cancel,
                        color:
                            d.synced ? AppTheme.primaryGreen : AppTheme.red,
                        size: 16,
                      ),
                    ])),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
