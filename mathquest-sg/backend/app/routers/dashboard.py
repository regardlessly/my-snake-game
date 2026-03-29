"""Dashboard API router for MathQuest SG.

Provides admin and parent-facing dashboard endpoints for monitoring
students, WhatsApp connections, analytics, content, and logs.
"""

from __future__ import annotations

import json
import logging
import os
import string
import random
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, Header, HTTPException, Query
from pydantic import BaseModel

from app.config import settings
from app.services.dashboard_db import execute, fetch_all, fetch_one

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

# ── Path to runtime config ─────────────────────────────────────────────

_CONFIG_PATH = Path(__file__).resolve().parent / "dashboard_config.json"

# ── In-memory token store ──────────────────────────────────────────────

_tokens: dict[str, dict[str, Any]] = {}  # token -> {role, studentId?, expires}


def _generate_token(role: str, student_id: Optional[str] = None) -> str:
    token = f"{role}-{uuid.uuid4().hex}"
    ttl = timedelta(days=30) if role == "parent" else timedelta(hours=24)
    _tokens[token] = {
        "role": role,
        "studentId": student_id,
        "expires": datetime.now(timezone.utc) + ttl,
    }
    return token


def _validate_token(token: str) -> dict[str, Any]:
    info = _tokens.get(token)
    if not info:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    if datetime.now(timezone.utc) > info["expires"]:
        _tokens.pop(token, None)
        raise HTTPException(status_code=401, detail="Token expired")
    return info


# ── Auth dependencies ──────────────────────────────────────────────────


async def get_current_user(
    authorization: Optional[str] = Header(None),
) -> dict[str, Any]:
    """Validate the Bearer token and return user info."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    token = authorization.removeprefix("Bearer ").strip()
    return _validate_token(token)


async def require_admin(
    user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


async def require_parent(
    user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    if user["role"] != "parent":
        raise HTTPException(status_code=403, detail="Parent access required")
    if not user.get("studentId"):
        raise HTTPException(status_code=403, detail="No student linked to parent token")
    return user


# ═══════════════════════════════════════════════════════════════════════
# Auth
# ═══════════════════════════════════════════════════════════════════════


class AdminAuthRequest(BaseModel):
    pin: str


class ParentAuthRequest(BaseModel):
    parentCode: str


@router.post("/auth/admin")
async def auth_admin(body: AdminAuthRequest):
    """Verify admin PIN and return a session token."""
    expected = settings.admin_pin
    if body.pin != expected:
        raise HTTPException(status_code=401, detail="Invalid PIN")
    token = _generate_token("admin")
    return {"token": token, "role": "admin"}


@router.post("/auth/parent")
async def auth_parent(body: ParentAuthRequest):
    """Verify parent code against whatsapp_students and return a session token."""
    row = await fetch_one(
        "SELECT id, display_name, user_id FROM whatsapp_students WHERE parent_code = $1",
        body.parentCode,
    )
    if not row:
        raise HTTPException(status_code=401, detail="Invalid parent code")
    token = _generate_token("parent", student_id=row["id"])
    return {
        "token": token,
        "role": "parent",
        "studentId": row["id"],
        "studentName": row["display_name"],
    }


# ═══════════════════════════════════════════════════════════════════════
# Admin - Overview
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/overview")
async def admin_overview(_user: dict = Depends(require_admin)):
    """Dashboard overview stats."""
    total_students = await fetch_one("SELECT COUNT(*) AS cnt FROM whatsapp_students")
    total_questions = await fetch_one("SELECT COUNT(*) AS cnt FROM questions")

    try:
        questions_today = await fetch_one(
            """SELECT COUNT(*) AS cnt FROM xp_events
               WHERE "eventType" IN ('QUESTION_CORRECT','QUESTION_INCORRECT')
               AND "createdAt" >= CURRENT_DATE"""
        )
    except Exception:
        questions_today = {"cnt": 0}

    active_topics = await fetch_one(
        "SELECT COUNT(DISTINCT id) AS cnt FROM curriculum_topics"
    )

    try:
        daily_stats = await fetch_all(
            "SELECT * FROM daily_usage_stats WHERE date >= CURRENT_DATE - INTERVAL '7 days' ORDER BY date"
        )
    except Exception:
        daily_stats = []

    return {
        "totalStudents": (total_students or {}).get("cnt", 0),
        "totalQuestions": (total_questions or {}).get("cnt", 0),
        "questionsToday": (questions_today or {}).get("cnt", 0),
        "activeTopics": (active_topics or {}).get("cnt", 0),
        "dailyStats": daily_stats,
    }


# ═══════════════════════════════════════════════════════════════════════
# Admin - WhatsApp connection
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/whatsapp/status")
async def whatsapp_status(_user: dict = Depends(require_admin)):
    """Proxy WhatsApp bridge status."""
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(f"{settings.whatsapp_bridge_url}/status")
            return resp.json()
    except httpx.HTTPError as exc:
        return {"connected": False, "error": str(exc)}


@router.post("/admin/whatsapp/reconnect")
async def whatsapp_reconnect(_user: dict = Depends(require_admin)):
    """Proxy WhatsApp bridge reconnect."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(f"{settings.whatsapp_bridge_url}/reconnect")
            return resp.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Bridge unreachable: {exc}")


# ═══════════════════════════════════════════════════════════════════════
# Admin - Students
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/students")
async def list_students(
    status: str = Query("all"),
    _user: dict = Depends(require_admin),
):
    """List WhatsApp students with optional status filter."""
    if status == "all":
        rows = await fetch_all(
            """
            SELECT ws.*, u.email, u."displayName" AS user_display_name, u."totalXp" AS total_xp
            FROM whatsapp_students ws
            LEFT JOIN users u ON ws.user_id = u.id
            ORDER BY ws.created_at DESC
            """
        )
    else:
        rows = await fetch_all(
            """
            SELECT ws.*, u.email, u."displayName" AS user_display_name, u."totalXp" AS total_xp
            FROM whatsapp_students ws
            LEFT JOIN users u ON ws.user_id = u.id
            WHERE ws.status = $1
            ORDER BY ws.created_at DESC
            """,
            status,
        )
    return {"students": rows}


def _generate_parent_code(length: int = 6) -> str:
    chars = string.ascii_uppercase + string.digits
    return "".join(random.choices(chars, k=length))


@router.put("/admin/students/{student_id}/approve")
async def approve_student(student_id: str, _user: dict = Depends(require_admin)):
    """Approve a pending WhatsApp student and generate a parent code."""
    parent_code = _generate_parent_code()
    result = await execute(
        """
        UPDATE whatsapp_students
        SET status = 'approved', parent_code = $1, updated_at = now()
        WHERE id = $2 AND status = 'pending'
        """,
        parent_code,
        student_id,
    )
    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="Student not found or not pending")
    return {"ok": True, "parentCode": parent_code}


@router.put("/admin/students/{student_id}/deny")
async def deny_student(student_id: str, _user: dict = Depends(require_admin)):
    """Deny a pending WhatsApp student."""
    result = await execute(
        """
        UPDATE whatsapp_students
        SET status = 'denied', updated_at = now()
        WHERE id = $1
        """,
        student_id,
    )
    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="Student not found")
    return {"ok": True}


class LinkStudentRequest(BaseModel):
    userId: str


@router.put("/admin/students/{student_id}/link")
async def link_student(
    student_id: str,
    body: LinkStudentRequest,
    _user: dict = Depends(require_admin),
):
    """Link a WhatsApp student to a web-app User."""
    result = await execute(
        """
        UPDATE whatsapp_students
        SET user_id = $1, updated_at = now()
        WHERE id = $2
        """,
        body.userId,
        student_id,
    )
    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="Student not found")
    return {"ok": True}


@router.delete("/admin/students/{student_id}")
async def delete_student(student_id: str, _user: dict = Depends(require_admin)):
    """Remove a WhatsApp student record."""
    # Delete dependent bot_conversations first
    await execute("DELETE FROM bot_conversations WHERE wa_student_id = $1", student_id)
    await execute("DELETE FROM guardrail_logs WHERE wa_student_id = $1", student_id)
    result = await execute("DELETE FROM whatsapp_students WHERE id = $1", student_id)
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Student not found")
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════
# Admin - LLM Settings
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/llm-config")
async def get_llm_config(_user: dict = Depends(require_admin)):
    """Read runtime LLM configuration."""
    try:
        data = json.loads(_CONFIG_PATH.read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        data = {
            "modelId": "amazon.nova-lite-v1:0",
            "region": "us-east-1",
            "temperature": 0.7,
            "maxTokens": 2048,
            "guardrailEnabled": True,
            "systemPromptOverride": None,
        }
    return data


class LLMConfigUpdate(BaseModel):
    modelId: str = "amazon.nova-lite-v1:0"
    region: str = "us-east-1"
    temperature: float = 0.7
    maxTokens: int = 2048
    guardrailEnabled: bool = True
    systemPromptOverride: Optional[str] = None


@router.put("/admin/llm-config")
async def update_llm_config(
    body: LLMConfigUpdate,
    _user: dict = Depends(require_admin),
):
    """Update runtime LLM configuration."""
    data = body.model_dump()
    _CONFIG_PATH.write_text(json.dumps(data, indent=2) + "\n")
    return {"ok": True, **data}


# ═══════════════════════════════════════════════════════════════════════
# Admin - Content
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/content/topics")
async def list_topics(_user: dict = Depends(require_admin)):
    """List curriculum topics with question counts per skill."""
    rows = await fetch_all(
        """
        SELECT ct.id, ct.name, ct.strand, ct.term, ct.chapter,
               ct."totalSkills" AS total_skills, ct."displayOrder" AS display_order,
               COUNT(q.id) AS question_count
        FROM curriculum_topics ct
        LEFT JOIN questions q ON q."topicId" = ct.id
        GROUP BY ct.id, ct.name, ct.strand, ct.term, ct.chapter,
                 ct."totalSkills", ct."displayOrder"
        ORDER BY ct."displayOrder"
        """
    )
    return {"topics": rows}


@router.get("/admin/content/topics/{topic_id}/questions")
async def list_topic_questions(
    topic_id: str,
    skill_id: Optional[str] = Query(None, alias="skillId"),
    difficulty: Optional[int] = Query(None),
    _user: dict = Depends(require_admin),
):
    """List questions for a topic with optional filters."""
    conditions = ["""q."topicId" = $1"""]
    args: list[Any] = [topic_id]
    idx = 2

    if skill_id:
        conditions.append(f"""q."skillId" = ${idx}""")
        args.append(skill_id)
        idx += 1
    if difficulty is not None:
        conditions.append(f"q.difficulty = ${idx}")
        args.append(difficulty)
        idx += 1

    where = " AND ".join(conditions)
    rows = await fetch_all(
        f"""
        SELECT q.* FROM questions q
        WHERE {where}
        ORDER BY q.difficulty, q."createdAt" DESC
        """,
        *args,
    )
    return {"questions": rows}


# ═══════════════════════════════════════════════════════════════════════
# Admin - Logs
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/logs/conversations")
async def list_conversations_log(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: str = Query(""),
    _user: dict = Depends(require_admin),
):
    """Paginated bot conversation logs."""
    offset = (page - 1) * limit

    if search:
        rows = await fetch_all(
            """
            SELECT bc.*, ws.phone_number, ws.display_name
            FROM bot_conversations bc
            JOIN whatsapp_students ws ON bc.wa_student_id = ws.id
            WHERE ws.display_name ILIKE $1 OR ws.phone_number ILIKE $1
            ORDER BY bc.created_at DESC
            LIMIT $2 OFFSET $3
            """,
            f"%{search}%",
            limit,
            offset,
        )
        total = await fetch_one(
            """
            SELECT COUNT(*) AS cnt FROM bot_conversations bc
            JOIN whatsapp_students ws ON bc.wa_student_id = ws.id
            WHERE ws.display_name ILIKE $1 OR ws.phone_number ILIKE $1
            """,
            f"%{search}%",
        )
    else:
        rows = await fetch_all(
            """
            SELECT bc.*, ws.phone_number, ws.display_name
            FROM bot_conversations bc
            JOIN whatsapp_students ws ON bc.wa_student_id = ws.id
            ORDER BY bc.created_at DESC
            LIMIT $1 OFFSET $2
            """,
            limit,
            offset,
        )
        total = await fetch_one("SELECT COUNT(*) AS cnt FROM bot_conversations")

    return {
        "conversations": rows,
        "total": (total or {}).get("cnt", 0),
        "page": page,
        "limit": limit,
    }


@router.get("/admin/logs/guardrails")
async def list_guardrail_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    _user: dict = Depends(require_admin),
):
    """Paginated guardrail block logs."""
    offset = (page - 1) * limit
    rows = await fetch_all(
        """
        SELECT gl.*, ws.display_name, ws.phone_number
        FROM guardrail_logs gl
        LEFT JOIN whatsapp_students ws ON gl.wa_student_id = ws.id
        ORDER BY gl.created_at DESC
        LIMIT $1 OFFSET $2
        """,
        limit,
        offset,
    )
    total = await fetch_one("SELECT COUNT(*) AS cnt FROM guardrail_logs")
    return {
        "logs": rows,
        "total": (total or {}).get("cnt", 0),
        "page": page,
        "limit": limit,
    }


@router.get("/admin/logs/errors")
async def list_error_logs(_user: dict = Depends(require_admin)):
    """Return recent error log lines (best-effort)."""
    log_path = Path(__file__).resolve().parent.parent / "logs" / "error.log"
    if not log_path.exists():
        return {"lines": [], "file": str(log_path)}
    try:
        lines = log_path.read_text().splitlines()[-200:]
    except Exception:
        lines = []
    return {"lines": lines, "file": str(log_path)}


# ═══════════════════════════════════════════════════════════════════════
# Admin - Analytics
# ═══════════════════════════════════════════════════════════════════════


@router.get("/admin/analytics/usage")
async def analytics_usage(
    days: int = Query(7, ge=1, le=90),
    _user: dict = Depends(require_admin),
):
    """Daily usage statistics for the requested period."""
    rows = await fetch_all(
        f"SELECT * FROM daily_usage_stats WHERE date >= CURRENT_DATE - INTERVAL '{int(days)} days' ORDER BY date"
    )
    return {"stats": rows}


@router.get("/admin/analytics/popular-topics")
async def analytics_popular_topics(_user: dict = Depends(require_admin)):
    """Most-practised topics by attempt count."""
    rows = await fetch_all(
        """
        SELECT usp."topicId" AS topic_id, ct.name AS topic_name,
               SUM(usp."totalAttempts") AS attempt_count
        FROM user_skill_progress usp
        JOIN curriculum_topics ct ON ct.id = usp."topicId"
        GROUP BY usp."topicId", ct.name
        ORDER BY attempt_count DESC
        LIMIT 20
        """
    )
    return {"topics": rows}


# ═══════════════════════════════════════════════════════════════════════
# Parent endpoints
# ═══════════════════════════════════════════════════════════════════════


@router.get("/parent/summary")
async def parent_summary(user: dict = Depends(require_parent)):
    """Summary for a parent: mastery, XP, streak, recent activity."""
    sid = user["studentId"]

    # Get linked user_id (if any)
    student = await fetch_one(
        "SELECT user_id FROM whatsapp_students WHERE id = $1", sid
    )
    uid = (student or {}).get("user_id")

    mastery = []
    xp_data: dict[str, Any] = {"totalXp": 0, "streakDays": 0}
    recent: list[dict] = []

    if uid:
        mastery = await fetch_all(
            """
            SELECT "topicId" AS topic_id, "skillId" AS skill_id, status,
                   "masteryProbability" AS mastery_probability,
                   "accuracyRate" AS accuracy_rate
            FROM user_skill_progress
            WHERE "userId" = $1
            ORDER BY "updatedAt" DESC
            """,
            uid,
        )
        xp_row = await fetch_one(
            """SELECT "totalXp", "streakDays" FROM users WHERE id = $1""", uid
        )
        if xp_row:
            xp_data = {"totalXp": xp_row["totalXp"], "streakDays": xp_row["streakDays"]}

        recent = await fetch_all(
            """
            SELECT xe.id, xe."eventType", xe."xpAmount", xe.metadata,
                   xe."createdAt" AS created_at
            FROM xp_events xe
            WHERE xe."userId" = $1
            ORDER BY xe."createdAt" DESC
            LIMIT 10
            """,
            uid,
        )

    return {
        "mastery": mastery,
        "xp": xp_data,
        "recentActivity": recent,
    }


@router.get("/parent/topics")
async def parent_topics(user: dict = Depends(require_parent)):
    """Per-topic skill breakdown with mastery percentages."""
    sid = user["studentId"]
    student = await fetch_one(
        "SELECT user_id FROM whatsapp_students WHERE id = $1", sid
    )
    uid = (student or {}).get("user_id")
    if not uid:
        return {"topics": []}

    rows = await fetch_all(
        """
        SELECT usp."topicId" AS topic_id, ct.name AS topic_name,
               usp."skillId" AS skill_id, usp.status,
               usp."masteryProbability" AS mastery_probability,
               usp."accuracyRate" AS accuracy_rate
        FROM user_skill_progress usp
        JOIN curriculum_topics ct ON ct.id = usp."topicId"
        WHERE usp."userId" = $1
        ORDER BY ct."displayOrder", usp."skillId"
        """,
        uid,
    )
    return {"topics": rows}


@router.get("/parent/activity")
async def parent_activity(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    user: dict = Depends(require_parent),
):
    """Paginated recent question attempts."""
    sid = user["studentId"]
    student = await fetch_one(
        "SELECT user_id FROM whatsapp_students WHERE id = $1", sid
    )
    uid = (student or {}).get("user_id")
    if not uid:
        return {"activity": [], "total": 0, "page": page, "limit": limit}

    offset = (page - 1) * limit
    rows = await fetch_all(
        """
        SELECT xe.id, xe."eventType", xe."xpAmount", xe.metadata,
               xe."createdAt" AS created_at
        FROM xp_events xe
        WHERE xe."userId" = $1
        ORDER BY xe."createdAt" DESC
        LIMIT $2 OFFSET $3
        """,
        uid,
        limit,
        offset,
    )
    total = await fetch_one(
        """SELECT COUNT(*) AS cnt FROM xp_events WHERE "userId" = $1""",
        uid,
    )
    return {
        "activity": rows,
        "total": (total or {}).get("cnt", 0),
        "page": page,
        "limit": limit,
    }


@router.get("/parent/conversations")
async def parent_conversations(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    user: dict = Depends(require_parent),
):
    """Bot and web conversations for this student."""
    sid = user["studentId"]
    student = await fetch_one(
        "SELECT user_id FROM whatsapp_students WHERE id = $1", sid
    )
    uid = (student or {}).get("user_id")
    offset = (page - 1) * limit

    # WhatsApp bot conversations
    bot_convos = await fetch_all(
        """
        SELECT id, topic_id, messages, token_count, model_used,
               created_at, updated_at, 'whatsapp' AS source
        FROM bot_conversations
        WHERE wa_student_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
        """,
        sid,
        limit,
        offset,
    )

    # Web conversations (if linked)
    web_convos: list[dict] = []
    if uid:
        web_convos = await fetch_all(
            """
            SELECT id, "topicId" AS topic_id, messages, "createdAt" AS created_at,
                   "updatedAt" AS updated_at, 'web' AS source
            FROM conversations
            WHERE "userId" = $1
            ORDER BY "createdAt" DESC
            LIMIT $2 OFFSET $3
            """,
            uid,
            limit,
            offset,
        )

    # Merge and sort by created_at descending
    all_convos = sorted(
        bot_convos + web_convos,
        key=lambda c: c.get("created_at", datetime.min),
        reverse=True,
    )[:limit]

    return {"conversations": all_convos, "page": page, "limit": limit}


@router.get("/parent/conversations/{convo_id}")
async def parent_conversation_detail(
    convo_id: str,
    user: dict = Depends(require_parent),
):
    """Full messages for a single conversation."""
    sid = user["studentId"]
    student = await fetch_one(
        "SELECT user_id FROM whatsapp_students WHERE id = $1", sid
    )
    uid = (student or {}).get("user_id")

    # Try bot_conversations first
    row = await fetch_one(
        "SELECT * FROM bot_conversations WHERE id = $1 AND wa_student_id = $2",
        convo_id,
        sid,
    )
    if row:
        return {"conversation": row, "source": "whatsapp"}

    # Try web conversations
    if uid:
        row = await fetch_one(
            """SELECT * FROM conversations WHERE id = $1 AND "userId" = $2""",
            convo_id,
            uid,
        )
        if row:
            return {"conversation": row, "source": "web"}

    raise HTTPException(status_code=404, detail="Conversation not found")


@router.get("/parent/settings")
async def parent_settings(user: dict = Depends(require_parent)):
    """Read parent settings from whatsapp_students.settings JSONB."""
    sid = user["studentId"]
    row = await fetch_one(
        "SELECT settings FROM whatsapp_students WHERE id = $1", sid
    )
    return {"settings": (row or {}).get("settings", {})}


class ParentSettingsUpdate(BaseModel):
    dailyGoal: Optional[int] = None
    notifications: Optional[bool] = None
    reminderTime: Optional[str] = None


@router.put("/parent/settings")
async def update_parent_settings(
    body: ParentSettingsUpdate,
    user: dict = Depends(require_parent),
):
    """Update parent settings in whatsapp_students.settings JSONB."""
    sid = user["studentId"]
    new_settings = body.model_dump(exclude_none=True)
    await execute(
        """
        UPDATE whatsapp_students
        SET settings = settings || $1::jsonb, updated_at = now()
        WHERE id = $2
        """,
        json.dumps(new_settings),
        sid,
    )
    return {"ok": True, "settings": new_settings}
