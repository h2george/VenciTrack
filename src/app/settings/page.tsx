/**
 * @file settings/page.tsx
 * @description User profile and account security configuration center. 
 * Implements high-fidelity form controls and state management.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { User, Shield, Bell, Save, Loader2, CheckCircle, Mail, MessageSquare } from "lucide-react";

interface UserPrefs {
    channels: string[];
    frequency: string;
    anticipationDays: number;
}

export default function SettingsPage(): React.ReactElement {
    const [prefs, setPrefs] = useState<UserPrefs>({
        channels: ["EMAIL"],
        frequency: "IMMEDIATE",
        anticipationDays: 30
    });
    const [user, setUser] = useState<{ name: string }>({ name: "Cargando..." });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch Preferences
        fetch("/api/user/preferences")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) setPrefs(data.data);
            })
            .finally(() => setLoading(false));

        // Fetch User Identity
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.success) setUser({ name: data.data.name });
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/user/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prefs)
            });
            if (res.ok) setMessage("Configuración Sincronizada");
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-brand-red" size={40} />
                    <p className="font-black uppercase tracking-widest text-[var(--text-muted)] text-[10px]">Accediendo al Núcleo...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">Configuración</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            HU-8.1: Personalización de canales y alertas críticas
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="button-red px-10 py-5 flex items-center gap-3 shadow-2xl shadow-brand-red/20 transform active:scale-95 transition-all"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span className="font-black uppercase tracking-widest text-sm">Guardar Cambios</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                    {/* Notification Channels (HU-8.1) */}
                    <section className="glass-card p-10 flex flex-col gap-10 border-brand-blue/20">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shadow-inner">
                                <Bell size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Canales de Notificación</h3>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Estado: Operativo</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/5 border border-white/5 hover:border-brand-blue/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    <Mail className="text-[var(--text-muted)] group-hover:text-brand-blue transition-colors" size={24} />
                                    <div>
                                        <p className="font-black text-sm text-[var(--text-primary)]">Protocolo Email</p>
                                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide">Reportes detallados y enlaces seguros</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={prefs.channels.includes("EMAIL")}
                                    onChange={(e) => {
                                        const newChannels = e.target.checked
                                            ? [...prefs.channels, "EMAIL"]
                                            : prefs.channels.filter(c => c !== "EMAIL");
                                        setPrefs({ ...prefs, channels: newChannels });
                                    }}
                                    className="size-6 rounded-lg bg-black/40 border-white/10 text-brand-blue focus:ring-brand-blue cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/5 border border-white/5 opacity-50 relative group cursor-not-allowed">
                                <div className="flex items-center gap-4">
                                    <MessageSquare className="text-[var(--text-muted)]" size={24} />
                                    <div>
                                        <p className="font-black text-sm text-[var(--text-primary)]">Protocolo WhatsApp</p>
                                        <p className="text-[10px] font-bold text-brand-red uppercase tracking-wide italic">Disponible en Versión PRO</p>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-4 text-[8px] font-black uppercase bg-brand-red text-white px-2 py-0.5 rounded">Premium</div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Anticipación Maestra</label>
                                    <span className="text-xs font-black text-brand-blue">{prefs.anticipationDays} Días</span>
                                </div>
                                <input
                                    type="range" min="15" max="90" step="5"
                                    value={prefs.anticipationDays}
                                    onChange={(e) => setPrefs({ ...prefs, anticipationDays: parseInt(e.target.value) })}
                                    className="w-full accent-brand-blue bg-white/5 h-2 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Profile Information Section */}
                    <section className="glass-card p-10 flex flex-col gap-10">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-[var(--text-muted)]">
                                <User size={32} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Identidad del Operador</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Nombre Maestro</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="input-premium px-6 py-4 opacity-70"
                                    value={user.name}
                                />
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest italic text-center mt-4">
                            Ponte en contacto con soporte para modificar tus credenciales maestras.
                        </p>
                    </section>

                    {/* Security Section */}
                    <section className="glass-card p-10 flex flex-col gap-10 border-brand-red/10 lg:col-span-2">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-brand-red">Protocolos de Seguridad</h3>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-foreground/5 p-8 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-black mb-1">Doble Factor (2FA)</p>
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Activo y Protegido</p>
                                </div>
                                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <CheckCircle size={20} />
                                </div>
                            </div>

                            <div className="flex-1 bg-foreground/5 p-8 rounded-3xl border border-white/5 flex items-center justify-between opacity-50">
                                <div>
                                    <p className="text-sm font-black mb-1">Rotación de Tokens</p>
                                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider italic">Próxima rotación en 7 días</p>
                                </div>
                                <button className="button-glass px-6 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Rotar Ahora</button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Toast Notification */}
                {message && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[3000] animate-bounce-in">
                        <div className="bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-3xl shadow-emerald-500/20 flex items-center gap-3">
                            <CheckCircle size={20} />
                            <span className="font-black uppercase tracking-widest text-xs">{message}</span>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
