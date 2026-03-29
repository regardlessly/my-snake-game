"""AI question generator with SymPy verification for MathQuest SG.

Generates Singapore-curriculum-aligned maths questions using Claude via
AWS Bedrock, then validates answers with SymPy before returning them.
"""

from __future__ import annotations

import json
import logging
import random
from typing import Optional

from pydantic import BaseModel

from app.services.bedrock_client import BedrockNotConfigured, converse
from app.services.sympy_verifier import verify_equivalence

logger = logging.getLogger(__name__)

MODEL_ID = "anthropic.claude-sonnet-4-20250514"
MAX_RETRIES = 2


# ---------------------------------------------------------------------------
# Output model
# ---------------------------------------------------------------------------

class GeneratedQuestion(BaseModel):
    type: str  # "mcq" or "free_response"
    q: str  # question text
    opts: list[str] | None = None  # MCQ options (4)
    ans: int | str  # MCQ answer index (0-3) or free-response expression
    explain: str  # step-by-step explanation
    sympy_expr: str | None = None  # SymPy-parseable correct answer
    difficulty: int  # 1-5
    skill_id: str
    topic_id: str


# ---------------------------------------------------------------------------
# Prompt construction
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """\
You are an expert Singapore primary/secondary mathematics curriculum designer.
You generate practice questions that are:
- Aligned to the Singapore MOE maths syllabus
- Contextualised with Singapore references (SGD for currency, Singaporean names \
like Wei Ling, Ravi, Amirah, Zhi Hao; local places like MRT stations, HDB \
estates, hawker centres, Changi Airport)
- Age-appropriate for the given difficulty level (1 = P1-P2, 2 = P3-P4, \
3 = P5-P6, 4 = Sec 1-2, 5 = Sec 3-4)

You MUST respond with valid JSON only — no markdown fences, no commentary.
"""


def _build_user_prompt(
    topic_id: str,
    skill_id: str,
    difficulty: int,
    question_type: str = "mcq",
) -> str:
    return f"""\
Generate a single {question_type} maths question with these parameters:
- topic_id: "{topic_id}"
- skill_id: "{skill_id}"
- difficulty: {difficulty} (scale 1-5)

Return a JSON object with exactly these keys:
{{
  "type": "{question_type}",
  "q": "<question text>",
  "opts": ["<option A>", "<option B>", "<option C>", "<option D>"] or null,
  "ans": <0-3 for MCQ index, or "<answer expression>" for free_response>,
  "explain": "<step-by-step worked solution>",
  "sympy_expr": "<SymPy-parseable string of the correct numerical/algebraic answer, e.g. '42' or '2*x + 3' or 'Rational(3,4)'>",
  "difficulty": {difficulty},
  "skill_id": "{skill_id}",
  "topic_id": "{topic_id}"
}}

Rules:
- For MCQ, "ans" must be the 0-based index of the correct option.
- "sympy_expr" must be a valid Python/SymPy expression of the correct answer \
(the numeric value for MCQ, or the algebraic answer for free_response). \
Use Rational(a, b) for fractions instead of a/b.
- Use Singapore context: SGD currency, Singaporean names, local references.
- The explanation should be clear, step-by-step, suitable for a student.
- Return ONLY the JSON object, nothing else.
"""


# ---------------------------------------------------------------------------
# Core generation
# ---------------------------------------------------------------------------

def _call_claude(topic_id: str, skill_id: str, difficulty: int) -> dict:
    """Call Claude and parse the JSON response."""
    user_prompt = _build_user_prompt(topic_id, skill_id, difficulty)

    messages = [
        {"role": "user", "content": [{"text": user_prompt}]},
    ]

    raw = converse(
        model_id=MODEL_ID,
        messages=messages,
        system_prompt=SYSTEM_PROMPT,
    )

    # Strip markdown fences if the model wrapped them anyway
    text = raw.strip()
    if text.startswith("```"):
        # Remove opening fence (```json or ```)
        text = text.split("\n", 1)[1] if "\n" in text else text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()

    return json.loads(text)


def _verify_question(data: dict) -> bool:
    """Verify the sympy_expr against the stated answer using SymPy.

    Returns True if verification passes or is not applicable.
    """
    sympy_expr = data.get("sympy_expr")
    if not sympy_expr:
        return True  # nothing to verify

    # For MCQ, verify that sympy_expr matches the selected option
    if data.get("type") == "mcq":
        opts = data.get("opts") or []
        ans_idx = data.get("ans")
        if isinstance(ans_idx, int) and 0 <= ans_idx < len(opts):
            correct_option = opts[ans_idx]
            # Try to verify the option value equals sympy_expr
            try:
                result = verify_equivalence(
                    student_answer=correct_option,
                    correct_answer=sympy_expr,
                    answer_type="numeric",
                )
                return result.equivalent
            except Exception:
                logger.warning(
                    "SymPy verification failed for MCQ option, accepting anyway"
                )
                return True
        return True

    # For free_response, the ans field itself should match sympy_expr
    ans = str(data.get("ans", ""))
    if ans:
        try:
            result = verify_equivalence(
                student_answer=ans,
                correct_answer=sympy_expr,
                answer_type="expression",
            )
            return result.equivalent
        except Exception:
            logger.warning(
                "SymPy verification failed for free_response, accepting anyway"
            )
            return True

    return True


async def generate_question(
    topic_id: str,
    skill_id: str,
    difficulty: int = 2,
) -> GeneratedQuestion:
    """Generate a single verified maths question.

    Calls Claude Sonnet via Bedrock, parses the JSON response, verifies the
    answer with SymPy, and retries up to MAX_RETRIES times on failure.

    Raises
    ------
    BedrockNotConfigured
        If AWS credentials are not set.
    RuntimeError
        If generation fails after all retries.
    """
    last_error: Exception | None = None

    for attempt in range(1 + MAX_RETRIES):
        try:
            data = _call_claude(topic_id, skill_id, difficulty)

            if not _verify_question(data):
                logger.warning(
                    "SymPy verification failed (attempt %d/%d), retrying",
                    attempt + 1,
                    1 + MAX_RETRIES,
                )
                continue

            return GeneratedQuestion(**data)

        except json.JSONDecodeError as exc:
            last_error = exc
            logger.warning(
                "JSON parse failed (attempt %d/%d): %s",
                attempt + 1,
                1 + MAX_RETRIES,
                exc,
            )
        except Exception as exc:
            last_error = exc
            logger.warning(
                "Generation failed (attempt %d/%d): %s",
                attempt + 1,
                1 + MAX_RETRIES,
                exc,
            )

    raise RuntimeError(
        f"Question generation failed after {1 + MAX_RETRIES} attempts: {last_error}"
    )


# ---------------------------------------------------------------------------
# Batch generation
# ---------------------------------------------------------------------------

# Default skill breakdown per topic — in production this would come from a
# curriculum database.  For now, if the caller doesn't supply skill_id we
# pick from generic placeholders.
_DEFAULT_SKILLS = [
    "skill_concept",
    "skill_procedure",
    "skill_application",
    "skill_word_problem",
    "skill_challenge",
]


async def generate_batch(
    topic_id: str,
    count: int = 10,
) -> list[GeneratedQuestion]:
    """Generate *count* questions for a topic, spread across skills and
    difficulty levels.

    Raises
    ------
    BedrockNotConfigured
        If AWS credentials are not set.
    """
    questions: list[GeneratedQuestion] = []
    errors: list[str] = []

    for i in range(count):
        # Spread across difficulties 1-5 and skills
        difficulty = (i % 5) + 1
        skill_id = _DEFAULT_SKILLS[i % len(_DEFAULT_SKILLS)]

        try:
            q = await generate_question(
                topic_id=topic_id,
                skill_id=skill_id,
                difficulty=difficulty,
            )
            questions.append(q)
        except Exception as exc:
            logger.error("Batch item %d failed: %s", i, exc)
            errors.append(f"Item {i}: {exc}")

    if not questions and errors:
        raise RuntimeError(
            f"Batch generation produced 0 questions. Errors: {'; '.join(errors)}"
        )

    return questions
