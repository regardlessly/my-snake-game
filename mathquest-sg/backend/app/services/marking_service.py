"""AI-powered marking service with SymPy ground truth for MathQuest SG.

Combines deterministic SymPy verification with LLM-generated step-level
feedback to provide accurate and pedagogically useful marking.
"""

from __future__ import annotations

import logging
from typing import Optional

from pydantic import BaseModel

from app.prompts.marking_system import MARKING_SYSTEM_PROMPT
from app.services.bedrock_client import converse
from app.services.model_router import CLAUDE_HAIKU
from app.services.sympy_verifier import VerificationResult, verify_equivalence

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Result model
# ---------------------------------------------------------------------------

class MarkingResult(BaseModel):
    """Result of marking a student's answer."""

    correct: bool
    score: float
    feedback: str
    sympy_verified: bool
    tag: str = ""  # [CORRECT], [PARTIAL], or [INCORRECT]
    verification_detail: Optional[VerificationResult] = None


# ---------------------------------------------------------------------------
# Marking logic
# ---------------------------------------------------------------------------

def _detect_answer_type(answer: str) -> str:
    """Heuristic to detect the answer type for SymPy verification."""
    answer = answer.strip()

    if "{" in answer and "}" in answer and "," in answer:
        return "set"
    if "=" in answer:
        return "equation"

    # Try to parse as a number
    try:
        float(answer.replace(" ", ""))
        return "numeric"
    except ValueError:
        pass

    return "expression"


async def mark_answer(
    student_answer: str,
    correct_answer: str,
    topic: str,
    skill: str,
) -> MarkingResult:
    """Mark a student's answer using SymPy verification and AI feedback.

    Parameters
    ----------
    student_answer : str
        The student's submitted answer or working.
    correct_answer : str
        The expected correct answer.
    topic : str
        The mathematical topic (e.g., "Linear Equations").
    skill : str
        The specific skill being tested (e.g., "Solve linear equation in one variable").

    Returns
    -------
    MarkingResult
        Contains correctness, score, feedback, and verification details.
    """
    # Step 1: SymPy verification for ground truth
    answer_type = _detect_answer_type(correct_answer)
    sympy_result: VerificationResult | None = None
    sympy_verified = False

    try:
        sympy_result = verify_equivalence(
            student_answer=student_answer,
            correct_answer=correct_answer,
            answer_type=answer_type,
        )
        sympy_verified = sympy_result.error is None
        is_correct = sympy_result.equivalent
    except Exception as exc:
        logger.warning("SymPy verification failed: %s", exc)
        is_correct = student_answer.strip() == correct_answer.strip()

    # Step 2: Get AI feedback via Haiku
    marking_messages = [
        {
            "role": "user",
            "content": (
                f"Topic: {topic}\n"
                f"Skill: {skill}\n"
                f"Correct Answer: {correct_answer}\n"
                f"Student Answer: {student_answer}\n"
                f"SymPy Verification: {'EQUIVALENT' if is_correct else 'NOT EQUIVALENT'}\n\n"
                f"Please mark this student's answer and provide feedback."
            ),
        }
    ]

    ai_feedback = await converse(
        model_id=CLAUDE_HAIKU,
        messages=marking_messages,
        system_prompt=MARKING_SYSTEM_PROMPT,
    )

    # Step 3: Parse the AI tag from feedback
    tag = "[INCORRECT]"
    if "[CORRECT]" in ai_feedback:
        tag = "[CORRECT]"
    elif "[PARTIAL]" in ai_feedback:
        tag = "[PARTIAL]"

    # Step 4: Determine score
    if is_correct:
        score = 1.0
        tag = "[CORRECT]"  # Override AI tag if SymPy says correct
    elif tag == "[PARTIAL]":
        score = 0.5
    else:
        score = 0.0

    # Clean up feedback — remove the tag from the beginning if present
    feedback = ai_feedback.strip()
    for t in ("[CORRECT]", "[PARTIAL]", "[INCORRECT]"):
        feedback = feedback.replace(t, "").strip()

    return MarkingResult(
        correct=is_correct,
        score=score,
        feedback=feedback,
        sympy_verified=sympy_verified,
        tag=tag,
        verification_detail=sympy_result,
    )
