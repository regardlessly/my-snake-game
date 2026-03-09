import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  static const Color primaryGreen = Color(0xFF4CAF50);
  static const Color amber = Color(0xFFFFA726);
  static const Color red = Color(0xFFE53935);
  static const Color grey = Color(0xFF9E9E9E);
  static const Color backgroundDark = Color(0xFF121212);
  static const Color cardDark = Color(0xFF1E1E1E);
  static const Color surfaceDark = Color(0xFF2C2C2C);

  static ThemeData get lightTheme => ThemeData(
        useMaterial3: true,
        colorSchemeSeed: primaryGreen,
        brightness: Brightness.light,
        cardTheme: const CardThemeData(
          elevation: 1,
          margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        ),
      );

  static ThemeData get darkTheme => ThemeData(
        useMaterial3: true,
        colorSchemeSeed: primaryGreen,
        brightness: Brightness.dark,
        cardTheme: const CardThemeData(
          elevation: 1,
          margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        ),
      );

  static Color stepsColor(int steps, double? baseline) {
    if (baseline == null || baseline == 0) return grey;
    final ratio = steps / baseline;
    if (ratio >= 0.8) return primaryGreen;
    if (ratio >= 0.5) return amber;
    return red;
  }

  static Color syncColor(Duration sinceLast) {
    if (sinceLast.inMinutes < 30) return primaryGreen;
    if (sinceLast.inMinutes < 60) return amber;
    return red;
  }

  static Color severityColor(String severity) {
    switch (severity) {
      case 'high':
        return red;
      case 'medium':
        return amber;
      default:
        return primaryGreen;
    }
  }
}
