"""FastAPI router for mathematical answer verification."""

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.sympy_verifier import VerificationResult, verify_equivalence

router = APIRouter(tags=["verify"])


class VerifyRequest(BaseModel):
    studentAnswer: str
    correctAnswer: str
    answerType: str  # "numeric" | "expression" | "equation" | "set"


@router.post("/verify", response_model=VerificationResult)
async def verify(req: VerifyRequest) -> VerificationResult:
    """Check whether a student answer is mathematically equivalent to the
    correct answer."""
    return verify_equivalence(
        student_answer=req.studentAnswer,
        correct_answer=req.correctAnswer,
        answer_type=req.answerType,
    )
