# CityShield Phase 1–2 architecture

```text
React + Vite + Tailwind
  ├─ AppShell
  ├─ Command center
  ├─ Incident register/detail
  ├─ Report incident
  ├─ Read-only activity log
  ├─ Response teams
  └─ Analytics
          |
          v
FastAPI REST API
  ├─ API routes
  ├─ Pydantic request models
  ├─ CORS and environment settings
  └─ InMemoryStore
          |
          v
Session-scoped records
  ├─ incidents
  ├─ agent_activity
  └─ response_teams
```

## What is active now

1. The frontend reads incidents, activity, teams, analytics, and health from FastAPI.
2. The report form sends multipart data to `POST /api/incidents`.
3. The backend validates evidence type and size, creates an incident, and records an intake event.
4. The frontend refreshes and displays the new record on the incident list and map.

## Reserved for later phases

- `backend/app/agents/` — future agent orchestration.
- `backend/app/integrations/` — future Gemini and n8n adapters.
- `n8n/` — future workflow exports.
- Durable database — future Supabase/Postgres adapter.

## Preservation decisions

| Existing prototype | Phase 1 treatment |
| --- | --- |
| Dark command-center visual system | Retained in reusable React/Tailwind components |
| Mangalore demo geography | Retained as the map's honest demo operating area |
| Leaflet map | Connected to API-backed incident coordinates |
| Incident reporting | Rebuilt as a validated multipart flow |
| Role selector | Retained with role-oriented default views |
| Static KPI values | Removed from the active UI; counts derive from the backend session |
| Decorative AI controls | Removed from the active UI until agent functionality is actually implemented |
| Single-file prototype | Preserved as `legacy-prototype.html` |
