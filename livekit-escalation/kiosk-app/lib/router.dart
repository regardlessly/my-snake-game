import 'package:go_router/go_router.dart';
import 'screens/home_screen.dart';
import 'screens/waiting_screen.dart';
import 'screens/call_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (_, state) => const HomeScreen()),
    GoRoute(path: '/waiting', builder: (_, state) => const WaitingScreen()),
    GoRoute(path: '/call', builder: (_, state) => const CallScreen()),
  ],
);
