from __future__ import annotations

import time
from datetime import timedelta

from livekit.api import AccessToken, LiveKitAPI, VideoGrants
from livekit.api.room_service import CreateRoomRequest, DeleteRoomRequest

from .config import settings


def create_token(room_name: str, identity: str, name: str) -> str:
    token = (
        AccessToken(settings.livekit_api_key, settings.livekit_api_secret)
        .with_identity(identity)
        .with_name(name)
        .with_grants(
            VideoGrants(room_join=True, room=room_name, can_publish=True, can_subscribe=True)
        )
        .with_ttl(timedelta(minutes=30))
    )
    return token.to_jwt()


def generate_room_name(centre_id: int) -> str:
    ts = int(time.time())
    return f"esc-{centre_id}-{ts}"


async def create_room(room_name: str, timeout_seconds: int = 300) -> None:
    lk_url = settings.livekit_url.replace("ws://", "http://").replace("wss://", "https://")
    api = LiveKitAPI(lk_url, settings.livekit_api_key, settings.livekit_api_secret)
    try:
        await api.room.create_room(
            CreateRoomRequest(name=room_name, empty_timeout=timeout_seconds)
        )
    finally:
        await api.aclose()


async def delete_room(room_name: str) -> None:
    lk_url = settings.livekit_url.replace("ws://", "http://").replace("wss://", "https://")
    api = LiveKitAPI(lk_url, settings.livekit_api_key, settings.livekit_api_secret)
    try:
        await api.room.delete_room(DeleteRoomRequest(room=room_name))
    finally:
        await api.aclose()
