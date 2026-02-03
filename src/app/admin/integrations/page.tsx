/**
 * @file admin/integrations/page.tsx
 * @description System connector settings for third-party tracking and 
 * analytics APIs. Implements high-fidelity form controls.
 */

"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

/** 
 * Config interface for bridge connectors
 */
interface IntegrationConfig {
    META_PIXEL_ID: string;
    GA_MEASUREMENT_ID: string;
}

/**
 * IntegrationsPage Component
 * @returns {React.ReactElement} The rendered integrations control panel.
 */
export default function IntegrationsPage(): React.ReactElement {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState<IntegrationConfig>({
        META_PIXEL_ID: "",
        GA_MEASUREMENT_ID: ""
    });
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setConfig(prev => ({ ...prev, ...data.data }));
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg("");
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) {
                setMsg("Protocolo Actualizado: Integraciones sincronizadas.");
            } else {
                setMsg("Error en Sincronización.");
            }
        } catch (err) {
            setMsg("Fallo en Conexión Maestra.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
                <div className="flex flex-col items-center gap-4">
                    <span className="icon animate-spin text-4xl text-brand-red">progress_activity</span>
                    <p className="font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-[10px]">Cargando Enrutadores...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1 relative overflow-hidden">
                {/* Theme Switcher - Top Right */}
                <div className="absolute top-10 right-10 z-[110]">
                    <ThemeToggle />
                </div>
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Integraciones</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Sincronización de telemetría y plataformas externas
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                    {/* Meta Pixel Configuration */}
                    <section className="glass-card p-10 flex flex-col gap-8 group">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center shadow-inner">
                                <span className="icon text-3xl text-[#1877F2]">data_thresholding</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Meta Pixel</h3>
                                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Protocolo de Conversión</p>
                            </div>
                        </div>

                        <div className="gap-2 flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Pixel ID de Identificación</label>
                            <input
                                type="text"
                                name="META_PIXEL_ID"
                                value={config.META_PIXEL_ID}
                                onChange={handleChange}
                                placeholder="Ej. 1234567890"
                                className="input-premium px-6 py-4 placeholder:italic"
                            />
                        </div>

                        <div className="bg-brand-blue/5 p-4 rounded-2xl border border-brand-blue/10">
                            <p className="text-[10px] leading-relaxed text-[var(--text-secondary)] font-medium">
                                Rastrea eventos de registro y suscripción para optimizar el alcance de tus campañas de seguridad.
                            </p>
                        </div>
                    </section>

                    {/* Google Analytics Configuration */}
                    <section className="glass-card p-10 flex flex-col gap-8 group">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-[#FBBC05]/10 flex items-center justify-center shadow-inner">
                                <span className="icon text-3xl text-[#FBBC05]">analytics</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Google Analytics 4</h3>
                                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Protocolo de Telemetría</p>
                            </div>
                        </div>

                        <div className="gap-2 flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">ID de Medición (G-XXXXXXX)</label>
                            <input
                                type="text"
                                name="GA_MEASUREMENT_ID"
                                value={config.GA_MEASUREMENT_ID}
                                onChange={handleChange}
                                placeholder="G-A1B2C3D4E5"
                                className="input-premium px-6 py-4 placeholder:italic"
                            />
                        </div>

                        <div className="bg-brand-red/5 p-4 rounded-2xl border border-brand-red/10">
                            <p className="text-[10px] leading-relaxed text-[var(--text-secondary)] font-medium">
                                Visualiza el comportamiento de flujo de usuarios en tiempo real a través de la consola maestra.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-12 flex items-center justify-between max-w-6xl">
                    <div className="flex-1">
                        {msg && (
                            <div className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest ${msg.includes('Fallo') || msg.includes('Error') ? 'bg-brand-red/10 text-brand-red' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                {msg}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`button-red px-12 py-5 flex items-center gap-4 transition-all shadow-2xl shadow-brand-red/20 ml-8 ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                    >
                        <span className="icon">{saving ? 'sync' : 'save'}</span>
                        <span className="font-black uppercase tracking-widest text-sm">
                            {saving ? 'Sincronizando...' : 'Confirmar Protocolos'}
                        </span>
                    </button>
                </div>
            </div>
        </main>
    );
}
