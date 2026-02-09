/**
 * @file settings/page.tsx
 * @description User configuration and profile management.
 * Integrated with Stitch mockup aesthetic.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import {
    Loader2,
    CheckCircle,
    MessageSquare,
    Smartphone,
    Globe,
    Edit2
} from "lucide-react";
import { motion } from "framer-motion";

interface UserPrefs {
    channels: string[];
    frequency: string;
    anticipationDays: number;
}

interface UserData {
    name: string;
    email: string;
}

export default function SettingsPage(): React.ReactElement {
    const [prefs, setPrefs] = useState<UserPrefs>({
        channels: ["EMAIL"],
        frequency: "IMMEDIATE",
        anticipationDays: 30
    });
    const [user, setUser] = useState<UserData>({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        Promise.all([
            fetch("/api/user/preferences").then(res => res.json()),
            fetch("/api/auth/me").then(res => res.json())
        ]).then(([prefsData, userData]) => {
            if (prefsData.success && prefsData.data) setPrefs(prefsData.data);
            if (userData.success) setUser({ name: userData.data.name, email: userData.data.email });
        }).finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const [prefRes, profileRes] = await Promise.all([
                fetch("/api/user/preferences", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(prefs)
                }),
                fetch("/api/user/profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                })
            ]);

            if (prefRes.ok && profileRes.ok) {
                setMessage("Cambios Guardados");
            } else {
                setMessage("Error al Guardar");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error de Conexión");
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
                <Loader2 className="animate-spin text-brand-red" size={40} />
            </div>
        );
    }

    return (
        <main className="flex bg-[#0A0A0A] min-h-screen text-white font-sans">
            <Sidebar />

            <div className="flex-1 p-6 lg:p-12 overflow-y-auto max-w-5xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Configuración de Alertas</h1>
                    <p className="text-[var(--text-muted)] font-medium text-sm max-w-2xl leading-relaxed">
                        Gestiona cómo y cuándo recibes las notificaciones de vencimiento de tus documentos críticos.
                    </p>
                </header>

                <div className="glass-card bg-[#111] border-white/5 p-6 mb-12 flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                        <div className="size-16 rounded-full bg-foreground/10 border border-white/5 flex items-center justify-center text-brand-red overflow-hidden relative">
                            <span className="icon text-3xl">account_circle</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">{user.name || "Usuario VenciTrack"}</h3>
                            <p className="text-xs font-medium text-[var(--text-muted)] lowercase">{user.email}</p>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        <Edit2 size={12} />
                        Editar Perfil
                    </button>
                </div>

                <section className="mb-14">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="icon text-brand-red text-xl">campaign</span>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/80 italic">Canales de Notificación</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 rounded-[2rem] bg-[#111] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="text-white/20 group-hover:text-white transition-colors">
                                    <Globe size={24} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-black text-sm uppercase tracking-tight">Correo Electrónico</p>
                                    <p className="text-[var(--text-muted)] text-[11px] font-medium">Recibir alertas detalladas en tu bandeja de entrada principal.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={prefs.channels.includes("EMAIL")}
                                    onChange={(e) => {
                                        const next = e.target.checked
                                            ? [...prefs.channels, "EMAIL"]
                                            : prefs.channels.filter(c => c !== "EMAIL");
                                        setPrefs({ ...prefs, channels: next });
                                    }}
                                />
                                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-[2rem] bg-[#111] border border-white/5 opacity-40 grayscale pointer-events-none">
                            <div className="flex items-center gap-5">
                                <div className="text-white/20">
                                    <MessageSquare size={24} />
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-3">
                                        <p className="font-black text-sm uppercase tracking-tight">WhatsApp</p>
                                        <span className="bg-brand-red/20 text-brand-red text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter">Próximamente</span>
                                    </div>
                                    <p className="text-[var(--text-muted)] text-[11px] font-medium">Notificaciones instantáneas directamente en tu móvil.</p>
                                </div>
                            </div>
                            <div className="w-11 h-6 bg-white/5 rounded-full relative">
                                <div className="absolute top-[2px] left-[2px] bg-white/10 rounded-full h-5 w-5"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-[2rem] bg-[#111] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="text-white/20 group-hover:text-white transition-colors">
                                    <Smartphone size={24} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-black text-sm uppercase tracking-tight">Notificaciones Push</p>
                                    <p className="text-[var(--text-muted)] text-[11px] font-medium">Alertas en tiempo real en tu navegador o aplicación móvil.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                            </label>
                        </div>
                    </div>
                </section>

                <section className="mb-14">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="icon text-brand-red text-xl">history</span>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/80 italic">Frecuencia y Anticipación</h2>
                    </div>

                    <div className="glass-card bg-[#111] border-white/5 p-10 rounded-[2.5rem] space-y-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-tight mb-2 uppercase">Primera Alerta de Vencimiento</h3>
                                <p className="text-[var(--text-muted)] text-xs font-medium italic">Selecciona con cuántos días de antelación deseas recibir el primer aviso.</p>
                            </div>

                            <div className="relative pt-6 px-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="1"
                                    value={prefs.anticipationDays}
                                    onChange={(e) => setPrefs({ ...prefs, anticipationDays: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-brand-red absolute left-0"
                                />
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/30 tracking-widest mt-6">
                                    <span className={prefs.anticipationDays === 30 ? "text-brand-red" : ""}>30 Días</span>
                                    <span className={prefs.anticipationDays === 15 ? "text-brand-red" : ""}>15 Días</span>
                                    <span className={prefs.anticipationDays <= 10 && prefs.anticipationDays >= 5 ? "text-brand-red" : ""}>7 Días</span>
                                    <span className={prefs.anticipationDays === 1 ? "text-brand-red" : ""}>1 Día</span>
                                </div>
                                <motion.div
                                    animate={{ left: `${((30 - prefs.anticipationDays) / 29) * 100}%` }}
                                    className="absolute top-2 w-max -translate-x-1/2"
                                >
                                    <div className="bg-brand-red size-3 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-[#111]" />
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-brand-red whitespace-nowrap">{prefs.anticipationDays} DÍAS</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-tight mb-1">Recordatorios Diarios</h3>
                                <p className="text-[var(--text-muted)] text-xs font-medium italic">Enviar alertas cada 24h una vez el documento ha vencido.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={prefs.frequency === "DAILY"}
                                    onChange={(e) => setPrefs({ ...prefs, frequency: e.target.checked ? "DAILY" : "IMMEDIATE" })}
                                />
                                <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-brand-red after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                    </div>
                </section>

                <footer className="mt-16 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="button-red px-12 py-5 rounded-2xl flex items-center gap-4 group transition-all active:scale-95 shadow-[0_20px_40px_rgba(239,68,68,0.2)]"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <span className="icon">save</span>}
                        <span className="font-black uppercase tracking-widest text-sm">Guardar Cambios</span>
                    </button>
                </footer>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-12 right-12 z-50"
                    >
                        <div className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-3xl ${message.includes("Error") ? "bg-brand-red" : "bg-emerald-600"}`}>
                            <CheckCircle size={18} />
                            {message}
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
