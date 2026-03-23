import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:livekit_client/livekit_client.dart';
import 'package:permission_handler/permission_handler.dart';
import '../config.dart';
import '../providers.dart';

class WaitingScreen extends ConsumerStatefulWidget {
  const WaitingScreen({super.key});

  @override
  ConsumerState<WaitingScreen> createState() => _WaitingScreenState();
}

class _WaitingScreenState extends ConsumerState<WaitingScreen> {
  Room? _room;
  EventsListener<RoomEvent>? _listener;
  Timer? _countdownTimer;
  int _remaining = timeoutSeconds;
  LocalVideoTrack? _localVideoTrack;
  bool _cameraEnabled = false;

  @override
  void initState() {
    super.initState();
    _connectToRoom();
  }

  @override
  void dispose() {
    _countdownTimer?.cancel();
    _listener?.dispose();
    _room?.disconnect();
    _room?.dispose();
    _localVideoTrack?.dispose();
    super.dispose();
  }

  Future<void> _connectToRoom() async {
    final callState = ref.read(callStateProvider);
    if (callState.livekitUrl == null || callState.seniorToken == null) {
      if (mounted) context.go('/');
      return;
    }

    // Request permissions
    await [Permission.camera, Permission.microphone].request();

    // Create and connect to room
    _room = Room(
      roomOptions: const RoomOptions(
        defaultCameraCaptureOptions: CameraCaptureOptions(
          params: VideoParametersPresets.h720_169,
        ),
      ),
    );

    // Set up event listener
    _listener = _room!.createListener();
    _listener!
      ..on<ParticipantConnectedEvent>((event) {
        if (event.participant.identity.contains('staff')) {
          ref.read(callStateProvider.notifier).staffJoined();
          if (mounted) context.go('/call');
        }
      })
      ..on<RoomDisconnectedEvent>((_) {
        if (mounted) _handleDisconnect();
      });

    try {
      await _room!.connect(
        callState.livekitUrl!,
        callState.seniorToken!,
      );

      // Enable camera + mic
      try {
        await _room!.localParticipant?.setCameraEnabled(true);
        await _room!.localParticipant?.setMicrophoneEnabled(true);
        if (mounted) setState(() => _cameraEnabled = true);
      } catch (e) {
        debugPrint('Camera/mic error: $e');
        // Try mic-only fallback
        try {
          await _room!.localParticipant?.setMicrophoneEnabled(true);
        } catch (_) {}
      }

      // Check if staff already in room (joined before us)
      for (final p in _room!.remoteParticipants.values) {
        if (p.identity.contains('staff')) {
          ref.read(callStateProvider.notifier).staffJoined();
          if (mounted) context.go('/call');
          return;
        }
      }

      // Start countdown
      _startCountdown();
    } catch (e) {
      debugPrint('LiveKit connect error: $e');
      if (mounted) {
        ref.read(callStateProvider.notifier).reset();
        context.go('/');
      }
    }
  }

  void _startCountdown() {
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() => _remaining--);
      if (_remaining <= 0) {
        _countdownTimer?.cancel();
        _handleTimeout();
      }
    });
  }

  void _handleTimeout() {
    ref.read(ttsProvider).speak('No staff available. We will follow up.');
    ref.read(callStateProvider.notifier).timeout();
    _room?.disconnect();
    if (mounted) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
          backgroundColor: AppColors.surface,
          title: const Text('⏰', style: TextStyle(fontSize: 64), textAlign: TextAlign.center),
          content: const Text(
            'No staff available right now.\nWe\'ll follow up with you.',
            style: TextStyle(fontSize: 22),
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                ref.read(callStateProvider.notifier).reset();
                context.go('/');
              },
              child: const Text('OK', style: TextStyle(fontSize: 22, color: AppColors.accent)),
            ),
          ],
        ),
      );
    }
  }

  void _handleDisconnect() {
    ref.read(callStateProvider.notifier).reset();
    context.go('/');
  }

  void _cancelCall() {
    _countdownTimer?.cancel();
    _room?.disconnect();
    ref.read(callStateProvider.notifier).endCall();
    context.go('/');
  }

  @override
  Widget build(BuildContext context) {
    final localParticipant = _room?.localParticipant;

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Self-preview
            Container(
              width: 320,
              height: 240,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.accent, width: 3),
              ),
              clipBehavior: Clip.antiAlias,
              child: _cameraEnabled && localParticipant != null
                  ? _buildLocalVideo(localParticipant)
                  : const Center(
                      child: Icon(Icons.videocam_off, size: 64, color: AppColors.textSecondary),
                    ),
            ),
            const SizedBox(height: 32),
            Text(
              'Connecting you to staff...',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            // Animated dots
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(3, (i) => _BouncingDot(delay: i * 0.16)),
            ),
            const SizedBox(height: 16),
            Text(
              'Waiting... $_remaining s',
              style: const TextStyle(fontSize: 20, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _cancelCall,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[700],
                minimumSize: const Size(200, 60),
              ),
              child: const Text('Cancel', style: TextStyle(fontSize: 22, color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLocalVideo(LocalParticipant participant) {
    final cameraPub = participant.videoTrackPublications
        .where((pub) => pub.source == TrackSource.camera)
        .firstOrNull;
    if (cameraPub?.track != null) {
      return VideoTrackRenderer(
        cameraPub!.track as VideoTrack,
        fit: VideoViewFit.cover,
        mirrorMode: VideoViewMirrorMode.mirror,
      );
    }
    return const Center(child: CircularProgressIndicator(color: AppColors.accent));
  }
}

class _BouncingDot extends StatefulWidget {
  final double delay;
  const _BouncingDot({required this.delay});

  @override
  State<_BouncingDot> createState() => _BouncingDotState();
}

class _BouncingDotState extends State<_BouncingDot> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 1400))
      ..repeat();
    _anim = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0.4, end: 1.0), weight: 40),
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.4), weight: 60),
    ]).animate(CurvedAnimation(
      parent: _ctrl,
      curve: Interval(widget.delay / 1.4, (widget.delay / 1.4 + 0.5).clamp(0, 1)),
    ));
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (_, child) => Transform.scale(
        scale: _anim.value,
        child: Container(
          width: 12,
          height: 12,
          margin: const EdgeInsets.symmetric(horizontal: 6),
          decoration: BoxDecoration(
            color: AppColors.accent.withValues(alpha: _anim.value),
            shape: BoxShape.circle,
          ),
        ),
      ),
    );
  }
}
