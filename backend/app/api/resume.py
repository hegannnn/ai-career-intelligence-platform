"""Resume analysis and evaluation API."""

import io
from typing import Any

from fastapi import APIRouter, File, Form, UploadFile

from app.config.roles import JOB_SKILLS
from app.services.resume_service import extract_skills, extract_text_from_pdf, score_resume

router = APIRouter()


@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(..., description="PDF resume file"),
    target_role: str = Form("data scientist", description="Role to compare skills against"),
) -> dict[str, Any]:
    """Analyze a PDF resume and extract skills, score, and gaps."""
    contents = await file.read()
    text = extract_text_from_pdf(io.BytesIO(contents))
    skills = extract_skills(text)
    score = score_resume(text, skills)

    required = JOB_SKILLS.get(target_role.lower(), [])
    skills_lower = [s.lower() for s in skills]
    missing = [s for s in required if s not in skills_lower]

    return {
        "score": score,
        "target_role": target_role,
        "skills_found": skills,
        "missing_skills": missing,
        "word_count": len(text.split()),
        "summary": _score_summary(score),
    }


def _score_summary(score: int) -> str:
    """Generate a human-readable summary based on resume score."""
    if score >= 75:
        return "Strong resume — good length, skills, and structure."
    if score >= 50:
        return "Decent resume — add more relevant skills and experience details."
    return "Needs work — expand content, skills, and professional links."
