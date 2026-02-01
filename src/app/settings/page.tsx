/**
 * @file settings/page.tsx
 * @description User profile and account security configuration center. 
 * Implements high-fidelity form controls and state management.
 */

"use client";

import Sidebar from "@/components/Sidebar";

/**
 * SettingsPage Component
 * @returns {JSX.Element} The rendered user settings view.
 */
export default function SettingsPage(): JSX.Element {
    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Panel de Control</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Ajustes del núcleo y personalización de identidad
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                    {/* Profile Information Section */}
                    <section className="glass-card p-10 flex flex-col gap-10">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center">
                                <span className="icon text-3xl text-brand-blue">account_circle</span>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Identidad Visual</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Nombre Maestro</label>
                                <input
                                    type="text"
                                    className="input-premium px-6 py-4"
                                    defaultValue="Usuario Demo"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Organización / Entidad</label>
                                <input
                                    type="text"
                                    className="input-premium px-6 py-4"
                                    defaultValue="VenciTrack Labs"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[var(--border)]">
                            <button className="button-red px-10 py-4 flex items-center gap-3 shadow-xl shadow-brand-red/10">
                                <span className="icon">save</span>
                                <span className="font-black uppercase tracking-widest text-sm">Actualizar Perfil</span>
                            </button>
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="glass-card p-10 flex flex-col gap-10 border-brand-red/20">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                                <span className="icon text-3xl text-brand-red">security</span>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-brand-red">Protocolos de Seguridad</h3>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-foreground/5 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-black mb-1">Encriptación de Acceso</p>
                                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Última rotación: Hace 30 días</p>
                                </div>
                                <button className="button-glass px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:border-brand-red hover:text-brand-red transition-all">
                                    Rotar Llaves
                                </button>
                            </div>

                            <div className="bg-foreground/5 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-black mb-1">Doble Factor (2FA)</p>
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Activo y Protegido</p>
                                </div>
                                <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <span className="icon text-sm">verified_user</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
