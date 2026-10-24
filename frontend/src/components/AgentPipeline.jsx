import { Circle, ShieldCheck } from "lucide-react";

const stages = ["INTAKE", "PERSIST", "ACTIVITY LOG", "FUTURE AGENT", "FUTURE TOOLS"];

export default function AgentPipeline() {
  return <div className="panel p-4"><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow">Phase 2 foundation</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Incident intake and operational record flow</h2></div><ShieldCheck size={18} className="text-cyan-300" /></div><div className="grid grid-cols-2 gap-3 md:grid-cols-5">{stages.map((stage, index) => <div key={stage} className="text-center"><div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border ${index < 3 ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" : "border-slate-700 bg-slate-900 text-slate-600"}`}><Circle size={12} /></div><p className={`mt-2 font-mono text-[10px] ${index < 3 ? "text-slate-200" : "text-slate-600"}`}>{stage}</p></div>)}</div><div className="mt-4 rounded-lg border border-slate-800 bg-graphite-950/70 px-3 py-2 text-xs text-slate-400">Gemini analysis, agent planning, tool execution, and n8n actions are intentionally not connected in Phase 2.</div></div>;
}
