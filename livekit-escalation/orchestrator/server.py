from __future__ import annotations

import asyncio
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict

import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

from .clickhouse_logger import ensure_table, log_escalation_event
from .config import settings
from .livekit_client import create_room, create_token, delete_room, generate_room_name
from .models import (
    ActiveRoom,
    EscalationRequest,
    EscalationResponse,
    RoomState,
    RoomStatus,
)
from .telegram_bot import send_escalation_notification

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
CLIENTS_DIR = BASE_DIR / "clients"

# In-memory room registry
rooms: Dict[str, ActiveRoom] = {}


async def _timeout_watcher(room_name: str):
    """Cancel a room if no staff joins within the timeout period."""
    await asyncio.sleep(settings.call_timeout_seconds)
    room = rooms.get(room_name)
    if room and room.status == RoomState.WAITING:
        room.status = RoomState.TIMEOUT
        room.ended_at = datetime.now(timezone.utc)
        wait_sec = int((room.ended_at - room.created_at).total_seconds())
        logger.info(f"Room {room_name} timed out after {wait_sec}s")
        await log_escalation_event(
            call_id=room.call_id,
            room_name=room.room_name,
            centre_id=room.centre_id,
            member_id=room.member_id,
            trigger_type=room.trigger_type.value,
            ai_summary=room.summary,
            risk_tier=room.risk_tier.value if room.risk_tier else "R1",
            outcome="timeout",
            wait_seconds=wait_sec,
            call_seconds=0,
            language=room.language,
            created_at=room.created_at,
        )
        try:
            await delete_room(room_name)
        except Exception:
            logger.exception(f"Failed to delete timed-out room {room_name}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Escalation orchestrator starting up")
    await ensure_table()
    yield
    logger.info("Escalation orchestrator shutting down")


app = FastAPI(title="CaritaHub Video Escalation", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


@app.get("/")
async def root():
    return {"service": "CaritaHub Video Escalation", "status": "running", "endpoints": ["/api/health", "/api/escalation/create", "/kiosk-call", "/call/{room_name}"]}


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "escalation-orchestrator", "rooms_active": len(rooms)}


@app.post("/api/escalation/create", response_model=EscalationResponse)
async def create_escalation(req: EscalationRequest):
    room_name = generate_room_name(req.centre_id)

    try:
        await create_room(room_name, timeout_seconds=settings.call_timeout_seconds + 60)
    except Exception:
        logger.exception("Failed to create LiveKit room")
        raise HTTPException(status_code=502, detail="Failed to create LiveKit room")

    senior_token = create_token(room_name, f"senior_{req.member_id}", req.member_name)
    staff_token = create_token(room_name, "staff", "Staff")

    room = ActiveRoom(
        room_name=room_name,
        centre_id=req.centre_id,
        member_id=req.member_id,
        member_name=req.member_name,
        language=req.language,
        summary=req.summary,
        risk_tier=req.risk_tier,
        trigger_type=req.trigger_type,
        senior_token=senior_token,
        staff_token=staff_token,
        audio_only=req.audio_only,
    )
    rooms[room_name] = room

    asyncio.create_task(send_escalation_notification(
        room_name=room_name,
        staff_token=staff_token,
        member_name=req.member_name,
        centre_name=req.centre_name,
        language=req.language,
        summary=req.summary,
        risk_tier=req.risk_tier.value if req.risk_tier else None,
        audio_only=req.audio_only,
    ))

    asyncio.create_task(_timeout_watcher(room_name))

    logger.info(f"Escalation created: {room_name} for member {req.member_id}")

    return EscalationResponse(
        call_id=room.call_id,
        room_name=room_name,
        senior_token=senior_token,
        livekit_url=settings.livekit_url,
    )


@app.get("/api/escalation/{room_name}/status", response_model=RoomStatus)
async def get_room_status(room_name: str):
    room = rooms.get(room_name)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    now = datetime.now(timezone.utc)
    wait_sec = int((now - room.created_at).total_seconds())
    call_sec = 0
    if room.connected_at:
        end = room.ended_at or now
        call_sec = int((end - room.connected_at).total_seconds())

    return RoomStatus(
        room_name=room_name,
        status=room.status,
        wait_seconds=wait_sec,
        call_seconds=call_sec,
        staff_joined=room.connected_at is not None,
        livekit_url=settings.livekit_url,
    )


@app.post("/api/escalation/{room_name}/end")
async def end_escalation(room_name: str):
    room = rooms.get(room_name)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    now = datetime.now(timezone.utc)
    room.status = RoomState.ENDED
    room.ended_at = now

    wait_sec = int(((room.connected_at or now) - room.created_at).total_seconds())
    call_sec = 0
    if room.connected_at:
        call_sec = int((now - room.connected_at).total_seconds())

    outcome = "connected" if room.connected_at else "cancelled"

    await log_escalation_event(
        call_id=room.call_id,
        room_name=room.room_name,
        centre_id=room.centre_id,
        member_id=room.member_id,
        trigger_type=room.trigger_type.value,
        ai_summary=room.summary,
        risk_tier=room.risk_tier.value if room.risk_tier else "R1",
        outcome=outcome,
        wait_seconds=wait_sec,
        call_seconds=call_sec,
        language=room.language,
        created_at=room.created_at,
        connected_at=room.connected_at,
        ended_at=now,
        staff_id=room.staff_id,
    )

    try:
        await delete_room(room_name)
    except Exception:
        logger.exception(f"Failed to delete room {room_name}")

    logger.info(f"Escalation ended: {room_name} outcome={outcome} call={call_sec}s")
    return {"status": "ended", "outcome": outcome, "call_seconds": call_sec}


@app.post("/api/escalation/webhook")
async def livekit_webhook(request: Request):
    """Handle LiveKit webhook events (participant joined/left)."""
    body = await request.json()
    event = body.get("event", "")
    room_name = body.get("room", {}).get("name", "")
    participant = body.get("participant", {})
    identity = participant.get("identity", "")

    logger.info(f"LiveKit webhook: event={event} room={room_name} participant={identity}")

    room = rooms.get(room_name)
    if not room:
        return {"status": "ignored"}

    if event == "participant_joined" and identity == "staff":
        room.status = RoomState.ACTIVE
        room.connected_at = datetime.now(timezone.utc)
        logger.info(f"Staff joined room {room_name}")

    elif event == "participant_left" and identity == "staff":
        if room.status == RoomState.ACTIVE:
            room.status = RoomState.ENDED
            room.ended_at = datetime.now(timezone.utc)
            logger.info(f"Staff left room {room_name} — ending call")

    return {"status": "ok"}


@app.get("/call/{room_name}")
async def staff_call_page(room_name: str, token: str = ""):
    room = rooms.get(room_name)
    if not room or room.status in (RoomState.ENDED, RoomState.TIMEOUT):
        return FileResponse(str(CLIENTS_DIR / "expired.html"))
    return FileResponse(str(CLIENTS_DIR / "staff.html"))


@app.get("/kiosk-call")
async def kiosk_call_page():
    return FileResponse(str(CLIENTS_DIR / "kiosk.html"))


def main():
    # Railway provides PORT env var; fall back to escalation_port
    port = settings.port if settings.port else settings.escalation_port
    kwargs = dict(
        host=settings.escalation_host,
        port=port,
        log_level="info",
    )
    if settings.ssl_certfile and settings.ssl_keyfile:
        kwargs["ssl_certfile"] = settings.ssl_certfile
        kwargs["ssl_keyfile"] = settings.ssl_keyfile
        logger.info(f"TLS enabled: cert={settings.ssl_certfile}")
    uvicorn.run("orchestrator.server:app", **kwargs)


if __name__ == "__main__":
    main()
