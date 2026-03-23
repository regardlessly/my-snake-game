import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:livekit_client/livekit_client.dart';
import '../config.dart';
import '../providers.dart';

class CallScreen extends ConsumerStatefulWidget {
  const CallScreen({super.key});

  @override
  ConsumerState<CallScreen> createState() => _CallScreenState();
}

class _CallScreenState extends ConsumerState<CallScreen> {
  Room? _room;
  EventsListener<RoomEvent>? _listener;
  VideoTrack? _remoteVideoTrack;
  VideoTrack? _localVideoTrack;
  // ignore: unused_field
  bool _connected = false;

  @override
  void initState() {
    super.initState();
    _connectToRoom();
  }

  @override
  void dispose() {
    _listener?.dispose();
    _room?.disconnect();
    _room?.dispose();
    super.dispose();
  }

  Future<void> _connectToRoom() async {
    final callState = ref.read(callStateProvider);
    if (callState.livekitUrl == null || callState.seniorToken == null) {
      if (mounted) context.go('/');
      return;
    }

    _room = Room(
      roomOptions: const RoomOptions(
        defaultCameraCaptureOptions: CameraCaptureOptions(
          params: VideoParametersPresets.h720_169,
        ),
      ),
    );
    _listener = _room!.createListener();
    _listener!
      ..on<TrackSubscribedEvent>((event) {
        if (event.participant.identity.contains('staff')) {
          if (event.track is VideoTrack) {
            setState(() => _remoteVideoTrack = event.track as VideoTrack);
          }
          // Audio tracks auto-play
        }
      })
      ..on<TrackUnsubscribedEvent>((event) {
        if (event.track is VideoTrack && _remoteVideoTrack == event.track) {
          setState(() => _remoteVideoTrack = null);
        }
      })
      ..on<ParticipantDisconnectedEvent>((event) {
        if (event.participant.identity.contains('staff')) {
          ref.read(ttsProvider).speak('Staff has disconnected.');
          _endCall();
        }
      })
      ..on<RoomDisconnectedEvent>((_) {
        if (mounted) _endCall();
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
      } catch (e) {
        debugPrint('Camera/mic error: $e');
        try {
          await _room!.localParticipant?.setMicrophoneEnabled(true);
        } catch (_) {}
      }

      // Get local video track
      final cameraPub = _room!.localParticipant?.videoTrackPublications
          .where((pub) => pub.source == TrackSource.camera)
          .firstOrNull;
      if (cameraPub?.track != null) {
        _localVideoTrack = cameraPub!.track as VideoTrack;
      }

      // Check if staff already has published tracks
      for (final p in _room!.remoteParticipants.values) {
        if (p.identity.contains('staff')) {
          for (final pub in p.videoTrackPublications) {
            if (pub.track != null) {
              _remoteVideoTrack = pub.track as VideoTrack;
            }
          }
        }
      }

      setState(() => _connected = true);
      ref.read(ttsProvider).speak('Staff has joined the call.');
    } catch (e) {
      debugPrint('LiveKit connect error: $e');
      if (mounted) {
        ref.read(callStateProvider.notifier).reset();
        context.go('/');
      }
    }
  }

  void _endCall() {
    _room?.disconnect();
    ref.read(callStateProvider.notifier).endCall();
    ref.read(ttsProvider).speak('Call ended.');
    if (mounted) context.go('/');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Remote video (full screen, letterboxed)
          if (_remoteVideoTrack != null)
            Positioned.fill(
              child: VideoTrackRenderer(
                _remoteVideoTrack!,
                fit: VideoViewFit.contain,
              ),
            )
          else
            const Center(
              child: Text(
                'Connecting to senior...',
                style: TextStyle(fontSize: 24, color: AppColors.textSecondary),
              ),
            ),

          // PIP self-view (bottom-right)
          if (_localVideoTrack != null)
            Positioned(
              bottom: 120,
              right: 24,
              child: Container(
                width: 180,
                height: 135,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.accent, width: 2),
                ),
                clipBehavior: Clip.antiAlias,
                child: VideoTrackRenderer(
                  _localVideoTrack!,
                  fit: VideoViewFit.cover,
                  mirrorMode: VideoViewMirrorMode.mirror,
                ),
              ),
            ),

          // End Call button
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Center(
              child: SizedBox(
                width: 200,
                height: 72,
                child: ElevatedButton(
                  onPressed: _endCall,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.error,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(36),
                    ),
                    elevation: 8,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('📵', style: TextStyle(fontSize: 28)),
                      SizedBox(width: 10),
                      Text('End Call', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: Colors.white)),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
