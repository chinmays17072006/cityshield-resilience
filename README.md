# CityShield Resilience AI

CityShield is an urban resilience command-center prototype being migrated from a single static HTML file into a maintainable React + FastAPI application.

## Phase 1–2 scope completed

- Preserved the original dark graphite / cyan command-center identity.
- Preserved the Mangalore demo operating area and Leaflet/OpenStreetMap map concept.
- Preserved incident reporting, location capture, evidence upload, role selection, response-team view, analytics, and activity-log concepts.
- Moved the active frontend into React + Vite + Tailwind with reusable shell, page, map, detail, status, and metric components.
- Preserved the original prototype as `legacy-prototype.html` for reference.
- Added a FastAPI backend with clean API routes and Pydantic models.
- Added an in-memory store for incidents, activity events, response teams, and analytics.
- Added CORS and environment-based frontend configuration.

## Intentionally not included yet

The following are deliberately deferred until you explicitly request the next phase:

- Gemini integration
- n8n integration
- Database/Supabase integration
- Advanced agent reasoning or tool calling
- Human approval and dispatch automation
- Production authentication

The backend has reserved namespaces for future `agents/` and `integrations/` modules, but they are not active.

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

The frontend calls the backend at `http://localhost:8000/api` by default. To change it, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

## Current API surface

```text
GET    /api/health
GET    /api/incidents
POST   /api/incidents
GET    /api/incidents/{id}
PATCH  /api/incidents/{id}
GET    /api/agent/activity
GET    /api/response-teams
GET    /api/analytics
```

`POST /api/incidents` accepts multipart form data and validates optional image/PDF evidence. Records exist for the current backend process only because database integration is intentionally deferred.

## Existing prototype mapping

| Existing prototype feature | Phase 1 treatment |
| --- | --- |
| Dark command-center shell | Rebuilt as `AppShell` and Tailwind components |
| Leaflet city map | Rebuilt as `IncidentMap` connected to API incident coordinates |
| Incident reporting | Rebuilt as `ReportIncidentPage` with FastAPI multipart intake |
| Role chooser | Retained as an Admin / Responder / Citizen view selector |
| Response teams | Retained as a read-only backend-backed roster |
| Analytics | Reduced to backend-derived counts and distributions |
| Activity stream | Retained as a read-only foundation for future agent events |
| Static prototype | Preserved as `legacy-prototype.html` |

## Next phase, only when requested

The next phase can add Gemini analysis behind the existing API boundary, then add agent decisions, human approval, n8n, and durable storage one step at a time.
