# TravelSphere AI — Backend (Phase 1)

FastAPI + MongoDB backend foundation. This phase only sets up the backend
skeleton and a health check endpoint — no application features yet, and
the existing Next.js frontend is untouched.

## Structure

```
backend/
├── app/
│   ├── main.py       # FastAPI app, CORS, /api/health
│   ├── config.py     # Settings loaded from environment variables
│   └── database.py   # Reusable MongoDB connection
├── requirements.txt
├── .env.example
└── .gitignore
```

## Setup

1. Create a virtual environment and install dependencies:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Create your local `.env` from the example and fill in real values:

   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `MONGODB_URI` — your MongoDB connection string
   - `DATABASE_NAME` — the database to use
   - `CORS_ORIGINS` — comma-separated origins allowed to call this API (defaults to `http://localhost:3000`)

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

## Verify

```bash
curl http://localhost:8000/api/health
```

Returns `{"status": "ok", "database": "connected"}` when MongoDB is
reachable, or a 503 with `"database": "disconnected"` if it isn't — the
API itself will not crash either way.
