from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Optional

from .config import settings

logger = logging.getLogger(__name__)

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS cth_escalation_calls (
    call_id        UUID,
    room_name      String,
    centre_id      UInt32,
    member_id      UInt32,
    staff_id       Nullable(UInt32),
    trigger_type   Enum8('voice'=1, 'button'=2, 'ai_auto'=3),
    ai_summary     String,
    risk_tier      Enum8('R1'=1, 'R2'=2, 'R3'=3, 'R4'=4),
    outcome        Enum8('connected'=1, 'timeout'=2, 'cancelled'=3),
    wait_seconds   UInt16,
    call_seconds   UInt16,
    language       String,
    created_at     DateTime64(3),
    connected_at   Nullable(DateTime64(3)),
    ended_at       Nullable(DateTime64(3))
) ENGINE = MergeTree()
ORDER BY (centre_id, created_at)
"""

TRIGGER_MAP = {"voice": "voice", "button": "button", "ai_auto": "ai_auto"}


def _get_client():
    try:
        import clickhouse_connect

        return clickhouse_connect.get_client(
            host=settings.clickhouse_host,
            port=settings.clickhouse_port,
            database=settings.clickhouse_database,
        )
    except Exception:
        logger.warning("ClickHouse not available — logging disabled")
        return None


async def ensure_table():
    client = _get_client()
    if client:
        try:
            client.command(CREATE_TABLE_SQL)
            logger.info("ClickHouse table cth_escalation_calls ensured")
        except Exception:
            logger.exception("Failed to create ClickHouse table")
        finally:
            client.close()


async def log_escalation_event(
    call_id: str,
    room_name: str,
    centre_id: int,
    member_id: int,
    trigger_type: str,
    ai_summary: str,
    risk_tier: str,
    outcome: str,
    wait_seconds: int,
    call_seconds: int,
    language: str,
    created_at: datetime,
    connected_at: Optional[datetime] = None,
    ended_at: Optional[datetime] = None,
    staff_id: Optional[int] = None,
):
    client = _get_client()
    if not client:
        logger.info(
            f"[local log] escalation call_id={call_id} room={room_name} "
            f"outcome={outcome} wait={wait_seconds}s call={call_seconds}s"
        )
        return

    try:
        now = datetime.now(timezone.utc)
        client.insert(
            "cth_escalation_calls",
            [[
                call_id,
                room_name,
                centre_id,
                member_id,
                staff_id,
                TRIGGER_MAP.get(trigger_type, "button"),
                ai_summary,
                risk_tier or "R1",
                outcome,
                wait_seconds,
                call_seconds,
                language,
                created_at,
                connected_at,
                ended_at or now,
            ]],
            column_names=[
                "call_id", "room_name", "centre_id", "member_id", "staff_id",
                "trigger_type", "ai_summary", "risk_tier", "outcome",
                "wait_seconds", "call_seconds", "language",
                "created_at", "connected_at", "ended_at",
            ],
        )
        logger.info(f"Logged escalation {call_id} to ClickHouse")
    except Exception:
        logger.exception("Failed to log to ClickHouse")
    finally:
        client.close()
