import { MapPinned } from "lucide-react";
import AgentPipeline from "../components/AgentPipeline";
import IncidentDetail from "../components/IncidentDetail";
import IncidentMap from "../components/IncidentMap";
import StatCard from "../components/StatCard";

export default function CommandCenterPage({ incidents, analytics, selectedId, selectedIncident, activity, onSelect }) {
  return <div className="space-y-5">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Active incidents" value={analytics.active_incidents ?? 0} detail="Not resolved" icon="active" />
      <StatCard label="Critical incidents" value={analytics.critical_incidents ?? 0} detail="Severity from intake" tone="red" icon="critical" />
      <StatCard label="Total incidents" value={analytics.total_incidents ?? 0} detail="Current API session" tone="cyan" />
      <StatCard label="Available teams" value={analytics.available_response_teams ?? 0} detail="Response roster" tone="green" icon="resolved" />
      <StatCard label="Activity events" value={analytics.activity_events ?? 0} detail="Operational log" tone="purple" icon="actions" />
    </div>
    <AgentPipeline />
    <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
      <div className="panel p-4"><div className="mb-3 flex items-center justify-between"><div><p className="eyebrow">Live spatial layer</p><h2 className="mt-1 text-sm font-semibold">Incident locations from the API</h2></div><MapPinned size={17} className="text-cyan-300" /></div><IncidentMap incidents={incidents} selectedId={selectedId} onSelect={onSelect} /></div>
      <IncidentDetail incident={selectedIncident} activity={activity} />
    </div>
    <div className="panel p-4 text-xs text-slate-500">Phase 1–2 scope: the dashboard is connected to incident, team, analytics, and activity endpoints. AI analysis, approvals, automation, and verification controls are intentionally deferred.</div>
  </div>;
}
