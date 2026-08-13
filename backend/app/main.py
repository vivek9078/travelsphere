"""
TravelSphere AI backend — FastAPI application.

Phase 1 scope: backend foundation only.
- Basic FastAPI app with CORS configured for the Next.js frontend.
- A single GET /api/health endpoint that reports API + MongoDB status.

No other routes, models, or business logic are implemented yet.
"""

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import check_connection

app = FastAPI(title="TravelSphere AI Backend")

# Allow the existing Next.js frontend (and any other configured origins)
# to call this API. No frontend code is wired up to these routes yet —
# this just makes future integration possible without further backend
# changes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    """
    Report whether the API is running and whether MongoDB is reachable.

    Always returns 200 with status "ok" for the API itself; the database
    field reflects the actual MongoDB connectivity so a down database
    never crashes or 500s this endpoint.
    """
    db_connected = check_connection()

    payload = {
        "status": "ok",
        "database": "connected" if db_connected else "disconnected",
    }

    if not db_connected:
        # Still respond (don't crash), but signal via HTTP status that
        # something is wrong with the database dependency.
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content=payload)

    return payload
