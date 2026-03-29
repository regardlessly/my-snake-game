"""AWS Bedrock client wrapper for Claude/Nova model invocations."""

from __future__ import annotations

import asyncio
import logging
from collections.abc import AsyncGenerator
from typing import Any

import boto3
from botocore.exceptions import BotoCoreError, ClientError, NoCredentialsError, NoRegionError

from app.config import settings

logger = logging.getLogger(__name__)

_client = None


class BedrockNotConfigured(Exception):
    """Raised when AWS credentials are missing or Bedrock is unreachable."""


def _get_client():
    """Lazy-initialise the Bedrock Runtime client."""
    global _client
    if _client is not None:
        return _client

    if not settings.aws_access_key_id or not settings.aws_secret_access_key:
        raise BedrockNotConfigured(
            "AWS credentials not configured. Set AWS_ACCESS_KEY_ID and "
            "AWS_SECRET_ACCESS_KEY in your environment or .env.local file."
        )

    try:
        _client = boto3.client(
            "bedrock-runtime",
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
        )
    except (NoCredentialsError, NoRegionError) as exc:
        raise BedrockNotConfigured(
            f"AWS credentials or region not configured: {exc}. "
            "Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION "
            "in your environment or .env.local file."
        ) from exc
    return _client


def reset_client() -> None:
    """Reset the cached client (useful for tests or credential rotation)."""
    global _client
    _client = None


def _format_messages(messages: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Normalise simple {role, content} messages to Bedrock Converse format."""
    formatted = []
    for msg in messages:
        content = msg.get("content", "")
        if isinstance(content, str):
            formatted.append({"role": msg["role"], "content": [{"text": content}]})
        else:
            formatted.append(msg)
    return formatted


async def converse(
    model_id: str,
    messages: list[dict[str, Any]],
    system_prompt: str | None = None,
) -> str:
    """Call the Bedrock Converse API (async wrapper around sync boto3).

    Returns the full assistant text response.
    """
    try:
        client = _get_client()
    except BedrockNotConfigured as exc:
        return f"[Error] {exc}"
    formatted = _format_messages(messages)

    kwargs: dict[str, Any] = {
        "modelId": model_id,
        "messages": formatted,
    }
    if system_prompt:
        kwargs["system"] = [{"text": system_prompt}]

    try:
        response = await asyncio.to_thread(client.converse, **kwargs)
    except (BotoCoreError, ClientError) as exc:
        logger.error("Bedrock converse call failed: %s", exc)
        return f"[Error] AI model request failed: {exc}"

    output = response.get("output", {})
    message = output.get("message", {})
    content_blocks = message.get("content", [])
    texts = [block["text"] for block in content_blocks if "text" in block]
    return "\n".join(texts)


async def stream_converse(
    model_id: str,
    messages: list[dict[str, Any]],
    system_prompt: str | None = None,
) -> AsyncGenerator[str, None]:
    """Stream a response from the Bedrock ConverseStream API.

    Yields text chunks as they arrive.
    """
    try:
        client = _get_client()
    except BedrockNotConfigured as exc:
        yield f"[Error] {exc}"
        return
    formatted = _format_messages(messages)

    kwargs: dict[str, Any] = {
        "modelId": model_id,
        "messages": formatted,
    }
    if system_prompt:
        kwargs["system"] = [{"text": system_prompt}]

    try:
        response = await asyncio.to_thread(client.converse_stream, **kwargs)
    except (BotoCoreError, ClientError) as exc:
        logger.error("Bedrock converse_stream call failed: %s", exc)
        yield f"Error connecting to AI service: {exc}"
        return

    event_stream = response.get("stream", [])
    for event in event_stream:
        if "contentBlockDelta" in event:
            delta = event["contentBlockDelta"].get("delta", {})
            text = delta.get("text", "")
            if text:
                yield text
