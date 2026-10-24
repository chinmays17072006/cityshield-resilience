from typing import Literal

from pydantic import BaseModel, Field


class IncidentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=140)
    description: str = Field(min_length=5, max_length=5000)
    category: str = Field(min_length=2, max_length=80)
    location_label: str = Field(default="Mangalore demo area", max_length=180)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    reporter_name: str | None = Field(default=None, max_length=120)


class IncidentPatch(BaseModel):
    status: Literal["reported", "resolved"] | None = None
    severity: Literal["critical", "high", "medium", "low"] | None = None


class IncidentRead(IncidentCreate):
    id: str
    severity: str | None = None
    status: str
    evidence: list[str] = Field(default_factory=list)
    created_at: str
    updated_at: str


class ActivityRead(BaseModel):
    id: str
    incident_id: str | None
    actor: str
    stage: str
    message: str
    created_at: str


class ResponseTeamRead(BaseModel):
    id: str
    name: str
    specialty: str
    status: str
    current_incident_id: str | None = None
