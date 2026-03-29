"""Tutor API router for MathQuest SG.

Provides chat (streaming) and marking endpoints.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.guardrails import apply_guardrail, get_redirect_message
from app.services.marking_service import MarkingResult, mark_answer
from app.services.socratic_tutor import SocraticTutor

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/tutor", tags=["tutor"])

# Per-request tutor instance. In production this would be keyed by session,
# but for the POC a single shared instance demonstrates the hint escalation.
_tutor = SocraticTutor()


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    topic_context: str | None = None


class MarkRequest(BaseModel):
    studentAnswer: str
    correctAnswer: str
    topic: str
    skill: str


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/chat")
async def tutor_chat(request: ChatRequest):
    """Stream a Socratic tutoring response.

    Accepts conversation history and returns a streaming text response
    from the AI tutor.
    """
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    # Run the latest user message through guardrails
    latest_user_msg = ""
    for msg in reversed(request.messages):
        if msg.role == "user":
            latest_user_msg = msg.content
            break

    if latest_user_msg:
        guardrail_result = apply_guardrail(latest_user_msg)
        if not guardrail_result.safe:
            logger.info(
                "Guardrail blocked message (reason=%s)", guardrail_result.blocked_reason
            )
            redirect = get_redirect_message(guardrail_result.blocked_reason or "off_topic")

            async def blocked_response():
                yield redirect

            return StreamingResponse(
                blocked_response(),
                media_type="text/plain",
                headers={"X-Hint-Level": str(_tutor.hint_level), "X-Guardrail-Blocked": "true"},
            )

    async def generate():
        async for chunk in _tutor.chat(
            messages=messages,
            topic_context=request.topic_context,
        ):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={"X-Hint-Level": str(_tutor.hint_level)},
    )


@router.post("/mark", response_model=MarkingResult)
async def tutor_mark(request: MarkRequest):
    """Mark a student's answer using SymPy verification and AI feedback.

    Returns structured marking result with correctness, score, and feedback.
    """
    result = await mark_answer(
        student_answer=request.studentAnswer,
        correct_answer=request.correctAnswer,
        topic=request.topic,
        skill=request.skill,
    )
    return result
