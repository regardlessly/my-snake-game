import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:caritahub_alwayson/ui/home/home_screen.dart';
import 'package:caritahub_alwayson/ui/shared/theme.dart';
import 'package:caritahub_alwayson/services/background/background_service_manager.dart';
import 'package:caritahub_alwayson/services/health/health_bridge_service.dart';
import 'package:caritahub_alwayson/services/location/location_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Configure (but don't start) background service components.
  // Wrapped in try-catch so the app always renders.
  try {
    await BackgroundServiceManager.initialize();
  } catch (e) {
    debugPrint('Background service init failed: $e');
  }

  runApp(const ProviderScope(child: CaritaHubApp()));
}

class CaritaHubApp extends StatefulWidget {
  const CaritaHubApp({super.key});

  @override
  State<CaritaHubApp> createState() => _CaritaHubAppState();
}

class _CaritaHubAppState extends State<CaritaHubApp> {
  @override
  void initState() {
    super.initState();
    // Start background service after the first frame so the UI is visible
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startBackgroundService();
    });
  }

  Future<void> _startBackgroundService() async {
    try {
      // On Android 13+ (API 33), notification permission must be granted
      // before the foreground service notification can appear.
      if (Platform.isAndroid) {
        final status = await Permission.notification.request();
        debugPrint('Notification permission: $status');
      }

      // Request health permissions so data collection works immediately
      try {
        final bridge = HealthBridgeService();
        final granted = await bridge.requestPermissions();
        debugPrint('Health permissions: $granted');
      } catch (e) {
        debugPrint('Health permissions request failed: $e');
      }

      // Request foreground location permission (needed for GPS logging).
      // Background location is requested separately in Settings after the
      // user understands why the app needs it.
      try {
        final locationGranted = await LocationService.requestPermission();
        debugPrint('Location permission: $locationGranted');
      } catch (e) {
        debugPrint('Location permission request failed: $e');
      }

      final running = await BackgroundServiceManager.isRunning();
      if (!running) {
        await BackgroundServiceManager.startService();
        debugPrint('Background service started');
      } else {
        debugPrint('Background service already running — skipping start');
      }
    } catch (e) {
      debugPrint('Background service start failed: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CaritaHub',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}
