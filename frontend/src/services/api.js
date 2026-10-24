const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.detail || "CityShield API request failed");
  return body;
}

export const api = {
  health: () => request("/health"),
  incidents: () => request("/incidents"),
  incident: (id) => request(`/incidents/${id}`),
  activity: (id) => request(`/agent/activity${id ? `?incident_id=${encodeURIComponent(id)}` : ""}`),
  teams: () => request("/response-teams"),
  analytics: () => request("/analytics"),
  createIncident: (formData) => request("/incidents", { method: "POST", body: formData }),
};
