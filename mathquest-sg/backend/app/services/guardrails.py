"""Content guardrails for MathQuest SG.

Provides keyword-based content filtering to keep student interactions safe
and on-topic. Designed as a drop-in replacement for AWS Bedrock Guardrails
once credentials are configured.

The keyword filter is intentionally conservative — it blocks clearly
inappropriate content while allowing legitimate math discussions through.
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Blocked content patterns
# ---------------------------------------------------------------------------

# Violence / weapons
_VIOLENCE_PATTERNS: list[str] = [
    r"\b(kill|murder|shoot|stab|bomb|weapon|gun|knife|assault|attack)\b",
    r"\b(terrorism|terrorist|suicide|self[- ]?harm)\b",
    r"\b(blood|gore|torture|execute|decapitate)\b",
]

# Adult / sexual content
_ADULT_PATTERNS: list[str] = [
    r"\b(sex|porn|nude|naked|xxx|nsfw|hentai)\b",
    r"\b(erotic|orgasm|genitals|penis|vagina|breasts)\b",
]

# Profanity (common English)
_PROFANITY_PATTERNS: list[str] = [
    r"\b(fuck|shit|damn|ass|bitch|bastard|crap|dick|cock|pussy)\b",
    r"\b(wtf|stfu|lmao|fml)\b",
]

# Off-topic personal / identity questions about the AI
_OFFTOPIC_AI_PATTERNS: list[str] = [
    r"\b(who (are|made|created|built) you)\b",
    r"\b(are you (a |an )?(real|human|alive|sentient|conscious))\b",
    r"\b(what (are|is) your (name|age|gender|feelings))\b",
    r"\b(do you (have|feel|think|believe|love|hate))\b",
    r"\b(tell me about yourself)\b",
]

# Off-topic non-math requests
_OFFTOPIC_GENERAL_PATTERNS: list[str] = [
    r"\b(write (me |a )?(story|essay|poem|song|code|script))\b",
    r"\b(play (a |)game)\b",
    r"\b(tell (me |)(a |)joke)\b",
    r"\b(what('s| is) the (weather|news|time))\b",
    r"\b(recipe|cooking|movie|music|sports score)\b",
    r"\b(hack|cheat|bypass|jailbreak|ignore (your|previous) instructions)\b",
    r"\b(pretend you are|roleplay|act as)\b",
]

# Math-related allowlist — if the message matches these, skip off-topic check
_MATH_ALLOWLIST_PATTERNS: list[str] = [
    r"\b(math|maths|algebra|geometry|equation|formula|solve|calculate)\b",
    r"\b(number|integer|fraction|decimal|percentage|ratio)\b",
    r"\b(triangle|circle|square|rectangle|polygon|angle)\b",
    r"\b(graph|function|variable|coefficient|exponent|root)\b",
    r"\b(area|volume|perimeter|surface)\b",
    r"\b(mean|median|mode|statistics|histogram|data)\b",
    r"\b(prime|factor|hcf|lcm|multiple|divisor)\b",
    r"\b(gradient|slope|intercept|coordinate|axis)\b",
    r"\b(sequence|pattern|term|nth)\b",
    r"\b(speed|distance|time|rate)\b",
    r"\b(hint|help|explain|how|why|what|show|step)\b",
    r"\b(question|answer|problem|exercise|practice|quiz)\b",
    r"\d",  # contains numbers — likely math-related
    r"[+\-*/=<>^(){}[\]]",  # math operators
]


def _compile_patterns(patterns: list[str]) -> list[re.Pattern[str]]:
    return [re.compile(p, re.IGNORECASE) for p in patterns]


_violence_re = _compile_patterns(_VIOLENCE_PATTERNS)
_adult_re = _compile_patterns(_ADULT_PATTERNS)
_profanity_re = _compile_patterns(_PROFANITY_PATTERNS)
_offtopic_ai_re = _compile_patterns(_OFFTOPIC_AI_PATTERNS)
_offtopic_general_re = _compile_patterns(_OFFTOPIC_GENERAL_PATTERNS)
_math_allowlist_re = _compile_patterns(_MATH_ALLOWLIST_PATTERNS)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

@dataclass
class GuardrailResult:
    """Result of a guardrail check."""

    safe: bool
    blocked_reason: str | None
    filtered_text: str


def _matches_any(text: str, patterns: list[re.Pattern[str]]) -> bool:
    return any(p.search(text) for p in patterns)


def _is_math_related(text: str) -> bool:
    return _matches_any(text, _math_allowlist_re)


def apply_guardrail(text: str) -> GuardrailResult:
    """Check text against content guardrails.

    This is a keyword-based implementation. When AWS Bedrock Guardrails
    credentials are configured, this can be replaced with an API call to
    ``bedrock-runtime.apply_guardrail()``.

    Parameters
    ----------
    text : str
        The student's message text to check.

    Returns
    -------
    GuardrailResult
        Whether the text is safe, the reason if blocked, and the
        (potentially filtered) text.
    """
    if not text or not text.strip():
        return GuardrailResult(safe=True, blocked_reason=None, filtered_text=text)

    # Check for clearly inappropriate content (always blocked regardless)
    if _matches_any(text, _violence_re):
        logger.warning("Guardrail blocked violence content")
        return GuardrailResult(
            safe=False,
            blocked_reason="violence",
            filtered_text="",
        )

    if _matches_any(text, _adult_re):
        logger.warning("Guardrail blocked adult content")
        return GuardrailResult(
            safe=False,
            blocked_reason="adult_content",
            filtered_text="",
        )

    if _matches_any(text, _profanity_re):
        logger.warning("Guardrail blocked profanity")
        return GuardrailResult(
            safe=False,
            blocked_reason="profanity",
            filtered_text="",
        )

    # If the message is clearly math-related, allow it through
    if _is_math_related(text):
        return GuardrailResult(safe=True, blocked_reason=None, filtered_text=text)

    # Check off-topic AI identity questions
    if _matches_any(text, _offtopic_ai_re):
        logger.info("Guardrail blocked off-topic AI identity question")
        return GuardrailResult(
            safe=False,
            blocked_reason="off_topic_ai",
            filtered_text="",
        )

    # Check other off-topic requests
    if _matches_any(text, _offtopic_general_re):
        logger.info("Guardrail blocked off-topic request")
        return GuardrailResult(
            safe=False,
            blocked_reason="off_topic",
            filtered_text="",
        )

    # Default: allow through (we don't want to be too restrictive)
    return GuardrailResult(safe=True, blocked_reason=None, filtered_text=text)


# Polite redirect messages for each block reason
REDIRECT_MESSAGES: dict[str, str] = {
    "violence": (
        "I'm here to help you with maths! "
        "Let's keep our conversation focused on your studies. "
        "What topic would you like to work on?"
    ),
    "adult_content": (
        "I'm your maths tutor and I can only help with maths topics. "
        "Shall we get back to practising? Which topic are you working on?"
    ),
    "profanity": (
        "Let's keep things friendly! I'm here to help you with maths. "
        "Take a deep breath and let me know what question you're stuck on."
    ),
    "off_topic_ai": (
        "I'm your MathQuest maths tutor! "
        "I'm best at helping you with Singapore Sec 1 G3 maths. "
        "What would you like to work on today?"
    ),
    "off_topic": (
        "That's an interesting thought, but I'm only able to help with maths! "
        "Let's get back to practising. Which topic shall we tackle?"
    ),
}


def get_redirect_message(blocked_reason: str) -> str:
    """Get a polite redirect message for a given block reason."""
    return REDIRECT_MESSAGES.get(
        blocked_reason,
        "Let's focus on maths! What topic would you like to work on?",
    )
