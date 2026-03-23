import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'config.dart';

// --- Dio ---
final dioProvider = Provider<Dio>((ref) {
  return Dio(BaseOptions(
    baseUrl: orchestratorBaseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {'Content-Type': 'application/json'},
  ));
});

// --- TTS ---
final ttsProvider = Provider<FlutterTts>((ref) {
  final tts = FlutterTts();
  tts.setSpeechRate(0.45);
  tts.setPitch(1.0);
  return tts;
});

// --- Call State ---
enum CallStatus { idle, creating, waiting, active, timeout, error }

class CallState {
  final CallStatus status;
  final String? roomName;
  final String? seniorToken;
  final String? livekitUrl;
  final String? callId;
  final String? errorMessage;

  const CallState({
    this.status = CallStatus.idle,
    this.roomName,
    this.seniorToken,
    this.livekitUrl,
    this.callId,
    this.errorMessage,
  });

  CallState copyWith({
    CallStatus? status,
    String? roomName,
    String? seniorToken,
    String? livekitUrl,
    String? callId,
    String? errorMessage,
  }) {
    return CallState(
      status: status ?? this.status,
      roomName: roomName ?? this.roomName,
      seniorToken: seniorToken ?? this.seniorToken,
      livekitUrl: livekitUrl ?? this.livekitUrl,
      callId: callId ?? this.callId,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class CallStateNotifier extends StateNotifier<CallState> {
  final Dio _dio;

  CallStateNotifier(this._dio) : super(const CallState());

  Future<bool> startCall() async {
    state = state.copyWith(status: CallStatus.creating);
    try {
      final resp = await _dio.post('/api/escalation/create', data: memberInfo);
      final data = resp.data as Map<String, dynamic>;
      state = CallState(
        status: CallStatus.waiting,
        roomName: data['room_name'] as String?,
        seniorToken: data['senior_token'] as String?,
        livekitUrl: data['livekit_url'] as String?,
        callId: data['call_id'] as String?,
      );
      return true;
    } catch (e) {
      state = CallState(
        status: CallStatus.error,
        errorMessage: e.toString(),
      );
      return false;
    }
  }

  void staffJoined() {
    state = state.copyWith(status: CallStatus.active);
  }

  Future<void> endCall() async {
    final room = state.roomName;
    state = const CallState(); // reset to idle
    if (room != null) {
      try {
        await _dio.post('/api/escalation/$room/end');
      } catch (_) {}
    }
  }

  void timeout() {
    state = state.copyWith(status: CallStatus.timeout);
  }

  void reset() {
    state = const CallState();
  }
}

final callStateProvider = StateNotifierProvider<CallStateNotifier, CallState>((ref) {
  return CallStateNotifier(ref.watch(dioProvider));
});
