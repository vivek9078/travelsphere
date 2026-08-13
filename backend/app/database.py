"""
Reusable MongoDB connection handling.

Exposes a single MongoClient/Database pair that the rest of the app can
import, plus a small helper to check connectivity for the health endpoint.
No application-specific collections are defined in this phase.
"""

import logging

from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import PyMongoError

from app.config import settings

logger = logging.getLogger(__name__)

# The client is created lazily on first use so that importing this module
# never crashes the app, even if MongoDB is unreachable or MONGODB_URI is
# unset. Connection errors are only surfaced when someone actually tries
# to talk to the database (e.g. the /api/health endpoint).
_client: MongoClient | None = None


def get_client() -> MongoClient:
    """Return a lazily-created MongoClient instance."""
    global _client
    if _client is None:
        # serverSelectionTimeoutMS keeps failed connections from hanging
        # the request for a long time.
        _client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=5000)
    return _client


def get_database() -> Database:
    """Return the configured MongoDB database."""
    client = get_client()
    return client[settings.DATABASE_NAME]


def check_connection() -> bool:
    """
    Ping MongoDB to verify the connection is alive.

    Returns True if MongoDB responded successfully, False otherwise.
    Never raises — callers (like the health check endpoint) can rely on
    this to report status without crashing the app.
    """
    try:
        client = get_client()
        client.admin.command("ping")
        return True
    except PyMongoError:
        logger.exception("MongoDB connection check failed")
        return False
    except Exception:
        # Catch-all so a misconfiguration (e.g. bad URI) never takes down
        # the whole application — it just gets reported as "disconnected".
        logger.exception("Unexpected error while checking MongoDB connection")
        return False
