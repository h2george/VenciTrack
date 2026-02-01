/**
 * @file login/page.tsx
 * @description Authentication gateway. Implements high-contrast cinematic
 * aesthetics and secure form protocols.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * LoginPage Component
 * @returns {JSX.Element} The rendered login view.
 */
export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/dashboard");
            } else {
                setError(data.error || "Credenciales inválidas en el núcleo.");
            }
        } catch (err) {
            setError("Fallo de conexión: Protocolo interrumpido.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-[var(--bg)] overflow-hidden relative selection:bg-brand-red/30">
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[35%] bg-brand-red/5 blur-[120px] rounded-full animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="absolute top-0 right-6">
                    <ThemeToggle />
                </div>

                <div className="flex flex-col items-center mb-12 animate-fade-in-up">
                    <Link href="/" className="group mb-8">
                        <div className="size-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-2xl shadow-brand-red/20 group-hover:scale-110 transition-transform">
                            <span className="icon text-white text-3xl">verified_user</span>
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">VenciTrack</h1>
                    <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.3em] text-[10px] italic">Bóveda Digital de Seguridad</p>
                </div>

                <div className="glass-card p-10 shadow-2xl shadow-black/40 border-white/5 animate-fade-in">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                            <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-shake">
                                <span className="icon text-base">emergency_home</span>
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Identidad Digital (Email)</label>
                            <input
                                type="email"
                                required
                                className="input-premium px-6 py-4"
                                placeholder="agente@vencitrack.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Código de Acceso</label>
                            <input
                                type="password"
                                required
                                className="input-premium px-6 py-4"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`button-red py-5 flex items-center justify-center gap-3 shadow-xl shadow-brand-red/20 mt-4 ${loading ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                        >
                            <span className="icon">{loading ? 'sync' : 'login'}</span>
                            <span className="font-black uppercase tracking-widest text-sm">
                                {loading ? 'Validando...' : 'Iniciar Protocolo'}
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-[var(--text-muted)] text-xs font-bold">
                            ¿Aún no tienes acceso?{" "}
                            <Link href="/register" className="text-brand-red hover:underline font-black uppercase tracking-widest ml-1 text-[10px]">
                                Solicitar Registro
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
