import { useEffect, useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import { navigation } from "./components/AppShell";
import { api } from "./services/api";
import AgentActivityPage from "./pages/AgentActivityPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommandCenterPage from "./pages/CommandCenterPage";
import IncidentsPage from "./pages/IncidentsPage";
import ReportIncidentPage from "./pages/ReportIncidentPage";
import TeamsPage from "./pages/TeamsPage";

export default function App() {
  const [view, setView] = useState("command");
  const [role, setRole] = useState("ADMIN");
  const [incidents, setIncidents] = useState([]);
  const [activity, setActivity] = useState([]);
  const [teams, setTeams] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [health, setHealth] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  const selectedIncident = useMemo(() => incidents.find((item) => item.id === selectedId) || selectedDetail?.incident, [incidents, selectedId, selectedDetail]);
  const notify = (message, tone = "cyan") => { setToast({ message, tone }); window.setTimeout(() => setToast(null), 4000); };

  const selectIncident = async (id) => {
    setSelectedId(id);
    try { const result = await api.incident(id); setSelectedDetail(result); } catch (error) { notify(error.message, "red"); }
  };

  const refresh = async () => {
    try {
      const [nextIncidents, nextActivity, nextTeams, nextAnalytics, nextHealth] = await Promise.all([api.incidents(), api.activity(), api.teams(), api.analytics(), api.health()]);
      setIncidents(nextIncidents); setActivity(nextActivity); setTeams(nextTeams); setAnalytics(nextAnalytics); setHealth(nextHealth);
      if (selectedId) await selectIncident(selectedId);
      else if (nextIncidents[0]) await selectIncident(nextIncidents[0].id);
    } catch (error) { setHealth(null); notify(error.message, "red"); } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);
  useEffect(() => { if (role === "CITIZEN") setView("report"); if (role === "RESPONDER" && view === "command") setView("incidents"); }, [role]);

  const createIncident = async (formData) => { try { const incident = await api.createIncident(formData); await refresh(); await selectIncident(incident.id); setView("incidents"); notify("Incident accepted by the FastAPI intake endpoint.", "green"); } catch (error) { notify(error.message, "red"); throw error; } };
  const pageTitle = navigation.find(([id]) => id === view)?.[1] || "Command center";

  const page = loading ? <LoadingState /> : view === "command" ? <CommandCenterPage incidents={incidents} analytics={analytics} selectedId={selectedId} selectedIncident={selectedIncident} activity={selectedDetail?.activity || []} onSelect={selectIncident} /> : view === "incidents" ? <IncidentsPage incidents={incidents} selectedId={selectedId} selectedIncident={selectedIncident} activity={selectedDetail?.activity || []} onSelect={selectIncident} /> : view === "report" ? <ReportIncidentPage onCreate={createIncident} onNotify={notify} /> : view === "agent" ? <AgentActivityPage activity={activity} /> : view === "teams" ? <TeamsPage teams={teams} /> : <AnalyticsPage analytics={analytics} />;

  return <AppShell view={view} setView={setView} role={role} setRole={setRole} apiOnline={Boolean(health)} mobileNav={mobileNav} setMobileNav={setMobileNav}><div className="mx-auto max-w-[1500px] space-y-5"><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">{role} view · Mangalore demo operating area</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">{pageTitle}</h1><p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">A maintainable Phase 1–2 foundation for CityShield, backed by real API reads and writes without claiming future AI or automation behavior.</p></div><button onClick={refresh} className="self-start rounded-lg border border-slate-800 bg-graphite-900 px-3 py-2 text-xs text-slate-300 hover:border-cyan-400/50">Refresh operational data</button></div>{page}</div>{toast && <div className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border px-4 py-3 text-xs shadow-2xl ${toast.tone === "red" ? "border-red-400/40 bg-red-950 text-red-100" : "border-emerald-400/40 bg-emerald-950 text-emerald-100"}`}>{toast.message}</div>}</AppShell>;
}

function LoadingState() { return <div className="panel flex min-h-[480px] items-center justify-center"><div className="text-center"><div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" /><p className="mt-3 text-sm text-slate-400">Loading operational data…</p></div></div>; }
