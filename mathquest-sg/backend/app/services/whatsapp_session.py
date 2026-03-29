"""In-memory WhatsApp session manager for MathQuest SG.

Tracks per-phone conversation state, current topic, MCQ answer status, etc.
For production use Redis or a persistent store instead.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

_sessions: dict[str, WhatsAppSession] = {}


@dataclass
class WhatsAppSession:
    phone: str
    student_id: Optional[str] = None
    state: str = "IDLE"  # IDLE, CHATTING, PRACTICING, AWAITING_MCQ
    current_topic_id: Optional[str] = None
    current_question: Optional[dict] = None
    conversation_history: list = field(default_factory=list)
    hint_level: int = 0
    last_active: datetime = field(default_factory=datetime.utcnow)


def get_session(phone: str) -> WhatsAppSession:
    """Get or create a session for the given phone number."""
    if phone not in _sessions:
        _sessions[phone] = WhatsAppSession(phone=phone)
    _sessions[phone].last_active = datetime.utcnow()
    return _sessions[phone]


def clear_session(phone: str) -> None:
    """Remove a session entirely."""
    _sessions.pop(phone, None)
