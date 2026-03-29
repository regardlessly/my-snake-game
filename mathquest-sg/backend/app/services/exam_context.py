"""Retrieve exam questions to enrich LLM context for a given topic."""

from __future__ import annotations

import json
import logging

from app.services.dashboard_db import fetch_all

logger = logging.getLogger(__name__)

# Max exam questions to inject per topic (keeps prompt size reasonable)
MAX_QUESTIONS = 4


async def get_exam_context(topic_id: str | None) -> str | None:
    """Return formatted exam questions for *topic_id*, or None if unavailable.

    The returned string is appended to the system prompt so the LLM can
    reference real past-exam questions when tutoring on this topic.
    """
    if not topic_id:
        return None

    try:
        rows = await fetch_all(
            """
            SELECT eq.source_id, eq.question_number, eq.section,
                   eq.question_text, eq.answer, eq.answer_latex,
                   eq.solution_steps, eq.marks, eq.difficulty,
                   eq.has_diagram, eq.diagram_description,
                   eb.school, eb.exam_name, eb.level
            FROM exam_questions eq
            JOIN exam_banks eb ON eb.id = eq.exam_bank_id
            WHERE eq.topic_id = $1
            ORDER BY eq.difficulty ASC, random()
            LIMIT $2
            """,
            topic_id,
            MAX_QUESTIONS,
        )
    except Exception as exc:
        logger.warning("Failed to fetch exam context for topic %s: %s", topic_id, exc)
        return None

    if not rows:
        return None

    lines: list[str] = [
        "## Past Exam Questions (for reference when tutoring on this topic)",
        "Use these questions to guide your tutoring. You may present them to the student",
        "or use them to inform hints and worked examples. Do NOT simply give away answers.",
        "",
    ]

    for i, r in enumerate(rows, 1):
        steps = json.loads(r["solution_steps"]) if isinstance(r["solution_steps"], str) else r["solution_steps"]
        source = f"{r['school']} {r['exam_name']}"
        section = f"{r['section']} Q{r['question_number']}" if r["section"] else f"Q{r['question_number']}"
        marks_str = f"[{r['marks']} mark{'s' if r['marks'] > 1 else ''}]"
        diff_str = ["", "Easy", "Medium", "Hard", "Challenging"][min(r["difficulty"], 4)]

        lines.append(f"### Question {i} — {source} | {section} {marks_str} | {diff_str}")
        lines.append(r["question_text"])

        if r["has_diagram"] and r["diagram_description"]:
            lines.append(f"*[Diagram: {r['diagram_description']}]*")

        lines.append(f"\n**Model Answer:** {r['answer']}")

        if steps:
            lines.append("**Solution Steps:**")
            for step in steps:
                lines.append(f"  - {step}")

        lines.append("")

    return "\n".join(lines)
