#!/bin/bash
# Deploy livekit-escalation to Mac Mini via Tailscale
# Usage: ./deploy.sh [user@host]
set -euo pipefail

REMOTE="${1:-timmy@timmys-mac-mini.tail33631c.ts.net}"
REMOTE_DIR="\$HOME/livekit-escalation"
SSH_OPTS="-o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"

echo "=== Deploying LiveKit Escalation to: $REMOTE ==="

# 1. Check connectivity
echo "[1/7] Checking Tailscale connectivity..."
if ! ssh $SSH_OPTS "$REMOTE" "echo ok" >/dev/null 2>&1; then
    echo "ERROR: Cannot reach $REMOTE — is Tailscale connected?"
    exit 1
fi
echo "  Connected."

# 2. Create remote directory
echo "[2/7] Setting up remote directory..."
ssh $SSH_OPTS "$REMOTE" "mkdir -p ~/livekit-escalation"

# 3. Sync code
echo "[3/7] Syncing code..."
rsync -avz --delete -e "ssh $SSH_OPTS" \
    --exclude '.venv/' \
    --exclude 'venv/' \
    --exclude '__pycache__/' \
    --exclude '*.pyc' \
    --exclude '*.egg-info/' \
    --exclude '.git/' \
    --exclude '.env' \
    --exclude '.DS_Store' \
    ./ "$REMOTE:$REMOTE_DIR/"

# 4. Install Python deps
echo "[4/7] Installing Python dependencies..."
ssh $SSH_OPTS "$REMOTE" "export PATH=\"\$HOME/.local/bin:/opt/homebrew/bin:\$PATH\" && cd ~/livekit-escalation && uv venv .venv --python 3.12 --clear && source .venv/bin/activate && uv pip install -e ."

# 5. Copy .env
if [ -f .env ]; then
    echo "[5/7] Syncing .env..."
    scp $SSH_OPTS .env "$REMOTE:$REMOTE_DIR/.env"
else
    echo "[5/7] No local .env — skipping (configure manually on remote)"
fi

# 6. Copy LiveKit config to user-local directory
echo "[6/7] Deploying LiveKit config..."
ssh $SSH_OPTS "$REMOTE" "mkdir -p ~/.config/livekit && cp ~/livekit-escalation/livekit/config.yaml ~/.config/livekit/config.yaml"

# 7. Install and restart services
echo "[7/7] Installing services..."
ssh $SSH_OPTS "$REMOTE" "
    cd $REMOTE_DIR

    # Download LiveKit JS SDK if not present
    if [ ! -f static/livekit-client.umd.min.js ]; then
        echo 'Downloading LiveKit JS SDK...'
        curl -L 'https://unpkg.com/livekit-client@2.9.1/dist/livekit-client.umd.min.js' \
            -o static/livekit-client.umd.min.js
    fi

    # Stop existing services
    launchctl bootout gui/\$(id -u) ~/Library/LaunchAgents/com.caritahub.livekit.plist 2>/dev/null || true
    launchctl bootout gui/\$(id -u) ~/Library/LaunchAgents/com.caritahub.escalation.plist 2>/dev/null || true

    # Install services
    bash services/install_services.sh

    # Start services
    launchctl bootstrap gui/\$(id -u) ~/Library/LaunchAgents/com.caritahub.livekit.plist
    launchctl bootstrap gui/\$(id -u) ~/Library/LaunchAgents/com.caritahub.escalation.plist

    sleep 3

    # Health checks
    echo ''
    echo '--- Health Checks ---'
    echo -n 'LiveKit: '
    curl -sf http://localhost:7880 && echo ' OK' || echo ' FAILED (check: tail -f /tmp/caritahub-livekit.log)'
    echo -n 'Orchestrator: '
    curl -sf http://localhost:8200/api/health && echo '' || echo ' FAILED (check: tail -f /tmp/caritahub-escalation.log)'
"

echo ""
echo "=== Deploy complete ==="
echo "  Orchestrator:  http://timmys-mac-mini.tail33631c.ts.net:8200/api/health"
echo "  LiveKit:       ws://timmys-mac-mini.tail33631c.ts.net:7880"
echo "  Logs:          ssh $REMOTE 'tail -f /tmp/caritahub-escalation.log /tmp/caritahub-livekit.log'"
