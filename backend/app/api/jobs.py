"""Job matching API using semantic similarity."""

from typing import Any, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

_model: Optional[SentenceTransformer] = None


def _get_model() -> SentenceTransformer:
    """Lazy-load and cache the sentence transformer model."""
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


class MatchRequest(BaseModel):
    """Request body for job matching endpoint."""

    resume_text: str = Field(..., min_length=50, description="Resume text or summary")
    job_description: str = Field(..., min_length=50, description="Job posting text")


@router.post("/match")
def job_match(req: MatchRequest) -> dict[str, Any]:
    """Match a resume against a job description using semantic similarity."""
    model = _get_model()
    emb = model.encode([req.resume_text, req.job_description])
    score = round(float(cosine_similarity([emb[0]], [emb[1]])[0][0]) * 100, 1)

    if score > 75:
        verdict = "Strong match"
        advice = "Your profile aligns well with this role. Tailor your cover letter to highlight top matches."
    elif score > 50:
        verdict = "Moderate match"
        advice = "Some overlap exists. Address missing keywords from the job description in your resume."
    else:
        verdict = "Needs improvement"
        advice = "Consider upskilling on key requirements or targeting roles closer to your background."

    return {
        "match_score": score,
        "verdict": verdict,
        "advice": advice,
        "model": "all-MiniLM-L6-v2",
    }
