import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:caritahub_alwayson/providers/app_providers.dart';
import 'package:caritahub_alwayson/services/background/background_service_manager.dart';
import 'package:caritahub_alwayson/services/location/location_service.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/core/constants.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  int _logoTapCount = 0;
  bool _permissionsGranted = false;
  bool _serviceRunning = false;
  ({double lat, double lng})? _homeLocation;
  bool _settingHome = false;

  @override
  void initState() {
    super.initState();
    _checkStatus();
  }

  Future<void> _checkStatus() async {
    final bridge = ref.read(healthBridgeProvider);
    final running = await BackgroundServiceManager.isRunning();
    final home = await LocationService.getHomeLocation();
    final granted = await bridge.checkPermissionsGranted();
    if (mounted) {
      setState(() {
        _serviceRunning = running;
        _homeLocation = home;
        _permissionsGranted = granted;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isTester = ref.watch(testerModeProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          // App logo with tester mode easter egg
          Center(
            child: GestureDetector(
              onLongPress: () {
                _logoTapCount++;
                if (_logoTapCount >= AppConstants.testerModeTapCount) {
                  final newValue = !isTester;
                  ref.read(testerModeProvider.notifier).state = newValue;
                  _logoTapCount = 0;
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(newValue
                          ? 'Tester mode enabled'
                          : 'Tester mode disabled'),
                    ),
                  );
                }
              },
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    Icon(Icons.favorite,
                        size: 48,
                        color: Theme.of(context).colorScheme.primary),
                    const SizedBox(height: 8),
                    Text(AppConstants.appName,
                        style: Theme.of(context).textTheme.titleLarge),
                    Text('Always-On Behavioural Intelligence',
                        style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
              ),
            ),
          ),

          const Divider(),

          // Health permissions
          ListTile(
            leading: Icon(Icons.health_and_safety,
                color: _permissionsGranted
                    ? AppTheme.primaryGreen
                    : AppTheme.red),
            title: const Text('Health Permissions'),
            subtitle: Text(_permissionsGranted ? 'Granted' : 'Not granted'),
            trailing: TextButton(
              onPressed: _requestPermissions,
              child: Text(_permissionsGranted ? 'Refresh' : 'Grant'),
            ),
          ),

          // Background service status
          ListTile(
            leading: Icon(Icons.sync,
                color: _serviceRunning
                    ? AppTheme.primaryGreen
                    : AppTheme.red),
            title: const Text('Background Service'),
            subtitle: Text(_serviceRunning ? 'Running' : 'Stopped'),
            trailing: Switch(
              value: _serviceRunning,
              onChanged: (v) async {
                if (v) {
                  await BackgroundServiceManager.startService();
                } else {
                  await BackgroundServiceManager.stopService();
                }
                await _checkStatus();
              },
            ),
          ),

          const Divider(),

          // Home location
          ListTile(
            leading: Icon(
              Icons.home_outlined,
              color: _homeLocation != null
                  ? AppTheme.primaryGreen
                  : Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.4),
            ),
            title: const Text('Home Location'),
            subtitle: _homeLocation != null
                ? Text(
                    '${_homeLocation!.lat.toStringAsFixed(5)}, '
                    '${_homeLocation!.lng.toStringAsFixed(5)}',
                    style: const TextStyle(fontFamily: 'monospace', fontSize: 12),
                  )
                : const Text('Not set — tap to set current location as home'),
            trailing: _settingHome
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : PopupMenuButton<String>(
                    icon: const Icon(Icons.more_vert),
                    onSelected: (value) async {
                      if (value == 'set') {
                        await _setHomeLocation();
                      } else if (value == 'clear') {
                        await _clearHomeLocation();
                      }
                    },
                    itemBuilder: (_) => [
                      const PopupMenuItem(
                        value: 'set',
                        child: ListTile(
                          leading: Icon(Icons.my_location),
                          title: Text('Use current GPS location'),
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                      if (_homeLocation != null)
                        const PopupMenuItem(
                          value: 'clear',
                          child: ListTile(
                            leading: Icon(Icons.clear, color: AppTheme.red),
                            title: Text('Clear home location',
                                style: TextStyle(color: AppTheme.red)),
                            contentPadding: EdgeInsets.zero,
                          ),
                        ),
                    ],
                  ),
          ),

          const Divider(),

          // Battery optimisation
          ListTile(
            leading: const Icon(Icons.battery_saver),
            title: const Text('Battery Optimisation'),
            subtitle: const Text('Request unrestricted battery access'),
            trailing: const Icon(Icons.chevron_right),
            onTap: _openBatterySettings,
          ),

          // Data management
          ListTile(
            leading: const Icon(Icons.storage),
            title: const Text('Local Data'),
            subtitle: const Text('Manage locally stored health data'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showDataManagement(context),
          ),

          if (isTester) ...[
            const Divider(),
            ListTile(
              leading: const Icon(Icons.developer_mode,
                  color: AppTheme.amber),
              title: const Text('Tester Mode'),
              subtitle: const Text('Active - debug tools available'),
              trailing: Switch(
                value: true,
                onChanged: (v) {
                  ref.read(testerModeProvider.notifier).state = v;
                },
              ),
            ),
          ],

          const Divider(),

          // Privacy
          ListTile(
            leading: const Icon(Icons.privacy_tip),
            title: const Text('Privacy & Data'),
            subtitle: const Text('Pause or delete all collected data'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showPrivacyOptions(context),
          ),

          // App info
          const ListTile(
            leading: Icon(Icons.info_outline),
            title: Text('Version'),
            subtitle: Text('1.0.0'),
          ),
        ],
      ),
    );
  }

  Future<void> _setHomeLocation() async {
    setState(() => _settingHome = true);
    try {
      // Ensure we have at least foreground location permission.
      final hasPermission = await LocationService.hasPermission();
      if (!hasPermission) {
        final granted = await LocationService.requestPermission();
        if (!granted) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                  content: Text(
                      'Location permission denied — enable in device Settings')),
            );
          }
          return;
        }
      }

      // Also request background location so the 30-min GPS timer works
      // when the app is closed. On Android 10+ this opens the Settings
      // page so the user can choose "Allow all the time".
      final bgStatus = await Permission.locationAlways.status;
      if (!bgStatus.isGranted) {
        await Permission.locationAlways.request();
      }

      final success = await LocationService.setCurrentLocationAsHome();
      if (!mounted) return;
      final messenger = ScaffoldMessenger.of(context);
      if (success) {
        final home = await LocationService.getHomeLocation();
        if (!mounted) return;
        setState(() => _homeLocation = home);
        messenger.showSnackBar(
          const SnackBar(
              content: Text('🏠 Home location saved! '
                  'You\'ll be notified when you leave or arrive home.')),
        );
      } else {
        messenger.showSnackBar(
          const SnackBar(
              content: Text('GPS unavailable — please try again outdoors')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _settingHome = false);
    }
  }

  Future<void> _clearHomeLocation() async {
    await LocationService.clearHomeLocation();
    if (mounted) {
      setState(() => _homeLocation = null);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Home location cleared')),
      );
    }
  }

  Future<void> _requestPermissions() async {
    final bridge = ref.read(healthBridgeProvider);
    final granted = await bridge.requestPermissions();
    setState(() => _permissionsGranted = granted);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(granted
              ? 'Health permissions granted'
              : 'Health permissions denied - please enable in Settings'),
        ),
      );
    }
  }

  Future<void> _openBatterySettings() async {
    if (Platform.isAndroid) {
      // Request "ignore battery optimizations" which shows the system dialog
      final status = await Permission.ignoreBatteryOptimizations.request();
      if (mounted) {
        if (status.isGranted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
                content: Text('Battery optimisation already unrestricted')),
          );
        } else {
          // Fallback: open app-specific battery settings page
          try {
            const channel = MethodChannel('caritahub/battery');
            await channel.invokeMethod('openBatterySettings');
          } catch (_) {
            // If channel not available, open general app settings
            openAppSettings();
          }
        }
      }
    } else {
      // iOS doesn't have a direct battery optimisation setting
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Text('Battery management is handled by iOS automatically')),
        );
      }
    }
  }

  void _showDataManagement(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Data Management',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.cloud_upload),
              title: const Text('Force Sync'),
              onTap: () async {
                Navigator.pop(ctx);
                final sync = ref.read(syncEngineProvider);
                await sync.syncAll();
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_sweep, color: AppTheme.red),
              title: const Text('Purge Old Data',
                  style: TextStyle(color: AppTheme.red)),
              subtitle: Text(
                  'Remove data older than ${AppConstants.localDataRetentionDays} days'),
              onTap: () async {
                Navigator.pop(ctx);
                final db = ref.read(databaseProvider);
                await db.purgeOldData(AppConstants.localDataRetentionDays);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showPrivacyOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Privacy Options',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.pause_circle),
              title: const Text('Pause Monitoring'),
              subtitle: const Text('Stop background data collection'),
              onTap: () async {
                Navigator.pop(ctx);
                await BackgroundServiceManager.stopService();
                await _checkStatus();
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_forever, color: AppTheme.red),
              title: const Text('Delete All Data',
                  style: TextStyle(color: AppTheme.red)),
              subtitle:
                  const Text('Permanently delete all collected health data'),
              onTap: () async {
                Navigator.pop(ctx);
                final confirmed = await showDialog<bool>(
                  context: context,
                  builder: (dCtx) => AlertDialog(
                    title: const Text('Delete All Data?'),
                    content: const Text(
                        'This will permanently delete all locally stored health data. Data already synced to CaritaHub will not be affected.'),
                    actions: [
                      TextButton(
                          onPressed: () => Navigator.pop(dCtx, false),
                          child: const Text('Cancel')),
                      TextButton(
                          onPressed: () => Navigator.pop(dCtx, true),
                          child: const Text('Delete',
                              style: TextStyle(color: AppTheme.red))),
                    ],
                  ),
                );
                if (confirmed == true) {
                  final db = ref.read(databaseProvider);
                  await db.clearAllData();
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
