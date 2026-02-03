import { prisma } from "@/lib/prisma";
import { History, ShieldCheck, Mail, User, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true
        }
    });

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
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="glass-card hover-glow p-6 transition-all border-white/5 hover:border-brand-red/10 group">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Action Timestamp */}
                                    <div className="flex items-center gap-4 min-w-[150px]">
                                        <div className={`size-10 rounded-xl flex items-center justify-center ${log.action === 'NOTIFY' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-red/10 text-brand-red'}`}>
                                            {log.action === 'NOTIFY' ? <Mail size={20} /> : <History size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 leading-none mb-1">
                                                {new Date(log.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                                            </p>
                                            <p className="text-sm font-black text-white uppercase tracking-tighter">
                                                {new Date(log.createdAt).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-white/60">
                                                {log.entityType}
                                            </span>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${log.action === 'NOTIFY' ? 'text-brand-blue bg-brand-blue/10' : 'text-brand-red bg-brand-red/10'}`}>
                                                {log.action}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-white transition-colors leading-relaxed">
                                            {log.description}
                                        </p>
                                    </div>

                                    {/* User Reference */}
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                                        <User className="text-[var(--text-muted)]" size={16} />
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)]">Operador</p>
                                            <p className="text-[10px] font-black text-white truncate max-w-[120px]">
                                                {log.user?.name || log.userId || 'Sistema'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {logs.length === 0 && (
                            <div className="glass-card p-20 text-center opacity-40">
                                <History className="mx-auto mb-4" size={48} />
                                <p className="font-black uppercase tracking-widest text-xs">Sin registros de actividad</p>
                            </div>
                        )}
                    </div>

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
