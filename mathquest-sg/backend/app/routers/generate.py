"""FastAPI router for AI question generation."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.bedrock_client import BedrockNotConfigured
from app.services.question_generator import (
    GeneratedQuestion,
    generate_batch,
    generate_question,
)

router = APIRouter(prefix="/generate", tags=["generate"])


# ---------------------------------------------------------------------------
# Request models
# ---------------------------------------------------------------------------

class GenerateQuestionRequest(BaseModel):
    topicId: str
    skillId: str
    difficulty: int = Field(default=2, ge=1, le=5)


class GenerateBatchRequest(BaseModel):
    topicId: str
    count: int = Field(default=10, ge=1, le=50)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/question", response_model=GeneratedQuestion)
async def post_generate_question(req: GenerateQuestionRequest) -> GeneratedQuestion:
    """Generate a single AI-created maths question with SymPy verification."""
    try:
        return await generate_question(
            topic_id=req.topicId,
            skill_id=req.skillId,
            difficulty=req.difficulty,
        )
    except BedrockNotConfigured as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))


@router.post("/batch", response_model=list[GeneratedQuestion])
async def post_generate_batch(
    req: GenerateBatchRequest,
) -> list[GeneratedQuestion]:
    """Generate a batch of AI-created maths questions for a topic."""
    try:
        return await generate_batch(
            topic_id=req.topicId,
            count=req.count,
        )
    except BedrockNotConfigured as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
