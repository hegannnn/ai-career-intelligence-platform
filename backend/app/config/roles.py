"""Shared role definitions and salary data used across API modules."""

JOB_ROLES: list[str] = [
    "data scientist",
    "ai engineer",
    "backend developer",
    "frontend developer",
    "ml engineer",
    "devops engineer",
]

JOB_SKILLS: dict[str, list[str]] = {
    "data scientist": [
        "python", "sql", "machine learning", "statistics",
        "pandas", "scikit-learn", "deep learning", "nlp",
    ],
    "ai engineer": [
        "python", "pytorch", "mlops", "docker", "kubernetes",
        "llm engineering", "deep learning", "aws",
    ],
    "backend developer": [
        "python", "fastapi", "postgresql", "docker",
        "rest api", "git", "redis", "aws",
    ],
    "frontend developer": [
        "javascript", "react", "css", "html",
        "typescript", "git", "node", "graphql",
    ],
    "ml engineer": [
        "python", "pytorch", "tensorflow", "mlops",
        "docker", "kubernetes", "aws", "scikit-learn",
    ],
    "devops engineer": [
        "docker", "kubernetes", "aws", "linux",
        "git", "ci/cd", "terraform", "python",
    ],
}

BASE_SALARIES_INR: dict[str, int] = {
    "data scientist": 900_000,
    "ai engineer": 1_100_000,
    "backend developer": 800_000,
    "frontend developer": 750_000,
    "ml engineer": 1_000_000,
    "devops engineer": 850_000,
}

METRO_CITIES: list[str] = [
    "bangalore", "mumbai", "delhi", "hyderabad", "pune", "chennai",
]
