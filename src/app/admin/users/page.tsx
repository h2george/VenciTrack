/**
 * @file admin/users/page.tsx
 * @description Master control for user accounts and access levels. 
 * Implements high-fidelity data grids and search protocols.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/** 
 * Admin User interface
 */
interface AdminUser {
    id: string;
    name: string;
    email: string;
    company?: string;
    createdAt: string;
    _count: {
        documents: number;
        subjects: number;
    };
}

/**
 * AdminUsersPage Component
 * @returns {React.ReactElement} The rendered user management view.
 */
export default function AdminUsersPage(): React.ReactElement {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchUsers(): Promise<void> {
            try {
                const res = await fetch("/api/admin/users");
                const json = await res.json();
                if (json.success) setUsers(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.company?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-vh-100 bg-[var(--bg)]">
                <div className="flex flex-col items-center gap-4">
                    <span className="icon animate-spin text-4xl text-brand-red">progress_activity</span>
                    <p className="font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-[10px]">Escaneando Base de Usuarios...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Gestión de Usuarios</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Auditoría y control de identidades en la red maestra
                        </p>
                    </div>

                    <div className="glass-card flex items-center gap-4 px-6 py-4 border-white/5 focus-within:border-brand-red/30 transition-all">
                        <span className="icon text-[var(--text-muted)]">search</span>
                        <input
                            type="text"
                            placeholder="Buscar en el núcleo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-bold w-full lg:w-[300px] placeholder:opacity-30"
                        />
                    </div>
                </header>

                <section className="glass-card p-4 overflow-hidden shadow-2xl shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="table-premium w-full text-left">
                            <thead>
                                <tr className="border-b border-[var(--border)]">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Entidad</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Organización</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Activos Sincronizados</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Registro</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-32">
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black italic opacity-30">
                                                No se detectan firmas digitales en esta frecuencia.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-black text-brand-blue shadow-inner group-hover:scale-110 transition-transform">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-base group-hover:text-brand-red transition-colors">{user.name}</p>
                                                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wide truncate max-w-[200px]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-sm font-bold text-[var(--text-secondary)]">
                                                    {user.company || "Asociado Independiente"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 transition-transform">
                                                <div className="flex gap-3">
                                                    <div className="stat-pill bg-brand-blue/10 text-brand-blue border-none px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                                                        {user._count.documents} Vaults
                                                    </div>
                                                    <div className="stat-pill bg-foreground/5 text-[var(--text-muted)] border-none px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                                                        {user._count.subjects} Subjs
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">
                                                    {format(new Date(user.createdAt), "dd MMM yyyy", { locale: es })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <button className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-brand-red/10 hover:text-brand-red transition-all">
                                                    <span className="icon text-lg">admin_panel_settings</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
