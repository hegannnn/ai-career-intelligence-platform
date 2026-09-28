from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import resume, skills, jobs

app = FastAPI(title="AI Career Intelligence Platform", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])

@app.get("/")
def root():
    return {"message": "AI Career Intelligence Platform API", "status": "running"}