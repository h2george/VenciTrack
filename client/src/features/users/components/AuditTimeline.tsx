import { History, Mail, User as UserIcon } from "lucide-react";

interface AuditLog {
    id: string;
    action: string;
    entityType: string;
    description: string;
    createdAt: Date | string;
    userId?: string | null;
    user?: {
        name: string | null;
    } | null;
}

interface AuditTimelineProps {
    logs: AuditLog[];
}

/**
 * AuditTimeline Component
 * Architecture: Logic-Bound Shared Component
 * Responsibilities: Render a chronological sequence of audit actions with premium styling
 */
export default function AuditTimeline({ logs }: AuditTimelineProps) {
    if (logs.length === 0) {
        return (
            <div className="glass-card p-20 text-center opacity-40">
                <History className="mx-auto mb-4" size={48} />
                <p className="font-black uppercase tracking-widest text-xs">Sin registros de actividad</p>
            </div>
        );
    }

    return (
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
                            <UserIcon className="text-[var(--text-muted)]" size={16} />
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
        </div>
    );
}
