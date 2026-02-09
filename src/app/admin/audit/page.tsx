import { History, ShieldCheck, Search } from "lucide-react";
import Sidebar from "@/shared/components/Sidebar";
import ThemeToggle from "@/shared/components/ThemeToggle";
import AuditTimeline from "@/shared/components/audit/AuditTimeline";
import { getAuditLogs } from "@/server/queries/audit";

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
    const logs = await getAuditLogs();

    return (
        <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <Sidebar />
            <main className="main-premium flex-1 relative overflow-hidden">
                {/* Theme Switcher - Top Right */}
                <div className="absolute top-10 right-10 z-[110]">
                    <ThemeToggle />
                </div>
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="p-10 py-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <History className="text-brand-red" size={24} />
                                <h1 className="text-5xl font-black tracking-tighter">Auditoría</h1>
                            </div>
                            <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                                Trazabilidad total de alertas y acciones administrativas
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-[var(--sidebar-bg)] p-4 px-6 rounded-2xl border border-[var(--border-glass)] shadow-2xl">
                            <div className="text-right">
                                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Registros Totales</p>
                                <p className="text-xl font-black text-brand-red tracking-tight">{logs.length}</p>
                            </div>
                            <div className="h-10 w-px bg-[var(--border-glass)]"></div>
                            <ShieldCheck className="text-brand-blue" size={28} />
                        </div>
                    </div>

                    {/* Filters & Search - Glass Layout */}
                    <div className="glass-card p-4 flex flex-col md:flex-row gap-4 mb-10">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-brand-red transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Filtrar por Entidad, Acción o Descripción..."
                                className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs font-bold uppercase tracking-wider focus:border-brand-red/30 focus:bg-white/10 outline-none transition-all"
                            />
                        </div>
                        <button className="button-glass px-8 py-3 h-full border border-white/5 hover:border-white/20">
                            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Exportar CSV</span>
                        </button>
                    </div>

                    {/* Timeline Log */}
                    <AuditTimeline logs={logs} />

                    <div className="mt-12 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] opacity-20">
                            Protocolo de Seguimiento Auditable VenciTrack
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
