"""
Application configuration.

Loads settings from environment variables (via a local .env file during
development). No secrets are hard-coded here — see .env.example for the
variables this app expects.
"""

import os

from dotenv import load_dotenv

# Load variables from a .env file if present (no-op in environments where
# real environment variables are injected directly, e.g. most hosting
# platforms).
load_dotenv()


class Settings:
    """Simple settings container built from environment variables."""

    # MongoDB connection string, e.g. mongodb://localhost:27017 or an
    # Atlas SRV URI. Must be provided via the environment — never committed.
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")

    # Name of the database to use within the MongoDB cluster/instance.
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "")

    # Comma-separated list of origins allowed to call this API. Defaults to
    # the standard local Next.js dev server if not set.
    CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]


settings = Settings()
