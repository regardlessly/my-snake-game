import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:caritahub_alwayson/data/database/app_database.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/ui/shared/widgets.dart';
import 'package:caritahub_alwayson/core/enums.dart';

class FlagFeedScreen extends ConsumerStatefulWidget {
  const FlagFeedScreen({super.key});

  @override
  ConsumerState<FlagFeedScreen> createState() => _FlagFeedScreenState();
}

class _FlagFeedScreenState extends ConsumerState<FlagFeedScreen> {
  String? _severityFilter;
  String? _domainFilter;
  bool? _syncFilter;

  @override
  Widget build(BuildContext context) {
    final flags = ref.watch(recentFlagsProvider);

    return Column(
      children: [
        // Filter bar
        Padding(
          padding: const EdgeInsets.all(12),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _FilterChip(
                  label: 'Severity',
                  value: _severityFilter,
                  options: const ['low', 'medium', 'high'],
                  onSelected: (v) => setState(() => _severityFilter = v),
                ),
                const SizedBox(width: 8),
                _FilterChip(
                  label: 'Domain',
                  value: _domainFilter,
                  options: RimDomain.values.map((d) => d.value).toList(),
                  onSelected: (v) => setState(() => _domainFilter = v),
                ),
                const SizedBox(width: 8),
                _FilterChip(
                  label: 'Sync',
                  value: _syncFilter == null
                      ? null
                      : _syncFilter!
                          ? 'synced'
                          : 'pending',
                  options: const ['synced', 'pending'],
                  onSelected: (v) =>
                      setState(() => _syncFilter = v == 'synced'),
                ),
              ],
            ),
          ),
        ),

        // Flag list
        Expanded(
          child: flags.when(
            data: (flagList) {
              var filtered = flagList;
              if (_severityFilter != null) {
                filtered = filtered
                    .where((f) => f.severity == _severityFilter)
                    .toList();
              }
              if (_domainFilter != null) {
                filtered = filtered.where((f) {
                  final flagType = FlagType.values.firstWhere(
                    (t) => t.value == f.flagType,
                    orElse: () => FlagType.lowDailySteps,
                  );
                  return flagType.domain.value == _domainFilter;
                }).toList();
              }
              if (_syncFilter != null) {
                filtered = filtered
                    .where((f) => f.synced == _syncFilter)
                    .toList();
              }

              if (filtered.isEmpty) {
                return const Center(
                  child: Text('No flags matching filters'),
                );
              }

              return ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                itemCount: filtered.length,
                itemBuilder: (context, i) => _FlagCard(flag: filtered[i]),
              );
            },
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Center(child: ErrorCard(message: '$e')),
          ),
        ),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final String? value;
  final List<String> options;
  final ValueChanged<String?> onSelected;

  const _FilterChip({
    required this.label,
    required this.value,
    required this.options,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String?>(
      onSelected: onSelected,
      itemBuilder: (_) => [
        PopupMenuItem(value: null, child: Text('All $label')),
        ...options.map((o) => PopupMenuItem(value: o, child: Text(o))),
      ],
      child: Chip(
        label: Text(value ?? label),
        avatar: value != null
            ? const Icon(Icons.filter_alt, size: 16)
            : null,
        deleteIcon: value != null
            ? const Icon(Icons.close, size: 14)
            : null,
        onDeleted: value != null ? () => onSelected(null) : null,
      ),
    );
  }
}

class _FlagCard extends StatelessWidget {
  final BehaviouralFlag flag;

  const _FlagCard({required this.flag});

  @override
  Widget build(BuildContext context) {
    final flagType = FlagType.values.firstWhere(
      (t) => t.value == flag.flagType,
      orElse: () => FlagType.lowDailySteps,
    );

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 4),
      child: ExpansionTile(
        leading: Icon(
          Icons.flag,
          color: AppTheme.severityColor(flag.severity),
        ),
        title: Text(
          flag.flagType.replaceAll('_', ' '),
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
        ),
        subtitle: Row(
          children: [
            SeverityBadge(severity: flag.severity),
            const SizedBox(width: 8),
            Text(flag.flagDate, style: const TextStyle(fontSize: 11)),
            const Spacer(),
            Icon(
              flag.synced ? Icons.cloud_done : Icons.cloud_off,
              size: 14,
              color: flag.synced ? AppTheme.primaryGreen : AppTheme.grey,
            ),
          ],
        ),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _DetailRow('Type', flag.flagType),
                _DetailRow('Severity', flag.severity),
                _DetailRow('Domain', flagType.domain.value),
                _DetailRow('Tier', '${flagType.tier}'),
                _DetailRow('Value', flag.value.toStringAsFixed(1)),
                _DetailRow('Baseline', flag.baseline.toStringAsFixed(1)),
                _DetailRow('Synced', flag.synced ? 'Yes' : 'No'),
                _DetailRow('Created',
                    DateFormat('yyyy-MM-dd HH:mm:ss').format(flag.createdAt)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  final String label;
  final String value;

  const _DetailRow(this.label, this.value);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          SizedBox(
            width: 80,
            child: Text(label,
                style: const TextStyle(
                    fontSize: 11, fontWeight: FontWeight.bold)),
          ),
          Expanded(
            child: Text(value,
                style: const TextStyle(fontSize: 11, fontFamily: 'monospace')),
          ),
        ],
      ),
    );
  }
}
