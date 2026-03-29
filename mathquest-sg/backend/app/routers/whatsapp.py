"""WhatsApp webhook router for MathQuest SG.

Receives inbound messages from the WhatsApp bridge, processes commands
and free-text queries, and sends responses back via the bridge.
"""

from __future__ import annotations

import json
import logging
from collections import OrderedDict
from datetime import datetime, timezone
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.config import settings
from app.services.dashboard_db import execute, fetch_all, fetch_one
from app.services.exam_context import get_exam_context
from app.services.socratic_tutor import SocraticTutor
from app.services.whatsapp_formatter import format_mcq, split_message, wa_format
from app.services.whatsapp_session import clear_session, get_session

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

# ── Idempotency deduplication ──────────────────────────────────────────

_MAX_SEEN = 1000
_seen_ids: OrderedDict[str, bool] = OrderedDict()


def _is_duplicate(message_id: str) -> bool:
    if message_id in _seen_ids:
        return True
    _seen_ids[message_id] = True
    if len(_seen_ids) > _MAX_SEEN:
        _seen_ids.popitem(last=False)
    return False


# ── Per-phone Socratic tutor instances ─────────────────────────────────

_tutors: dict[str, SocraticTutor] = {}


def _get_tutor(phone: str) -> SocraticTutor:
    if phone not in _tutors:
        _tutors[phone] = SocraticTutor()
    return _tutors[phone]


# ── Pydantic models ───────────────────────────────────────────────────


class InboundMessage(BaseModel):
    messageId: str
    from_: str  # phone number
    pushName: Optional[str] = None
    displayName: Optional[str] = None
    body: Optional[str] = None
    text: Optional[str] = None
    timestamp: Optional[int] = None

    class Config:
        populate_by_name = True

    @property
    def message_text(self) -> str:
        return self.body or self.text or ""

    @property
    def display_name(self) -> str:
        return self.pushName or self.displayName or "Unknown"


# ── Bridge communication ──────────────────────────────────────────────


async def _send_wa(phone: str, text: str) -> None:
    """Send a message to a phone number via the WhatsApp bridge."""
    chunks = split_message(text)
    async with httpx.AsyncClient(timeout=10) as client:
        for chunk in chunks:
            try:
                await client.post(
                    f"{settings.whatsapp_bridge_url}/send",
                    json={"to": phone, "text": chunk},
                    headers={"X-Bridge-Secret": settings.bridge_secret},
                )
            except Exception as exc:
                logger.error("Failed to send WA message to %s: %s %s", phone, type(exc).__name__, exc)


# ── Student lookup / creation ──────────────────────────────────────────


async def _get_or_create_student(phone: str, push_name: str) -> dict[str, Any]:
    """Look up or auto-create a whatsapp_students record."""
    row = await fetch_one(
        "SELECT * FROM whatsapp_students WHERE phone_number = $1", phone
    )
    if row:
        return row

    display = push_name or "Unknown"
    await execute(
        """
        INSERT INTO whatsapp_students (id, phone_number, display_name, status)
        VALUES (gen_random_uuid()::text, $1, $2, 'pending')
        """,
        phone,
        display,
    )
    row = await fetch_one(
        "SELECT * FROM whatsapp_students WHERE phone_number = $1", phone
    )
    return row  # type: ignore[return-value]


# ── Conversation logging ──────────────────────────────────────────────


async def _log_conversation(
    wa_student_id: str,
    topic_id: Optional[str],
    user_msg: str,
    bot_reply: str,
    model_used: str = "unknown",
) -> None:
    """Append to or create a bot_conversations record."""
    messages = json.dumps([
        {"role": "user", "content": user_msg, "ts": datetime.now(timezone.utc).isoformat()},
        {"role": "assistant", "content": bot_reply, "ts": datetime.now(timezone.utc).isoformat()},
    ])
    await execute(
        """
        INSERT INTO bot_conversations (id, wa_student_id, topic_id, messages, model_used)
        VALUES (gen_random_uuid()::text, $1, $2, $3::jsonb, $4)
        """,
        wa_student_id,
        topic_id,
        messages,
        model_used,
    )


# ── Command handlers ──────────────────────────────────────────────────


_HELP_TEXT = wa_format(
    "*MathQuest SG Bot*\n\n"
    "Commands:\n"
    "/start - Welcome message\n"
    "/topics - List available maths topics\n"
    "/practice <topic number> - Start a practice session\n"
    "/hint - Get a hint for the current question\n"
    "/progress - View your learning progress\n"
    "/reset - Clear your session\n"
    "/help - Show this help message\n\n"
    "Or just type any maths question and I'll help you!"
)

_WELCOME_TEXT = wa_format(
    "*Welcome to MathQuest SG!* \n\n"
    "I'm your AI maths tutor for Singapore Sec 1 G3 Mathematics.\n\n"
    "I use the Socratic method - I'll guide you with questions "
    "rather than giving you answers directly.\n\n"
    "Type /topics to see what we can practise, or just ask me "
    "any maths question!\n\n"
    "Type /help for all commands."
)


async def _handle_topics(phone: str) -> str:
    """Return a numbered list of curriculum topics."""
    rows = await fetch_all(
        "SELECT id, name, strand FROM curriculum_topics ORDER BY display_order"
    )
    if not rows:
        return "No topics available yet. Check back soon!"

    lines = ["*Available Topics*\n"]
    for i, row in enumerate(rows, 1):
        lines.append(f"{i}. {row['name']}")
    lines.append("\n_Type /practice <number> to start practising_")
    return "\n".join(lines)


async def _handle_progress(phone: str, student: dict) -> str:
    """Show student progress summary."""
    uid = student.get("user_id")
    if not uid:
        return (
            "Your WhatsApp account isn't linked to a MathQuest web account yet. "
            "Ask your teacher to link your accounts to track progress."
        )

    user_row = await fetch_one(
        "SELECT total_xp, current_level, streak_days FROM users WHERE id = $1", uid
    )
    if not user_row:
        return "Could not find your progress data."

    skills = await fetch_all(
        """
        SELECT usp.topic_id, ct.name, usp.status, usp.accuracy_rate
        FROM user_skill_progress usp
        JOIN curriculum_topics ct ON ct.id = usp.topic_id
        WHERE usp.user_id = $1
        ORDER BY usp.updated_at DESC
        LIMIT 10
        """,
        uid,
    )

    lines = [
        f"*Your Progress*\n",
        f"Level: {user_row['current_level']}",
        f"Total XP: {user_row['total_xp']}",
        f"Streak: {user_row['streak_days']} days\n",
    ]

    if skills:
        lines.append("*Recent Skills:*")
        for s in skills:
            acc = f"{s['accuracy_rate']:.0%}" if s["accuracy_rate"] else "N/A"
            lines.append(f"  {s['name']} - {s['status']} ({acc})")

    return "\n".join(lines)


async def _handle_free_text(phone: str, text: str, student: dict) -> str:
    """Route free text through the Socratic tutor (non-streaming)."""
    session = get_session(phone)
    session.state = "CHATTING"

    # Add user message to conversation history
    session.conversation_history.append({"role": "user", "content": text})

    # Keep history manageable (last 10 turns)
    if len(session.conversation_history) > 20:
        session.conversation_history = session.conversation_history[-20:]

    tutor = _get_tutor(phone)

    # Build topic context enriched with real exam questions
    topic_context: str | None = session.current_topic_id
    exam_ctx = await get_exam_context(session.current_topic_id)
    if exam_ctx:
        topic_context = f"Current topic: {session.current_topic_id}\n\n{exam_ctx}"

    # Collect all chunks (non-streaming for WhatsApp)
    response_parts: list[str] = []
    try:
        async for chunk in tutor.chat(
            messages=session.conversation_history,
            topic_context=topic_context,
        ):
            response_parts.append(chunk)
    except Exception as exc:
        logger.error("Socratic tutor error for %s: %s", phone, exc)
        return "Sorry, I had trouble processing that. Please try again."

    reply = "".join(response_parts)
    session.conversation_history.append({"role": "assistant", "content": reply})

    return wa_format(reply)


# ── Main webhook endpoint ─────────────────────────────────────────────


@router.post("/webhook")
async def whatsapp_webhook(
    request: Request,
    x_bridge_secret: Optional[str] = Header(None),
):
    """Receive an inbound WhatsApp message from the bridge."""
    # Validate bridge secret
    if x_bridge_secret != settings.bridge_secret:
        raise HTTPException(status_code=403, detail="Invalid bridge secret")

    body = await request.json()
    # Handle the from_ field mapping (JSON key is "from")
    if "from" in body and "from_" not in body:
        body["from_"] = body.pop("from")

    msg = InboundMessage(**body)

    # Idempotency check
    if _is_duplicate(msg.messageId):
        return {"ok": True, "duplicate": True}

    phone = msg.from_
    text = msg.message_text.strip()
    push_name = msg.display_name

    logger.info("WA message from %s (%s): %s", phone, push_name, text[:100])

    # Look up or create student
    student = await _get_or_create_student(phone, push_name)

    # If not approved, send denial
    if student["status"] != "approved":
        if student["status"] == "pending":
            await _send_wa(
                phone,
                "Your account is pending approval. Please wait for your "
                "teacher to approve your access.",
            )
        elif student["status"] == "denied":
            await _send_wa(
                phone,
                "Your access has been denied. Please contact your teacher.",
            )
        return {"ok": True, "status": student["status"]}

    # Parse commands
    text_lower = text.lower().strip()
    reply: str

    if text_lower in ("/start", "start", "hi", "hello"):
        reply = _WELCOME_TEXT

    elif text_lower in ("/help", "help"):
        reply = _HELP_TEXT

    elif text_lower in ("/topics", "topics"):
        reply = await _handle_topics(phone)

    elif text_lower in ("/reset", "reset"):
        clear_session(phone)
        if phone in _tutors:
            del _tutors[phone]
        reply = "Session cleared. Type /start to begin again."

    elif text_lower in ("/progress", "progress"):
        reply = await _handle_progress(phone, student)

    elif text_lower.startswith("/practice"):
        # Parse topic number
        parts = text.split(maxsplit=1)
        if len(parts) < 2:
            reply = "Please specify a topic number. Type /topics to see the list."
        else:
            try:
                topic_num = int(parts[1])
                topics = await fetch_all(
                    "SELECT id, name FROM curriculum_topics ORDER BY display_order"
                )
                if 1 <= topic_num <= len(topics):
                    topic = topics[topic_num - 1]
                    session = get_session(phone)
                    session.current_topic_id = topic["id"]
                    session.state = "PRACTICING"
                    reply = (
                        f"*Starting practice: {topic['name']}*\n\n"
                        f"Ask me any question about this topic, or type a "
                        f"maths problem and I'll help you work through it."
                    )
                else:
                    reply = f"Invalid topic number. Please choose 1-{len(topics)}."
            except ValueError:
                reply = "Please provide a valid topic number. Type /topics to see the list."

    elif len(text) == 1 and text.upper() in "ABCD":
        # MCQ answer
        session = get_session(phone)
        if session.state == "AWAITING_MCQ" and session.current_question:
            q = session.current_question
            correct = q.get("ans", "")
            chosen = text.upper()
            if chosen == correct:
                reply = "Correct! Well done!"
                session.state = "PRACTICING"
                session.current_question = None
            else:
                reply = (
                    f"Not quite. The correct answer is *{correct}*.\n\n"
                    f"{q.get('explain', '')}"
                )
                session.state = "PRACTICING"
                session.current_question = None
        else:
            # Treat as free text
            reply = await _handle_free_text(phone, text, student)

    else:
        # Free text -> Socratic tutor
        reply = await _handle_free_text(phone, text, student)

    # Send response
    await _send_wa(phone, reply)

    # Log conversation
    await _log_conversation(
        wa_student_id=student["id"],
        topic_id=get_session(phone).current_topic_id,
        user_msg=text,
        bot_reply=reply,
    )

    return {"ok": True}
