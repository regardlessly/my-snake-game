# livekit-escalation

LiveKit video escalation for CaritaHub Customer Service Kiosk. When AI can't resolve a senior's query, the kiosk initiates a WebRTC video call to staff via LiveKit, with Telegram delivering the notification.

## Stack

- **LiveKit Server**: Self-hosted WebRTC SFU (native Go binary, launchd managed)
- **Call Orchestrator**: Python FastAPI (room lifecycle, tokens, Telegram, ClickHouse)
- **Kiosk Client**: HTML + LiveKit JS SDK (runs in kiosk WebView)
- **Staff Client**: HTML + LiveKit JS SDK (opened from Telegram link in browser)
- **Analytics**: ClickHouse (`cth_escalation_calls` table)

## Quick Start

```bash
cd livekit-escalation
cp .env.example .env  # Fill in LiveKit secret + Telegram bot token
make dev              # Local dev server on :8200
```

## Deploy to Mac Mini

```bash
# First time only:
make setup-remote     # Installs Homebrew, Python, uv, LiveKit binary

# Every deploy:
make deploy           # rsync + install deps + restart services

# Check health:
make health

# Tail logs:
make logs
```

## Ports

| Service | Port | Protocol |
|---------|------|----------|
| LiveKit API/WS | 7880 | TCP |
| LiveKit RTC (TURN) | 7881 | TCP |
| LiveKit RTC (media) | 50000-50200 | UDP |
| Orchestrator | 8200 | TCP |

## Telegram Bot Setup

1. Message @BotFather on Telegram, send `/newbot`
2. Name the bot (e.g., "CaritaHub Escalation")
3. Copy the bot token to `.env` as `TELEGRAM_BOT_TOKEN`
4. Add the bot to your staff group chat
5. Send a message in the group
6. Visit `https://api.telegram.org/bot<TOKEN>/getUpdates`
7. Find `"chat":{"id":-XXXXXXXXXX}` — copy that ID to `.env` as `TELEGRAM_CHAT_ID`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/escalation/create` | POST | Create room + send Telegram notification |
| `/api/escalation/{room}/status` | GET | Room status (waiting/active/ended/timeout) |
| `/api/escalation/{room}/end` | POST | End call + log to ClickHouse |
| `/call/{room}` | GET | Staff call page |
| `/kiosk-call` | GET | Kiosk call page |
| `/api/health` | GET | Health check |
