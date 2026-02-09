/**
 * @file register/page.tsx
 * @description Account creation interface. Implements secure 
 * multi-step aesthetics and cinematic feedback.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/shared/components/ThemeToggle";

/**
 * RegisterPage Component
 * @returns {React.ReactElement} The rendered registration view.
 */
export default function RegisterPage(): React.ReactElement {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/dashboard");
            } else {
                setError(data.error || "Fallo en creación de identidad.");
            }
        } catch (err) {
            setError("Error de red: Registro interrumpido.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-[var(--bg)] overflow-hidden relative py-20 transition-colors duration-500 selection:bg-brand-red/30">
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-brand-blue/10 blur-[120px] rounded-full animate-float opacity-20"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-brand-red/10 blur-[120px] rounded-full animate-pulse-slow opacity-20"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg p-6">
                <div className="absolute top-0 right-6">
                    <ThemeToggle />
                </div>

                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="group mb-8">
                        <div className="size-16 rounded-2xl bg-brand-red flex items-center justify-center shadow-2xl shadow-brand-red/20 group-hover:scale-110 transition-transform">
                            <span className="icon text-white text-3xl">verified_user</span>
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter mb-2 text-center text-[var(--text)] uppercase">Únete a VenciTrack</h1>
                    <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.3em] text-[10px] italic text-center">
                        Gestiona tus documentos y evita multas
                    </p>
                </div>

                <div className="glass-card p-10 border-[var(--border)] bg-[var(--card)]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                            <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-shake">
                                <span className="icon text-base">warning</span>
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Tu Nombre</label>
                            <input
                                type="text"
                                required
                                className="input-premium px-6 py-4"
                                placeholder="Tu nombre completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Correo Electrónico</label>
                            <input
                                type="email"
                                required
                                className="input-premium px-6 py-4"
                                placeholder="correo@vencitrack.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Contraseña</label>
                            <input
                                type="password"
                                required
                                className="input-premium px-6 py-4"
                                placeholder="Min 8 caracteres"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`button-red py-5 flex items-center justify-center gap-3 shadow-xl mt-4 ${loading ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                        >
                            <span className="icon">{loading ? 'sync' : 'how_to_reg'}</span>
                            <span className="font-black uppercase tracking-widest text-sm">
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[var(--border)] text-center">
                        <p className="text-[var(--text-muted)] text-xs font-bold">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/login" className="text-brand-red hover:underline font-black uppercase tracking-widest ml-1 text-[10px]">
                                Ingresar a mi cuenta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
