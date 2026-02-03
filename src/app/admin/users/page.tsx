/**
 * @file admin/users/page.tsx
 * @description Master control for user accounts and access levels. 
 * Implements high-fidelity data grids, search protocols, and full CRUD.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit2, Search, Lock, Unlock, Plus, X, Save } from "lucide-react";

/** 
 * Admin User interface
 */
interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
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

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers(): Promise<void> {
        setLoading(true);
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

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleEditUser = (user: AdminUser) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: "", // Leave blank to keep existing
            role: user.role
        });
        setIsModalOpen(true);
    };

    const handleCreateUser = () => {
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "USER"
        });
        setIsModalOpen(true);
    };

    const handleToggleStatus = async (user: AdminUser) => {
        if (!confirm(`¿Estás seguro de que deseas ${user.status === 'ACTIVE' ? 'bloquear' : 'activar'} a este usuario?`)) return;

        try {
            const res = await fetch("/api/admin/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: user.id,
                    status: user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
                })
            });
            const json = await res.json();
            if (json.success) {
                fetchUsers();
            } else {
                alert("Error al actualizar estado: " + json.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = "/api/admin/users";
            const method = editingUser ? "PUT" : "POST";
            const body: any = { ...formData };
            if (editingUser) body.id = editingUser.id;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const json = await res.json();
            if (json.success) {
                setIsModalOpen(false);
                fetchUsers();
            } else {
                alert("Error: " + json.error);
            }
        } catch (error) {
            console.error("Submit error", error);
            alert("Ocurrió un error inesperado.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
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
                {/* Theme Switcher - Top Right */}
                <div className="absolute top-10 right-10 z-[110]">
                    <ThemeToggle />
                </div>
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 px-8 pt-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-4xl font-black tracking-tighter">Usuarios</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Auditoría y control de cuentas
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto">
                        {/* New User Button */}
                        <button
                            onClick={handleCreateUser}
                            className="bg-brand-red text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-red/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Plus size={16} strokeWidth={3} />
                            <span>Nuevo Usuario</span>
                        </button>

                        {/* Search Bar - Compact */}
                        <div className="glass-card flex items-center px-3 py-2 border-white/5 focus-within:border-brand-blue/30 transition-all w-full sm:w-[220px]">
                            <Search size={14} className="text-[var(--text-muted)] mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-xs font-bold w-full placeholder:opacity-40 text-[var(--text)]"
                            />
                        </div>

                        {/* Filter - Compact (Removed due to no company field) */}
                    </div>
                </header>

                <section className="px-8 pb-12">
                    <div className="glass-card p-4 overflow-hidden shadow-2xl shadow-black/20">
                        <div className="overflow-x-auto">
                            <table className="table-premium w-full text-left">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Usuario</th>
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Estado</th>
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Creación</th>
                                        <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-20">
                                                <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black italic opacity-30">
                                                    No se encontraron resultados.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-10 rounded-xl flex items-center justify-center font-black text-white shadow-inner transition-transform group-hover:scale-105 ${user.status === 'ACTIVE' ? 'bg-gradient-to-br from-brand-blue to-cyan-500' : 'bg-gray-600'}`}>
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold text-sm transition-colors ${user.status === 'ACTIVE' ? 'text-[var(--text)]' : 'text-[var(--text-muted)] line-through'}`}>{user.name}</p>
                                                            <p className="text-[10px] text-[var(--text-muted)] font-mono opacity-70">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${user.status === 'ACTIVE'
                                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                                        {user.status === 'ACTIVE' ? 'Activo' : 'Bloqueado'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[10px] font-bold text-[var(--text-muted)]">
                                                        {format(new Date(user.createdAt), "dd MMM yyyy", { locale: es })}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="p-2 rounded-lg hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
                                                            title="Editar Usuario"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(user)}
                                                            className={`p-2 rounded-lg transition-colors ${user.status === 'ACTIVE'
                                                                ? 'hover:bg-red-500/10 hover:text-red-500'
                                                                : 'hover:bg-green-500/10 hover:text-green-500'
                                                                }`}
                                                            title={user.status === 'ACTIVE' ? "Bloquear Acceso" : "Desbloquear Acceso"}
                                                        >
                                                            {user.status === 'ACTIVE' ? <Lock size={16} /> : <Unlock size={16} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Create/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}></div>
                        <div className="glass-card w-full max-w-md p-8 relative z-[210] animate-scale-in shadow-2xl shadow-brand-red/10 border-white/10">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-brand-red transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                    <div className="p-2 bg-brand-red/10 rounded-lg text-brand-red">
                                        {editingUser ? <Edit2 size={24} /> : <Plus size={24} />}
                                    </div>
                                    {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                                </h2>
                                <p className="text-xs font-bold text-[var(--text-muted)] mt-1 ml-1">
                                    {editingUser ? "Actualiza los datos del usuario." : "Registra un nuevo usuario en la plataforma."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] ml-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] ml-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                                        placeholder="correo@empresa.com"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] ml-1">Contraseña {editingUser && <span className="text-[9px] normal-case opacity-50">(Dejar vacío para mantener actual)</span>}</label>
                                    <input
                                        type="password"
                                        required={!editingUser}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] ml-1">Rol</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold focus:border-brand-red/50 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="USER">Usuario (Estándar)</option>
                                        <option value="ADMIN">Administrador</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-xl bg-brand-red text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-red/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        {isSubmitting ? <span className="icon animate-spin">refresh</span> : <Save size={16} />}
                                        {editingUser ? "Guardar Cambios" : "Crear Usuario"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
