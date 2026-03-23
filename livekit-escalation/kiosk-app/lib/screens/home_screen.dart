import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../config.dart';
import '../providers.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final callState = ref.watch(callStateProvider);
    final isCreating = callState.status == CallStatus.creating;

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('🏢', style: TextStyle(fontSize: 80)),
            const SizedBox(height: 24),
            Text('CaritaHub Kiosk', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 8),
            Text(
              'Need help? Speak to a staff member.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 48),
            SizedBox(
              width: 280,
              height: 100,
              child: ElevatedButton(
                onPressed: isCreating ? null : () => _startCall(context, ref),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.accent,
                  disabledBackgroundColor: AppColors.accent.withValues(alpha: 0.6),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      isCreating ? '⏳' : '📹',
                      style: const TextStyle(fontSize: 40),
                    ),
                    const SizedBox(width: 16),
                    Text(
                      isCreating ? 'Connecting...' : 'Call Staff',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: Colors.white),
                    ),
                  ],
                ),
              ),
            ),
            if (callState.status == CallStatus.error) ...[
              const SizedBox(height: 24),
              Text(
                'Could not connect. Please try again.',
                style: TextStyle(fontSize: 18, color: AppColors.error),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Future<void> _startCall(BuildContext context, WidgetRef ref) async {
    final tts = ref.read(ttsProvider);
    await tts.speak('Connecting you to staff. Please wait.');

    final success = await ref.read(callStateProvider.notifier).startCall();
    if (success && context.mounted) {
      context.go('/waiting');
    }
  }
}
