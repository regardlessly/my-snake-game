#!/bin/bash
# First-time setup for Mac Mini — installs all dependencies
# Usage: ssh timmy@timmys-mac-mini... 'bash -s' < setup_remote.sh
set -euo pipefail

echo "=== CaritaHub LiveKit Escalation — First-Time Setup ==="

# 1. Homebrew
if ! command -v brew &>/dev/null; then
    echo "[1/5] Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    echo "[1/5] Homebrew already installed."
fi

# 2. Python
if ! command -v python3.12 &>/dev/null && ! python3 --version 2>&1 | grep -qE '3\.1[2-9]'; then
    echo "[2/5] Installing Python 3.12..."
    brew install python@3.12
else
    echo "[2/5] Python 3.12+ already installed."
fi

# 3. uv (fast Python package manager)
if ! command -v uv &>/dev/null; then
    echo "[3/5] Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
else
    echo "[3/5] uv already installed."
fi

# 4. LiveKit Server binary
LIVEKIT_VERSION="1.7.2"
if [ ! -f /usr/local/bin/livekit-server ]; then
    echo "[4/5] Installing LiveKit Server v${LIVEKIT_VERSION}..."
    curl -L "https://github.com/livekit/livekit/releases/download/v${LIVEKIT_VERSION}/livekit_${LIVEKIT_VERSION}_darwin_arm64.tar.gz" \
        -o /tmp/livekit.tar.gz
    tar -xzf /tmp/livekit.tar.gz -C /tmp/
    sudo mv /tmp/livekit-server /usr/local/bin/
    sudo chmod +x /usr/local/bin/livekit-server
    rm -f /tmp/livekit.tar.gz
    echo "  LiveKit installed: $(livekit-server --version 2>&1 || echo 'ok')"
else
    echo "[4/5] LiveKit Server already installed."
fi

# 5. Create LiveKit data directory
if [ ! -d /opt/livekit ]; then
    echo "[5/5] Creating /opt/livekit..."
    sudo mkdir -p /opt/livekit
    sudo chown "$(whoami)" /opt/livekit
else
    echo "[5/5] /opt/livekit already exists."
fi

# Generate API keys if not configured
if [ ! -f /opt/livekit/config.yaml ]; then
    echo ""
    echo "=== Generating LiveKit API keys ==="
    KEYS=$(livekit-server generate-keys 2>/dev/null || echo "caritahub_kiosk: $(openssl rand -base64 32 | tr -d '/+=' | head -c 32)")
    echo "Generated keys: $KEYS"
    echo "Save the API secret — you'll need it in .env"
fi

echo ""
echo "=== Setup complete ==="
echo "Next steps:"
echo "  1. Deploy the project:  ./deploy.sh"
echo "  2. Configure .env with LiveKit API secret + Telegram bot token"
