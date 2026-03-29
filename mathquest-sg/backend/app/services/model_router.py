"""Model routing layer for MathQuest SG.

Classifies student intent and dispatches to the appropriate Bedrock model.
"""

from __future__ import annotations

import logging

from app.prompts.classify_system import CLASSIFY_SYSTEM_PROMPT
from app.services.bedrock_client import converse

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Model IDs
# ---------------------------------------------------------------------------

NOVA_LITE = "amazon.nova-lite-v1:0"
CLAUDE_HAIKU = "anthropic.claude-3-5-haiku-20241022-v1:0"
CLAUDE_SONNET = "anthropic.claude-sonnet-4-20250514-v1:0"

VALID_INTENTS = frozenset({
    "quiz_answer",
    "hint_request",
    "concept_question",
    "off_topic",
    "greeting",
})

_INTENT_MODEL_MAP: dict[str, str] = {
    "quiz_answer": CLAUDE_HAIKU,
    "hint_request": CLAUDE_HAIKU,
    "concept_question": CLAUDE_SONNET,
    "off_topic": CLAUDE_HAIKU,
    "greeting": CLAUDE_HAIKU,
}


# ---------------------------------------------------------------------------
# Intent classification
# ---------------------------------------------------------------------------

async def classify_intent(message: str) -> str:
    """Classify a student message into one of the known intents.

    Uses Nova Lite (cheapest model) for fast, low-cost classification.

    Returns
    -------
    str
        One of: "quiz_answer", "hint_request", "concept_question",
        "off_topic", "greeting".
    """
    classification_messages = [
        {
            "role": "user",
            "content": (
                f"Classify this student message into one of: "
                f"quiz_answer, hint_request, concept_question, off_topic, greeting.\n\n"
                f"Message: {message}\n\n"
                f"Classification:"
            ),
        }
    ]

    result = await converse(
        model_id=NOVA_LITE,
        messages=classification_messages,
        system_prompt=CLASSIFY_SYSTEM_PROMPT,
    )

    # Parse the result — model should return just the category name
    intent = result.strip().lower().replace(" ", "_")

    # Handle cases where model returns extra text
    for valid in VALID_INTENTS:
        if valid in intent:
            return valid

    logger.warning(
        "Could not parse intent from model response: %r — defaulting to hint_request",
        result,
    )
    return "hint_request"


# ---------------------------------------------------------------------------
# Model selection
# ---------------------------------------------------------------------------

def get_model_for_intent(intent: str) -> str:
    """Map an intent to the appropriate Bedrock model ID.

    Parameters
    ----------
    intent : str
        One of the valid intent categories.

    Returns
    -------
    str
        A Bedrock model ID.
    """
    return _INTENT_MODEL_MAP.get(intent, CLAUDE_HAIKU)
