import 'dart:ui';

const orchestratorBaseUrl = String.fromEnvironment(
  'ORCHESTRATOR_URL',
  defaultValue: 'http://timmys-mac-mini.tail33631c.ts.net:8200',
);

const timeoutSeconds = 90;

// POC hardcoded member info — in production, comes from the kiosk app
const memberInfo = <String, dynamic>{
  'member_id': 42,
  'member_name': 'Mdm Chong Chok Yen',
  'centre_id': 1,
  'centre_name': 'Jalan Besar Active Ageing Centre',
  'language': 'Mandarin',
  'summary': 'Senior requested staff assistance via kiosk.',
  'risk_tier': 'R2',
  'trigger_type': 'button',
  'audio_only': false,
};

// Colors
class AppColors {
  static const background = Color(0xFF1A1A2E);
  static const surface = Color(0xFF252547);
  static const accent = Color(0xFFE8673A);
  static const error = Color(0xFFDC3545);
  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFFAAAAAA);
}
