"""Resume processing and scoring utilities."""

import io
import re
from typing import BinaryIO

import pdfplumber

SKILL_KEYWORDS = [
    "python", "javascript", "react", "node", "fastapi", "django", "sql",
    "postgresql", "mongodb", "docker", "kubernetes", "aws", "azure", "gcp",
    "machine learning", "deep learning", "pytorch", "tensorflow",
    "scikit-learn", "pandas", "numpy", "git", "linux", "rest api",
    "graphql", "nlp", "data science", "mlops",
]


def extract_text_from_pdf(file_bytes: BinaryIO) -> str:
    """Extract text from a PDF file."""
    with pdfplumber.open(file_bytes) as pdf:
        return " ".join(page.extract_text() or "" for page in pdf.pages)


def extract_skills(text: str) -> list[str]:
    """Extract known skills from text."""
    text_lower = text.lower()
    return [s for s in SKILL_KEYWORDS if s in text_lower]


def score_resume(text: str, skills: list[str]) -> int:
    """
    Score a resume based on length, skills, experience, and professional presence.

    Returns a score from 0-100.
    """
    score = 40
    if len(text) > 500:
        score += 10
    score += min(len(skills) * 3, 30)
    if re.search(r'\d+\s*(years?|yrs?)', text, re.IGNORECASE):
        score += 10
    if re.search(r'github|linkedin|portfolio', text, re.IGNORECASE):
        score += 10
    return min(score, 100)