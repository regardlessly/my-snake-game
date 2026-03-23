from __future__ import annotations

import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class TriggerType(str, Enum):
    VOICE = "voice"
    BUTTON = "button"
    AI_AUTO = "ai_auto"


class RiskTier(str, Enum):
    R1 = "R1"
    R2 = "R2"
    R3 = "R3"
    R4 = "R4"


class RoomState(str, Enum):
    WAITING = "waiting"
    ACTIVE = "active"
    ENDED = "ended"
    TIMEOUT = "timeout"


class EscalationRequest(BaseModel):
    member_id: int
    member_name: str = "Unknown Member"
    centre_id: int = 0
    centre_name: str = "Centre"
    summary: str = ""
    language: str = "English"
    risk_tier: Optional[RiskTier] = None
    trigger_type: TriggerType = TriggerType.BUTTON
    photo_url: Optional[str] = None
    audio_only: bool = False


class EscalationResponse(BaseModel):
    call_id: str
    room_name: str
    senior_token: str
    livekit_url: str
    status: RoomState = RoomState.WAITING


class RoomStatus(BaseModel):
    room_name: str
    status: RoomState
    wait_seconds: int = 0
    call_seconds: int = 0
    staff_joined: bool = False
    livekit_url: str = ""


class ActiveRoom(BaseModel):
    call_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    room_name: str
    centre_id: int = 0
    member_id: int = 0
    member_name: str = ""
    language: str = "English"
    summary: str = ""
    risk_tier: Optional[RiskTier] = None
    trigger_type: TriggerType = TriggerType.BUTTON
    senior_token: str = ""
    staff_token: str = ""
    status: RoomState = RoomState.WAITING
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    connected_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    staff_id: Optional[int] = None
    audio_only: bool = False
