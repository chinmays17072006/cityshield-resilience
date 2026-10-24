from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from pydantic import ValidationError

from ..config import get_settings
from ..models import IncidentCreate, IncidentPatch
from ..store import store


router = APIRouter(prefix="/api")


@router.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "environment": get_settings().cityshield_env,
        "storage": "in-memory",
        "future_integrations": {"gemini": "not_configured", "n8n": "not_configured"},
    }


@router.get("/incidents")
def list_incidents() -> list[dict]:
    return store.list_incidents()


@router.get("/incidents/{incident_id}")
def get_incident(incident_id: str) -> dict:
    incident = store.get_incident(incident_id)
    if not incident:
        raise HTTPException(404, "Incident not found")
    return {"incident": incident, "activity": store.list_activity(incident_id)}


@router.post("/incidents")
async def create_incident(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    location_label: str = Form("Mangalore demo area"),
    latitude: float | None = Form(None),
    longitude: float | None = Form(None),
    reporter_name: str | None = Form(None),
    evidence_file: UploadFile | None = File(None),
) -> dict:
    evidence: list[str] = []
    if evidence_file:
        if evidence_file.content_type and not (evidence_file.content_type.startswith("image/") or evidence_file.content_type == "application/pdf"):
            raise HTTPException(400, "Only image or PDF evidence is accepted")
        contents = await evidence_file.read(5 * 1024 * 1024 + 1)
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(413, "Evidence file must be 5 MB or smaller")
        evidence.append(f"{evidence_file.filename or 'unnamed evidence'} ({evidence_file.content_type or 'unknown type'})")
    try:
        validated = IncidentCreate(title=title, description=description, category=category, location_label=location_label, latitude=latitude, longitude=longitude, reporter_name=reporter_name)
    except ValidationError as error:
        raise HTTPException(422, detail=error.errors()) from error
    return store.create_incident({**validated.model_dump(), "evidence": evidence})


@router.patch("/incidents/{incident_id}")
def patch_incident(incident_id: str, payload: IncidentPatch) -> dict:
    incident = store.update_incident(incident_id, payload.model_dump(exclude_none=True))
    if not incident:
        raise HTTPException(404, "Incident not found")
    return incident


@router.get("/agent/activity")
def list_agent_activity(incident_id: str | None = None) -> list[dict]:
    return store.list_activity(incident_id)


@router.get("/response-teams")
def list_response_teams() -> list[dict]:
    return store.list_teams()


@router.get("/analytics")
def analytics() -> dict:
    return store.analytics()
