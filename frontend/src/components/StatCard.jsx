import { Activity, AlertTriangle, Brain, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

const icons = { active: Activity, critical: AlertTriangle, approval: Brain, resolved: CheckCircle2, confidence: ShieldAlert, actions: Clock3 };

export default function StatCard({ label, value, detail, tone = "cyan", icon = "active" }) {
  const Icon = icons[icon] || Activity;
  const tones = { cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20", red: "text-red-300 bg-red-400/10 border-red-400/20", amber: "text-amber-300 bg-amber-400/10 border-amber-400/20", green: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20", purple: "text-purple-300 bg-purple-400/10 border-purple-400/20" };
  return <div className="panel p-4"><div className="flex items-start justify-between"><div><p className="text-xs text-slate-500">{label}</p><p className="mt-2 font-mono text-2xl font-semibold text-slate-100">{value}</p><p className="mt-1 text-[11px] text-slate-500">{detail}</p></div><div className={`rounded-xl border p-2.5 ${tones[tone]}`}><Icon size={17} /></div></div></div>;
}
