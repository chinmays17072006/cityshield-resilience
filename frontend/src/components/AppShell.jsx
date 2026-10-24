import { Activity, BarChart3, CircleUserRound, FilePlus2, Gauge, Menu, ServerCog, Shield, Siren, Users, X } from "lucide-react";

export const navigation = [
  ["command", "Command center", Gauge],
  ["incidents", "Incidents", Siren],
  ["report", "Report incident", FilePlus2],
  ["agent", "Activity log", Activity],
  ["teams", "Response teams", Users],
  ["analytics", "Analytics", BarChart3],
];

export default function AppShell({ view, setView, role, setRole, apiOnline, mobileNav, setMobileNav, children }) {
  return <div className="min-h-screen overflow-x-hidden bg-graphite-950 text-slate-100">
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-graphite-950/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-800 p-2 text-slate-400 lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={18} /></button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300/10 text-cyan-200"><Shield size={18} /></div>
          <div><div className="text-sm font-semibold tracking-[0.18em] text-slate-100">CITYSHIELD</div><div className="font-mono text-[9px] tracking-[0.26em] text-cyan-300">RESILIENCE AI</div></div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-[10px] font-mono text-amber-200">PHASE 1–2 BUILD</div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-graphite-900 px-3 py-1.5 text-xs text-slate-400"><CircleUserRound size={14} className="text-cyan-300" /><select value={role} onChange={(event) => setRole(event.target.value)} className="bg-transparent text-xs text-slate-200 outline-none"><option value="ADMIN">ADMIN · Command Center</option><option value="RESPONDER">RESPONDER · Field view</option><option value="CITIZEN">CITIZEN · Report view</option></select></div>
          <div className={`flex items-center gap-2 text-[10px] font-mono ${apiOnline ? "text-emerald-300" : "text-red-300"}`}><ServerCog size={14} />{apiOnline ? "API ONLINE" : "API OFFLINE"}</div>
        </div>
      </div>
    </header>
    <div className="flex">
      <aside className={`${mobileNav ? "fixed inset-y-0 left-0 z-40 flex w-72" : "hidden lg:flex lg:w-64"} shrink-0 flex-col border-r border-slate-800/80 bg-graphite-900/90 ${mobileNav ? "shadow-2xl" : ""}`}>
        <div className="flex items-center justify-between border-b border-slate-800/80 p-4 lg:hidden"><span className="eyebrow">Navigation</span><button onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button></div>
        <div className="space-y-1 p-3"><p className="eyebrow px-3 pb-2">Operations</p>{navigation.map(([id, label, Icon]) => <button key={id} onClick={() => { setView(id); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition ${view === id ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`}><Icon size={16} className={view === id ? "text-cyan-300" : "text-slate-600"} />{label}</button>)}</div>
        <div className="mt-auto border-t border-slate-800/80 p-4"><div className="flex items-center gap-2 text-xs text-slate-300"><span className="h-2 w-2 rounded-full bg-emerald-300" />{role} access</div><p className="mt-2 text-[10px] leading-4 text-slate-600">Existing single-file prototype preserved at <span className="font-mono text-slate-500">legacy-prototype.html</span>.</p></div>
      </aside>
      <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
    </div>
  </div>;
}
