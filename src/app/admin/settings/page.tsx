"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/shared/components/Sidebar";

export default function AdminSettingsPage() {
    const [config, setConfig] = useState<any>({
        SMTP_HOST: "",
        SMTP_PORT: "",
        SMTP_USER: "",
        SMTP_PASS: "",
        SMTP_FROM: "",
        META_PIXEL_ID: "",
        GOOGLE_ANALYTICS_ID: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchConfig();
    }, []);

    async function fetchConfig() {
        try {
            const res = await fetch("/api/admin/config");
            const data = await res.json();
            if (data.success) {
                setConfig(data.config);
            }
        } catch (err) {
            console.error("Error fetching config:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage("");
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            const data = await res.json();
            if (data.success) {
                setMessage("Configuración actualizada en la base de datos.");
            } else {
                setMessage("Error: " + data.error);
            }
        } catch (err) {
            setMessage("Error de conexión");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-20 text-center font-black uppercase text-xs tracking-widest animate-pulse">Cargando Protocolos...</div>;

    return (
        <main className="flex min-h-screen bg-[var(--bg)]">
            <Sidebar />
            <div className="flex-1 p-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Configuración de Infraestructura</h1>
                    <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">Gestión dinámica de servicios externos</p>
                </header>

                <div className="glass-card max-w-2xl p-10">
                    <form onSubmit={handleSave} className="flex flex-col gap-8">
                        {/* SMTP Section */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-brand-red">
                                <span className="icon">mail</span> Servidor SMTP
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Host</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.SMTP_HOST || ""}
                                        onChange={(e) => setConfig({ ...config, SMTP_HOST: e.target.value })}
                                        placeholder="smtp.example.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Puerto</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.SMTP_PORT || ""}
                                        onChange={(e) => setConfig({ ...config, SMTP_PORT: e.target.value })}
                                        placeholder="465"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Usuario</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.SMTP_USER || ""}
                                        onChange={(e) => setConfig({ ...config, SMTP_USER: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Contraseña</label>
                                    <input
                                        type="password"
                                        className="input-premium px-4 py-3"
                                        value={config.SMTP_PASS || ""}
                                        onChange={(e) => setConfig({ ...config, SMTP_PASS: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Remitente (FROM)</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.SMTP_FROM || ""}
                                        onChange={(e) => setConfig({ ...config, SMTP_FROM: e.target.value })}
                                        placeholder='"VenciTrack" <noreply@vencitrack.com>'
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Marketing Section */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-brand-blue">
                                <span className="icon">analytics</span> Marketing & Tracking
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Meta Pixel ID</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.META_PIXEL_ID || ""}
                                        onChange={(e) => setConfig({ ...config, META_PIXEL_ID: e.target.value })}
                                        placeholder="Ej: 1234567890"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Google Analytics ID</label>
                                    <input
                                        type="text"
                                        className="input-premium px-4 py-3"
                                        value={config.GOOGLE_ANALYTICS_ID || ""}
                                        onChange={(e) => setConfig({ ...config, GOOGLE_ANALYTICS_ID: e.target.value })}
                                        placeholder="Ej: G-XXXXXXXXXX"
                                    />
                                </div>
                            </div>
                        </section>

                        {message && (
                            <div className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${message.includes('Error') ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-blue/10 text-brand-blue'}`}>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="button-red py-4 font-black uppercase tracking-widest text-xs"
                        >
                            {saving ? 'Sincronizando...' : 'Actualizar Configuración'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
