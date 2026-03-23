#!/bin/bash
# Install launchd services for LiveKit + Escalation Orchestrator
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LAUNCH_AGENTS="$HOME/Library/LaunchAgents"

mkdir -p "$LAUNCH_AGENTS"

echo "Installing CaritaHub LiveKit service..."
cp "$SCRIPT_DIR/com.caritahub.livekit.plist" "$LAUNCH_AGENTS/"

echo "Installing CaritaHub Escalation Orchestrator service..."
cp "$SCRIPT_DIR/com.caritahub.escalation.plist" "$LAUNCH_AGENTS/"

echo ""
echo "Services installed. Commands:"
echo "  LiveKit:"
echo "    Start:   launchctl start com.caritahub.livekit"
echo "    Stop:    launchctl stop com.caritahub.livekit"
echo "    Logs:    tail -f /opt/livekit/livekit.log"
echo ""
echo "  Escalation Orchestrator:"
echo "    Start:   launchctl start com.caritahub.escalation"
echo "    Stop:    launchctl stop com.caritahub.escalation"
echo "    Logs:    tail -f /tmp/caritahub-escalation.log"
