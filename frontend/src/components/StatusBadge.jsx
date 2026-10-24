const styles = {
  critical: "border-red-500/30 bg-red-500/10 text-red-300",
  high: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  pending_approval: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  dispatched: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  verified: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  resolved: "border-slate-500/30 bg-slate-500/10 text-slate-300",
};

export default function StatusBadge({ value = "unknown" }) {
  return <span className={`inline-flex rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${styles[value] || "border-slate-700 bg-slate-800 text-slate-300"}`}>{String(value).replaceAll("_", " ")}</span>;
}
