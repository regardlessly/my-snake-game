import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:caritahub_alwayson/ui/tester/service_monitor_screen.dart';
import 'package:caritahub_alwayson/ui/tester/flag_feed_screen.dart';

class TesterDashboard extends ConsumerWidget {
  const TesterDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Tester Dashboard'),
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.monitor_heart), text: 'Service'),
              Tab(icon: Icon(Icons.flag), text: 'Flags'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            ServiceMonitorScreen(),
            FlagFeedScreen(),
          ],
        ),
      ),
    );
  }
}
