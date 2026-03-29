"""Socratic tutoring service for MathQuest SG.

Orchestrates intent classification, model routing, and streaming AI responses
while maintaining a hint escalation counter.
"""

from __future__ import annotations

import logging
from collections.abc import AsyncGenerator

from app.prompts.socratic_system import SOCRATIC_SYSTEM_PROMPT
from app.services.bedrock_client import stream_converse
from app.services.model_router import classify_intent, get_model_for_intent

logger = logging.getLogger(__name__)


class SocraticTutor:
    """Stateful Socratic tutor that tracks hint escalation level."""

    def __init__(self) -> None:
        self._hint_level: int = 1  # 1-4 escalation
        self._consecutive_hint_requests: int = 0

    @property
    def hint_level(self) -> int:
        return self._hint_level

    def reset_hint_level(self) -> None:
        """Reset hint level when student makes progress."""
        self._hint_level = 1
        self._consecutive_hint_requests = 0

    def _escalate_hint(self) -> None:
        """Escalate hint level (max 4)."""
        self._consecutive_hint_requests += 1
        if self._consecutive_hint_requests >= 2:
            self._hint_level = min(self._hint_level + 1, 4)
            self._consecutive_hint_requests = 0
            logger.info("Hint level escalated to %d", self._hint_level)

    def _build_system_prompt(self, topic_context: str | None = None) -> str:
        """Build the full system prompt with hint level and optional context."""
        parts = [SOCRATIC_SYSTEM_PROMPT]

        parts.append(
            f"\n\n## Current Hint Level: {self._hint_level}\n"
            f"You are currently at hint level {self._hint_level} of 4. "
            f"Adjust your guidance accordingly — "
            f"{'give a conceptual nudge only' if self._hint_level == 1 else ''}"
            f"{'give a specific, targeted hint' if self._hint_level == 2 else ''}"
            f"{'show a worked similar example, then ask the student to try their problem' if self._hint_level == 3 else ''}"
            f"{'walk through the problem step by step, pausing at each step' if self._hint_level == 4 else ''}"
            f"."
        )

        if topic_context:
            parts.append(
                f"\n\n## Current Topic Context\n{topic_context}"
            )

        return "".join(parts)

    async def chat(
        self,
        messages: list[dict],
        topic_context: str | None = None,
    ) -> AsyncGenerator[str, None]:
        """Process a chat turn with the student.

        Parameters
        ----------
        messages : list[dict]
            Conversation history as ``[{"role": "user"|"assistant", "content": "..."}]``.
        topic_context : str | None
            Optional context about the current topic/question being worked on.

        Yields
        ------
        str
            Text chunks streamed from the AI model.
        """
        if not messages:
            yield "Please send me a message and I'll help you with your maths!"
            return

        # Classify the latest user message
        latest_user_msg = ""
        for msg in reversed(messages):
            if msg.get("role") == "user":
                latest_user_msg = msg["content"]
                break

        if not latest_user_msg:
            yield "I didn't catch that. Could you try again?"
            return

        intent = await classify_intent(latest_user_msg)
        logger.info("Classified intent: %s", intent)

        # Update hint tracking based on intent
        if intent == "hint_request":
            self._escalate_hint()
        elif intent == "quiz_answer":
            # Student is attempting — reset consecutive hint counter
            # but don't reset hint level (they might still be stuck)
            self._consecutive_hint_requests = 0

        # Select model based on intent
        model_id = get_model_for_intent(intent)
        logger.info(
            "Routing to model %s (intent=%s, hint_level=%d)",
            model_id, intent, self._hint_level,
        )

        # Build system prompt with current state
        system_prompt = self._build_system_prompt(topic_context)

        # Stream the response
        async for chunk in stream_converse(
            model_id=model_id,
            messages=messages,
            system_prompt=system_prompt,
        ):
            yield chunk
