"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForceChangePasswordModal({ isOpen }: { isOpen: boolean }) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleUpdatePassword(e: React.FormEvent) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.success) {
                router.push("/dashboard");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Error al actualizar la contraseña");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="glass-card w-full max-w-md p-10 animate-fade-in border-brand-red/30">
                <div className="flex flex-col items-center gap-4 mb-8 text-center">
                    <div className="size-16 rounded-2xl bg-brand-red/10 flex items-center justify-center border border-brand-red/20">
                        <span className="icon text-brand-red text-3xl">lock_reset</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">Acceso Condicional</h2>
                    <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                        Se requiere actualización de credenciales por protocolo de seguridad inicial.
                    </p>
                </div>

                <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6">
                    {error && (
                        <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red p-4 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            {error}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Nuevo Código de Acceso</label>
                        <input
                            type="password"
                            required
                            className="input-premium px-6 py-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Confirmar Código</label>
                        <input
                            type="password"
                            required
                            className="input-premium px-6 py-4"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="button-red py-5 font-black uppercase tracking-widest text-sm"
                    >
                        {loading ? 'Actualizando Acceso...' : 'Asegurar Cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
}
