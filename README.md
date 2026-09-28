# AI Career Intelligence Platform

A full-stack career assistant that helps students and job seekers understand their profile in four simple steps.

## What it does (30-second pitch)

| Step | Feature | What happens |
|------|---------|--------------|
| 1 | **Resume Analyzer** | Upload a PDF → extract skills and get a resume score |
| 2 | **Skill Gap** | Compare your skills to a target role → see what to learn next |
| 3 | **Salary Estimator** | Enter role, experience, and city → estimated salary range (INR) |
| 4 | **Job Matcher** | Paste resume + job description → semantic match score (ML) |

```
┌─────────────┐     HTTP      ┌──────────────────────────────────────┐
│  React UI   │ ────────────► │  FastAPI (port 8000)                 │
│  port 3000  │               │  • Resume  → PDF + keyword skills    │
└─────────────┘               │  • Skills  → role skill maps         │
                              │  • Salary  → experience formula      │
                              │  • Jobs    → SentenceTransformer ML  │
                              └──────────────────────────────────────┘
```

## Quick start

### 1. Backend (Python 3.10+)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 2. Frontend (Node 18+)

```powershell
cd frontend
npm install
npm start
```

Open http://localhost:3000

## Project structure

```
├── backend/app/
│   ├── main.py              # FastAPI entry + CORS
│   ├── api/                 # One file per feature
│   ├── services/            # Resume PDF parsing logic
│   └── config/roles.py      # Shared roles & skill maps
├── frontend/src/
│   ├── features/            # One component per feature
│   ├── components/          # Shared UI (layout, cards, alerts)
│   └── api/client.ts        # Axios + error handling
└── README.md
```

## Tech stack

- **Frontend:** React 18, TypeScript, Vite
- **Backend:** FastAPI, pdfplumber, sentence-transformers, scikit-learn

## Honest scope (for presentations)

- Resume scoring and salary use **rules and lookup tables** — fast and explainable.
- Job matching uses **sentence embeddings** (`all-MiniLM-L6-v2`) — the main ML/NLP piece.
- First job-match request may take ~30s while the model downloads.

## License

Academic / portfolio use — MITS project.
