"""
TravelSphere AI backend — FastAPI application.

Phase 1 scope: backend foundation only.
- Basic FastAPI app with CORS configured for the Next.js frontend.
- A single GET /api/health endpoint that reports API + MongoDB status.
- A GET /api/destinations endpoint that returns local destination data.
"""

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import os
from typing import List

from app.config import settings
from app.database import check_connection
from app.models import Destination

app = FastAPI(title="TravelSphere AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    db_connected = check_connection()
    payload = {
        "status": "ok",
        "database": "connected" if db_connected else "disconnected",
    }
    if not db_connected:
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content=payload)
    return payload


@app.get("/api/destinations", response_model=List[Destination])
def get_destinations():
    data_path = os.path.join(os.path.dirname(__file__), "destinations.json")
    with open(data_path, "r") as f:
        destinations = json.load(f)
    return destinations
