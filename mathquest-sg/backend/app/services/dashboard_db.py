"""AsyncPG connection pool for direct PostgreSQL queries.

Used by the dashboard and WhatsApp routers for read/write operations
against the same Postgres database that Prisma manages.
"""

from __future__ import annotations

import logging
import os
from typing import Any, Optional

import asyncpg
from dotenv import load_dotenv
from pathlib import Path

logger = logging.getLogger(__name__)

_pool: Optional[asyncpg.Pool] = None


async def init_pool() -> None:
    """Initialise the asyncpg connection pool."""
    global _pool
    # Load .env.local from project root (same as Next.js / Prisma)
    env_local = Path(__file__).resolve().parents[3] / ".env.local"
    if env_local.exists():
        load_dotenv(env_local, override=False)

    url = os.getenv(
        "DATABASE_URL",
        "postgresql://mathquest:mathquest_dev@localhost:5433/mathquest",
    )
    # Prisma sometimes uses prisma:// or postgres:// scheme — normalise
    if url.startswith("prisma://"):
        url = url.replace("prisma://", "postgresql://", 1)
    elif url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    try:
        _pool = await asyncpg.create_pool(url, min_size=2, max_size=10)
        logger.info("AsyncPG pool initialised")
    except Exception as e:
        logger.warning(f"AsyncPG pool failed to initialise (dashboard features disabled): {e}")
        _pool = None


async def close_pool() -> None:
    """Gracefully close the connection pool."""
    global _pool
    if _pool:
        await _pool.close()
        _pool = None
        logger.info("AsyncPG pool closed")


async def fetch_all(query: str, *args: Any) -> list[dict]:
    """Run a SELECT and return all rows as dicts."""
    if _pool is None:
        raise RuntimeError("Database pool not available")
    async with _pool.acquire() as conn:
        rows = await conn.fetch(query, *args)
        return [dict(r) for r in rows]


async def fetch_one(query: str, *args: Any) -> Optional[dict]:
    """Run a SELECT and return a single row as a dict (or None)."""
    if _pool is None:
        raise RuntimeError("Database pool not available")
    async with _pool.acquire() as conn:
        row = await conn.fetchrow(query, *args)
        return dict(row) if row else None


async def execute(query: str, *args: Any) -> str:
    """Run an INSERT / UPDATE / DELETE and return the status string."""
    if _pool is None:
        raise RuntimeError("Database pool not available")
    async with _pool.acquire() as conn:
        return await conn.execute(query, *args)
