/**
 * @file reminders/page.tsx
 * @description Notification management center. Implements detailed 
 * alert configurations for cross-platform delivery.
 */

"use client";

import Sidebar from "@/components/Sidebar";

/**
 * RemindersPage Component
 * @returns {JSX.Element} The rendered alerts settings view.
 */
export default function RemindersPage(): JSX.Element {
    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Alertas IA</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Configuración de entrega y protocolos de notificación
                        </p>
                    </div>
                </header>

                <section className="glass-card p-10 min-h-[500px] flex flex-col items-center justify-center text-center">
                    <div className="max-w-md flex flex-col items-center gap-8">
                        <div className="size-24 rounded-[2rem] bg-brand-red/5 border border-brand-red/10 flex items-center justify-center animate-pulse">
                            <span className="icon text-5xl text-brand-red">notifications_active</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-3">Sincronización de Notificaciones</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">
                                Estamos calibrando los motores de entrega para WhatsApp y Email.
                                La configuración de alertas estará disponible en la próxima actualización del núcleo.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="stat-pill text-xs px-6 bg-brand-red/10 text-brand-red border-none font-black uppercase tracking-widest">
                                En Desarrollo
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
