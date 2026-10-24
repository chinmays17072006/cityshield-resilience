from datetime import datetime, timezone
from typing import Any
from uuid import uuid4


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class InMemoryStore:
    """Small in-memory store for Phase 2.

    This keeps the API usable without introducing a database integration yet.
    The class is deliberately isolated so a later Supabase/Postgres adapter can
    implement the same methods without changing the API routes.
    """

    def __init__(self) -> None:
        self.incidents: dict[str, dict[str, Any]] = {}
        self.activities: list[dict[str, Any]] = []
        self.teams: dict[str, dict[str, Any]] = {}
        self._seed()

    def _seed(self) -> None:
        self.teams = {
            "team-road": {"id": "team-road", "name": "Road & Infrastructure", "specialty": "Road safety", "status": "AVAILABLE", "current_incident_id": None},
            "team-fire": {"id": "team-fire", "name": "Fire Response", "specialty": "Fire and rescue", "status": "AVAILABLE", "current_incident_id": None},
            "team-medical": {"id": "team-medical", "name": "Medical Response", "specialty": "Medical emergency", "status": "AVAILABLE", "current_incident_id": None},
            "team-utility": {"id": "team-utility", "name": "Utility Response", "specialty": "Power and water", "status": "AVAILABLE", "current_incident_id": None},
        }
        self.create_incident({
            "id": "INC-DEMO-401",
            "title": "Urban flooding near Sector 4 corridor",
            "description": "Heavy waterlogging is blocking the main road near the market entrance.",
            "category": "Flood",
            "location_label": "Sector 4 market corridor",
            "latitude": 12.9141,
            "longitude": 74.8560,
            "severity": "critical",
            "status": "reported",
            "reporter_name": "Prototype seed data",
            "evidence": ["Citizen description", "Image metadata placeholder"],
        })
        self.create_incident({
            "id": "INC-DEMO-402",
            "title": "Road surface collapse at University Gate",
            "description": "A deep pothole and surface depression are disrupting traffic.",
            "category": "Infrastructure failure",
            "location_label": "University Gate, Zone 4",
            "latitude": 12.9050,
            "longitude": 74.8580,
            "severity": "high",
            "status": "reported",
            "reporter_name": "Prototype seed data",
            "evidence": ["Multiple report metadata placeholder"],
        })
        self.create_incident({
            "id": "INC-DEMO-403",
            "title": "Bridge B-204 telemetry review",
            "description": "A demo infrastructure record is ready for future analysis workflows.",
            "category": "Infrastructure failure",
            "location_label": "Bridge B-204",
            "latitude": 12.9270,
            "longitude": 74.8430,
            "severity": "medium",
            "status": "reported",
            "reporter_name": "Prototype seed data",
            "evidence": ["Telemetry metadata placeholder"],
        })

    def create_incident(self, data: dict[str, Any]) -> dict[str, Any]:
        incident_id = data.get("id") or f"INC-{uuid4().hex[:8].upper()}"
        timestamp = utc_now()
        incident = {
            "id": incident_id,
            "title": data["title"],
            "description": data["description"],
            "category": data["category"],
            "location_label": data.get("location_label") or "Mangalore demo area",
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
            "reporter_name": data.get("reporter_name"),
            "severity": data.get("severity"),
            "status": data.get("status", "reported"),
            "evidence": data.get("evidence", []),
            "created_at": data.get("created_at", timestamp),
            "updated_at": timestamp,
        }
        self.incidents[incident_id] = incident
        self.add_activity(incident_id, "INTAKE API", "INCIDENT_RECEIVED", "Incident record is available for the next workflow phase.")
        return incident.copy()

    def list_incidents(self) -> list[dict[str, Any]]:
        return sorted(self.incidents.values(), key=lambda item: item["created_at"], reverse=True)

    def get_incident(self, incident_id: str) -> dict[str, Any] | None:
        incident = self.incidents.get(incident_id)
        return incident.copy() if incident else None

    def update_incident(self, incident_id: str, changes: dict[str, Any]) -> dict[str, Any] | None:
        incident = self.incidents.get(incident_id)
        if not incident:
            return None
        incident.update({key: value for key, value in changes.items() if value is not None})
        incident["updated_at"] = utc_now()
        return incident.copy()

    def add_activity(self, incident_id: str | None, actor: str, stage: str, message: str) -> dict[str, Any]:
        event = {"id": f"ACT-{uuid4().hex[:10].upper()}", "incident_id": incident_id, "actor": actor, "stage": stage, "message": message, "created_at": utc_now()}
        self.activities.append(event)
        return event.copy()

    def list_activity(self, incident_id: str | None = None) -> list[dict[str, Any]]:
        events = [event for event in self.activities if incident_id is None or event["incident_id"] == incident_id]
        return list(reversed(events))

    def list_teams(self) -> list[dict[str, Any]]:
        return [team.copy() for team in self.teams.values()]

    def analytics(self) -> dict[str, Any]:
        incidents = self.list_incidents()
        return {
            "total_incidents": len(incidents),
            "active_incidents": len([item for item in incidents if item["status"] not in {"resolved", "verified"}]),
            "critical_incidents": len([item for item in incidents if item["severity"] == "critical"]),
            "resolved_incidents": len([item for item in incidents if item["status"] in {"resolved", "verified"}]),
            "activity_events": len(self.activities),
            "available_response_teams": len([team for team in self.teams.values() if team["status"] == "AVAILABLE"]),
            "category_breakdown": self._breakdown(incidents, "category"),
            "severity_breakdown": self._breakdown(incidents, "severity"),
        }

    @staticmethod
    def _breakdown(items: list[dict[str, Any]], key: str) -> list[dict[str, Any]]:
        counts: dict[str, int] = {}
        for item in items:
            label = item.get(key) or "Unknown"
            counts[label] = counts.get(label, 0) + 1
        return [{"label": label, "value": value} for label, value in counts.items()]


store = InMemoryStore()
