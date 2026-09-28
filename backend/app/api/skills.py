"""Skill gap analysis API for career development."""

from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.config.roles import JOB_ROLES, JOB_SKILLS

router = APIRouter()


class SkillRequest(BaseModel):
    """Request body for skill gap analysis endpoint."""

    current_skills: list[str] = Field(..., examples=[["python", "sql", "pandas"]])
    target_role: str = Field(..., examples=["data scientist"])


@router.get("/roles")
def list_roles() -> dict[str, list[str]]:
    """Return supported target roles for skill-gap and salary tools."""
    return {"roles": JOB_ROLES}


@router.post("/gap")
def skill_gap(req: SkillRequest) -> dict[str, Any]:
    """Analyze skill gaps and provide learning roadmap for target role."""
    required = JOB_SKILLS.get(req.target_role.lower(), [])
    current_lower = [s.lower().strip() for s in req.current_skills if s.strip()]
    missing = [s for s in required if s not in current_lower]
    match_pct = round((len(required) - len(missing)) / max(len(required), 1) * 100)
    roadmap = [
        {"step": i + 1, "skill": s, "priority": "high" if i < 3 else "medium"}
        for i, s in enumerate(missing)
    ]
    return {
        "target_role": req.target_role,
        "match_percentage": match_pct,
        "skills_matched": len(required) - len(missing),
        "skills_required": len(required),
        "missing_skills": missing,
        "roadmap": roadmap,
    }
