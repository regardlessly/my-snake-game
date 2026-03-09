import 'dart:math';

import 'package:drift/drift.dart';
import 'package:geolocator/geolocator.dart';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:caritahub_alwayson/data/database/app_database.dart';

/// Keys used to store the home location in SharedPreferences.
const _kHomeLat = 'home_latitude';
const _kHomeLng = 'home_longitude';
const _kHomeSet = 'home_location_set';
const _kWasHome = 'location_was_home'; // tracks last known home/away state

/// Distance in metres within which the senior is considered "at home".
const double _homeRadiusMetres = 200.0;

/// Handles GPS logging and home-departure / home-arrival detection.
///
/// Designed to be called from both the background service isolate and the
/// main isolate (e.g., when the user taps "Set home location" in settings).
class LocationService {
  final AppDatabase _db;
  final Logger _log;

  LocationService({required AppDatabase db})
      : _db = db,
        _log = Logger(
          printer: PrettyPrinter(
            methodCount: 0,
            dateTimeFormat: DateTimeFormat.onlyTimeAndSinceStart,
          ),
          filter: ProductionFilter(),
        );

  // ── Public API ────────────────────────────────────────────────────────────

  /// Returns true if location permission is granted (including background).
  static Future<bool> hasPermission() async {
    final status = await Geolocator.checkPermission();
    return status == LocationPermission.always ||
        status == LocationPermission.whileInUse;
  }

  /// Request foreground location permission.
  /// Must be called from the main isolate (needs Activity context).
  static Future<bool> requestPermission() async {
    var status = await Geolocator.checkPermission();
    if (status == LocationPermission.denied) {
      status = await Geolocator.requestPermission();
    }
    return status == LocationPermission.always ||
        status == LocationPermission.whileInUse;
  }

  /// Get current GPS position. Returns null if permission denied or GPS off.
  static Future<Position?> getCurrentPosition() async {
    try {
      final isEnabled = await Geolocator.isLocationServiceEnabled();
      if (!isEnabled) return null;

      final status = await Geolocator.checkPermission();
      if (status == LocationPermission.denied ||
          status == LocationPermission.deniedForever) {
        return null;
      }

      return await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.medium,
          timeLimit: Duration(seconds: 15),
        ),
      );
    } catch (e) {
      return null;
    }
  }

  /// Log current GPS position and detect home transitions.
  ///
  /// Returns the event string ('left_home', 'arrived_home') or null for a
  /// routine log with no home-state change. Returns null also on failure.
  Future<String?> logCurrentPosition() async {
    final position = await LocationService.getCurrentPosition();
    if (position == null) {
      _log.w('GPS unavailable — location log skipped');
      return null;
    }

    final prefs = await SharedPreferences.getInstance();
    String? event;

    // Detect home transitions if a home location has been set.
    if (prefs.getBool(_kHomeSet) == true) {
      final homeLat = prefs.getDouble(_kHomeLat)!;
      final homeLng = prefs.getDouble(_kHomeLng)!;
      final distanceM = _haversineMetres(
        position.latitude, position.longitude, homeLat, homeLng,
      );

      final isNowHome = distanceM <= _homeRadiusMetres;
      final wasHome = prefs.getBool(_kWasHome) ?? true; // assume home on first run

      if (wasHome && !isNowHome) {
        event = 'left_home';
        _log.i('🏠 Senior LEFT home (${distanceM.toStringAsFixed(0)} m away)');
      } else if (!wasHome && isNowHome) {
        event = 'arrived_home';
        _log.i('🏠 Senior ARRIVED home (${distanceM.toStringAsFixed(0)} m away)');
      }

      if (isNowHome != wasHome) {
        await prefs.setBool(_kWasHome, isNowHome);
      }

      _log.d('GPS: ${position.latitude.toStringAsFixed(5)}, '
          '${position.longitude.toStringAsFixed(5)} | '
          '${distanceM.toStringAsFixed(0)} m from home | '
          'at_home=$isNowHome');
    } else {
      _log.d('GPS: ${position.latitude.toStringAsFixed(5)}, '
          '${position.longitude.toStringAsFixed(5)} | home not set');
    }

    // Persist log to database.
    await _db.insertLocationLog(LocationLogsCompanion.insert(
      timestamp: DateTime.now(),
      latitude: position.latitude,
      longitude: position.longitude,
      accuracyMeters: position.accuracy,
      altitudeMeters: Value(position.altitude),
      speedMs: Value(position.speed >= 0 ? position.speed : null),
      event: Value(event),
    ));

    return event;
  }

  // ── Home Location Management ─────────────────────────────────────────────

  /// Save the given coordinates as the home location.
  static Future<void> setHomeLocation(double lat, double lng) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(_kHomeLat, lat);
    await prefs.setDouble(_kHomeLng, lng);
    await prefs.setBool(_kHomeSet, true);
    await prefs.setBool(_kWasHome, true); // assume we're home when setting it
  }

  /// Save the current GPS position as home. Returns false if GPS unavailable.
  static Future<bool> setCurrentLocationAsHome() async {
    final pos = await getCurrentPosition();
    if (pos == null) return false;
    await setHomeLocation(pos.latitude, pos.longitude);
    return true;
  }

  /// Return the saved home location, or null if not set.
  static Future<({double lat, double lng})?> getHomeLocation() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getBool(_kHomeSet) != true) return null;
    return (
      lat: prefs.getDouble(_kHomeLat)!,
      lng: prefs.getDouble(_kHomeLng)!,
    );
  }

  /// Clear the saved home location.
  static Future<void> clearHomeLocation() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kHomeLat);
    await prefs.remove(_kHomeLng);
    await prefs.setBool(_kHomeSet, false);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /// Haversine distance in metres between two lat/lng pairs.
  static double _haversineMetres(
      double lat1, double lon1, double lat2, double lon2) {
    const r = 6371000.0; // Earth radius in metres
    final phi1 = lat1 * pi / 180;
    final phi2 = lat2 * pi / 180;
    final dPhi = (lat2 - lat1) * pi / 180;
    final dLam = (lon2 - lon1) * pi / 180;
    final a = sin(dPhi / 2) * sin(dPhi / 2) +
        cos(phi1) * cos(phi2) * sin(dLam / 2) * sin(dLam / 2);
    return r * 2 * atan2(sqrt(a), sqrt(1 - a));
  }
}
