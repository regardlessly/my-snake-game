from __future__ import annotations

import json
import logging
from typing import Optional
from urllib.parse import quote, urlencode

import httpx

from .config import settings

logger = logging.getLogger(__name__)

TELEGRAM_API = "https://api.telegram.org/bot{token}"


async def send_escalation_notification(
    room_name: str,
    staff_token: str,
    member_name: str,
    centre_name: str,
    language: str,
    summary: str,
    risk_tier: Optional[str] = None,
    audio_only: bool = False,
) -> bool:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram not configured — skipping notification")
        return False

    # Build staff call URL with all context embedded as query params.
    # The staff page is a static HTML hosted on GitHub Pages — no API calls needed.
    call_params = {
        "token": staff_token,
        "ws": settings.livekit_url,
        "name": member_name,
        "lang": language,
        "summary": summary,
    }
    if risk_tier:
        call_params["risk"] = risk_tier
    call_url = f"{settings.staff_call_base_url}?{urlencode(call_params)}"

    mode_label = "Audio Call" if audio_only else "Video Call"
    lines = [
        f"\U0001f4de {mode_label} Request",
        f"\U0001f464 Member: {member_name}",
        f"\U0001f3e2 Centre: {centre_name}",
        f"\U0001f310 Language: {language}",
    ]
    if risk_tier:
        lines.append(f"\u26a0\ufe0f Risk Tier: {risk_tier}")
    if summary:
        lines.append(f"\U0001f4cb AI Summary:\n{summary}")

    text = "\n".join(lines)

    inline_keyboard = {
        "inline_keyboard": [
            [{"text": f"\U0001f4f9 Join {mode_label}", "url": call_url}]
        ]
    }

    url = TELEGRAM_API.format(token=settings.telegram_bot_token) + "/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": text,
        "reply_markup": json.dumps(inline_keyboard),
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                logger.info(f"Telegram notification sent for room {room_name}")
                return True
            else:
                logger.error(f"Telegram API error {resp.status_code}: {resp.text}")
                return False
    except Exception:
        logger.exception("Failed to send Telegram notification")
        return False
