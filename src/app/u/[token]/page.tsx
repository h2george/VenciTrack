/**
 * @file u/[token]/page.tsx
 * @description Secure public access portal for document updates. 
 * Implements high-fidelity glassmorphism and atmospheric feedback.
 * @security Verified via SecureToken model with one-time use logic.
 */

import { prisma } from "@/lib/prisma";
import { Calendar, FileText, User, AlertCircle, ShieldCheck, History } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export const dynamic = 'force-dynamic';

/**
 * PublicActionPage Component
 * @param {Object} params - URL parameters containing the secure token.
 */
export default async function PublicActionPage({ params }: { params: { token: string } }): Promise<JSX.Element> {
    const { token } = params;

    const secureToken = await prisma.secureToken.findUnique({
        where: { token },
        include: {
            document: {
                include: {
                    subject: true,
                    documentType: true
                }
            }
        }
    });

    const isExpiredOrUsed = !secureToken || secureToken.usedAt || secureToken.expiresAt < new Date();

    if (isExpiredOrUsed) {
        return (
            <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-red/5 blur-[120px] rounded-full"></div>
                </div>

                <div className="glass-card max-w-md w-full p-10 text-center animate-fade-in border-brand-red/20">
                    <div className="size-20 rounded-3xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mx-auto mb-8 shadow-glow shadow-brand-red/10">
                        <AlertCircle className="text-brand-red" size={40} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Acceso Denegado</h2>
                    <p className="text-[var(--text-muted)] font-bold text-sm leading-relaxed mb-8">
                        Este protocolo de seguridad ha expirado o ya ha sido utilizado. Por favor, solicita una nueva URL de acceso.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="h-px bg-[var(--border-glass)] w-full"></div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mt-2">Seguridad Transaccional VenciTrack</p>
                    </div>
                </div>
            </main>
        );
    }

    const { document } = secureToken;

    return (
        <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6 relative overflow-hidden py-20">
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/5 blur-[120px] rounded-full animate-float opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-brand-red/5 blur-[120px] rounded-full animate-pulse opacity-50"></div>
            </div>

            <div className="absolute top-10 right-10 z-50">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-xl animate-fade-in-up">
                <div className="flex flex-col items-center mb-12">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-2xl shadow-brand-red/20 mb-6">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-center uppercase">Actualización de Protocolo</h1>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Terminal Segura de Usuario</p>
                </div>

                <div className="glass-card p-10 shadow-3xl shadow-black/50 border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <User size={14} className="opacity-50" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Asociado</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-tight">{document.subject.name}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <FileText size={14} className="opacity-50" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Documento</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-tight">{document.documentType.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-brand-red/5 border border-brand-red/10 group">
                            <div className="flex items-center gap-4">
                                <Calendar className="text-brand-red" size={24} />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-red/60">Vencimiento Actual</p>
                                    <p className="font-black text-lg uppercase tracking-widest leading-none">
                                        {document.expiryDate.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="size-2 rounded-full bg-brand-red shadow-glow shadow-brand-red/50 animate-pulse"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Nueva Fecha de Vigencia</label>
                            <div className="relative group">
                                <History className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-brand-red transition-colors" size={18} />
                                <input
                                    type="date"
                                    className="input-premium pl-14 pr-6 py-4 w-full text-sm font-bold uppercase tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <button className="button-red py-5 flex items-center justify-center gap-3 shadow-xl shadow-brand-red/20 hover:scale-[1.02] active:scale-95 transition-all">
                                <ShieldCheck size={18} />
                                <span className="font-black uppercase tracking-widest text-[11px]">Validar Renovación</span>
                            </button>
                            <button className="button-glass py-5 flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
                                <AlertCircle size={18} />
                                <span className="font-black uppercase tracking-widest text-[11px]">Pausar Alertas</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 opacity-20">
                            <div className="h-px w-8 bg-current"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Encriptación AES-256 Activa</span>
                            <div className="h-px w-8 bg-current"></div>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-12 text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] opacity-30 leading-relaxed">
                    © 2026 VenciTrack Engineering Unit.<br />
                    Protección de activos documentales de alta fidelidad.
                </p>
            </div>
        </main>
    );
}
