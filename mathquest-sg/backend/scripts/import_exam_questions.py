#!/usr/bin/env python3
"""
Import exam question bank JSON files into the exam_banks / exam_questions tables.
Skips files already imported (dedup by SHA-256 hash).

Usage:
    python scripts/import_exam_questions.py path/to/file1.json [file2.json ...]
"""

import asyncio
import hashlib
import json
import sys
from pathlib import Path

import asyncpg
from dotenv import load_dotenv
import os

load_dotenv(Path(__file__).parent.parent.parent / ".env.local")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://mathquest:mathquest_dev@localhost:5433/mathquest",
)

# ── Topic ID mapping: source JSON topic_id → DB curriculum_topics.id ──────────
TOPIC_MAP: dict[str, str] = {
    "algebra_basics": "algebra",
    "approx":         "significant-figures",
    "angles":         "geometry-angles",
    "area_perimeter": "perimeter-area",
    "averages":       "statistics",
    "data":           "statistics",
    "integers":       "integers",
    "linear_eq":      "linear-equations",
    "patterns":       "number-patterns",
    "percentage":     "percentage",
    "primes":         "primes-hcf-lcm",
    "quadrilaterals": "polygons",
    "rate_speed":     "ratio-rate-speed",
    "ratio":          "ratio-rate-speed",
    "rational":       "integers",
    "volume":         "volume-surface-area",
    # pass-through (already DB IDs)
    "algebra":             "algebra",
    "significant-figures": "significant-figures",
    "geometry-angles":     "geometry-angles",
    "perimeter-area":      "perimeter-area",
    "statistics":          "statistics",
    "linear-equations":    "linear-equations",
    "number-patterns":     "number-patterns",
    "primes-hcf-lcm":      "primes-hcf-lcm",
    "polygons":            "polygons",
    "ratio-rate-speed":    "ratio-rate-speed",
    "volume-surface-area": "volume-surface-area",
}


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def extract_year(exam_info: dict) -> int | None:
    """Try to extract year from exam name or date fields."""
    for field in ("exam", "date"):
        val = exam_info.get(field, "")
        for part in str(val).split():
            if part.isdigit() and len(part) == 4:
                return int(part)
    return None


def normalise_section(q: dict) -> str | None:
    """Return a consistent section/paper label."""
    if "paper" in q:
        return f"Paper {q['paper']}"
    if "section" in q:
        return f"Section {q['section']}"
    return None


async def import_file(conn: asyncpg.Connection, path: Path) -> None:
    raw = path.read_bytes()
    file_hash = hashlib.sha256(raw).hexdigest()

    # ── Dedup check ────────────────────────────────────────────────────────────
    existing = await conn.fetchval(
        "SELECT id FROM exam_banks WHERE file_hash = $1", file_hash
    )
    if existing:
        print(f"  SKIP {path.name} — already imported (bank id: {existing})")
        return

    data = json.loads(raw)
    info = data["exam_info"]
    questions = data["questions"]

    year = extract_year(info)
    total_marks = info.get("total_marks")

    # ── Insert exam bank ───────────────────────────────────────────────────────
    bank_id = await conn.fetchval(
        """
        INSERT INTO exam_banks (school, exam_name, subject, level, year,
                                file_hash, total_marks, metadata)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        """,
        info["school"],
        info["exam"],
        info["subject"],
        info["level"],
        year,
        file_hash,
        total_marks,
        json.dumps({"sections": info.get("sections", info.get("papers", []))}),
    )
    print(f"  Created exam bank: {info['school']} — {info['exam']} (id: {bank_id})")

    # ── Insert questions ───────────────────────────────────────────────────────
    inserted = skipped = 0
    unmapped_topics: set[str] = set()

    for q in questions:
        raw_topic = q.get("topic_id", "")
        topic_id = TOPIC_MAP.get(raw_topic)

        if not topic_id:
            unmapped_topics.add(raw_topic)
            skipped += 1
            continue

        await conn.execute(
            """
            INSERT INTO exam_questions (
                exam_bank_id, topic_id, source_id, question_number,
                section, marks, difficulty,
                question_text, question_latex,
                answer, answer_latex,
                solution_steps, keywords,
                has_diagram, diagram_description, strand
            ) VALUES (
                $1, $2, $3, $4,
                $5, $6, $7,
                $8, $9,
                $10, $11,
                $12, $13,
                $14, $15, $16
            )
            ON CONFLICT (exam_bank_id, source_id) DO NOTHING
            """,
            bank_id,
            topic_id,
            q["id"],
            str(q.get("question_number", q["id"])),
            normalise_section(q),
            int(q.get("marks", 1)),
            int(q.get("difficulty", 1)),
            q["question_text"],
            q.get("question_latex"),
            q["answer"],
            q.get("answer_latex"),
            json.dumps(q.get("solution_steps", [])),
            json.dumps(q.get("keywords", [])),
            bool(q.get("has_diagram", False)),
            q.get("diagram_description"),
            q.get("strand"),
        )
        inserted += 1

    print(f"  Inserted {inserted} questions, skipped {skipped}")
    if unmapped_topics:
        print(f"  WARNING — unmapped topic IDs (questions skipped): {unmapped_topics}")


async def main(paths: list[Path]) -> None:
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        for path in paths:
            print(f"\nProcessing: {path.name}")
            await import_file(conn, path)
        print("\nDone.")
    finally:
        await conn.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/import_exam_questions.py file1.json [file2.json ...]")
        sys.exit(1)

    file_paths = [Path(p) for p in sys.argv[1:]]
    for p in file_paths:
        if not p.exists():
            print(f"File not found: {p}")
            sys.exit(1)

    asyncio.run(main(file_paths))
