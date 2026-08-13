# TravelSphere - Agent Instructions

## Project Overview

TravelSphere is an India-focused AI travel planning web application.

The project has:
- Frontend: Next.js
- Backend: Python
- Database: MongoDB

## Project Structure

- `frontend/` - Next.js frontend
- `backend/` - Python backend

## Important Rules

- Do not redesign the existing architecture unless explicitly asked.
- Do not modify unrelated features.
- Do not remove existing functionality without explaining why.
- Do not hardcode API keys, database credentials, or other secrets.
- Never read, expose, or commit `.env` secrets.
- Prefer fixing the root cause rather than adding workarounds.
- Before making major changes, explain the proposed approach.
- Keep changes limited to the requested task.

## Testing

- Test backend changes using the project's existing backend test/setup.
- Test frontend changes using the project's existing frontend commands.
- After making a change, verify that existing functionality has not been broken.

## Development

- Frontend dependencies are managed through `package.json`.
- Backend dependencies are managed through the backend dependency file.
- Do not modify dependency versions unless necessary for the requested task.