/**
 * @file admin/categories/page.tsx
 * @description Admin interface for managing expiration categories.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Settings2, Trash2, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface DocumentType {
    id: string;
    name: string;
    category: string;
    description: string;
    gracePeriodDays: number;
    requiresExpiry: boolean;
    targetType: "PERSON" | "VEHICLE" | "BOTH";
    documents?: any[];
}

export default function CategoriesPage() {
    const [types, setTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        category: "General",
        description: "",
        gracePeriodDays: 30,
        requiresExpiry: true,
        targetType: "BOTH"
    });

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const res = await fetch("/api/admin/document-types");
            const json = await res.json();
            if (json.success) setTypes(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/document-types", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const json = await res.json();
            if (json.success) {
                setModalOpen(false);
                setFormData({ name: "", category: "General", description: "", gracePeriodDays: 30, requiresExpiry: true, targetType: "BOTH" });
                fetchTypes();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
                <Loader2 className="animate-spin text-brand-red" size={48} />
            </div>
        );
    }

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Categorías</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Define las agrupaciones y plazos de alerta para tus vencimientos
                        </p>
                    </div>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="button-red flex items-center gap-2 px-8 py-4 shadow-xl shadow-brand-red/20 transform hover:scale-105 transition-all"
                    >
                        <Plus size={20} />
                        <span className="font-black uppercase tracking-widest text-xs">Nueva Categoría</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {types.map((type) => (
                        <div key={type.id} className="glass-card p-8 border-white/5 hover:border-brand-blue/30 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="size-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                                    <FileText size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-foreground/5 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors">
                                        <Settings2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-brand-blue transition-colors">{type.name}</h3>
                            <p className="text-[var(--text-muted)] text-sm font-bold mb-6 line-clamp-2">{type.description || "Sin descripción proporcionada."}</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Alerta (Gracia)</span>
                                    <span className="font-black text-xs text-brand-red">{type.gracePeriodDays} Días</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Asociación</span>
                                    <span className="font-black text-[10px] uppercase tracking-widest bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full">{type.targetType}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-4">
                                    {type.requiresExpiry ? (
                                        <div className="flex items-center gap-1.5 text-brand-blue">
                                            <CheckCircle2 size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Requiere Vencimiento</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                                            <AlertCircle size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Sin Vencimiento</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setModalOpen(false)}></div>
                        <div className="glass-card relative z-10 w-full max-w-2xl p-10 border-white/10 shadow-3xl shadow-black animate-fade-in-up">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Nueva Categoría de Vencimiento</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Nombre del Activo</label>
                                        <input
                                            required
                                            className="input-premium w-full"
                                            placeholder="Ej: SOAT, Carnet"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Categoría</label>
                                        <select
                                            className="input-premium w-full"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="General">General</option>
                                            <option value="Vehicular">Vehicular</option>
                                            <option value="Personal">Personal</option>
                                            <option value="Legal">Legal</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Descripción (Riesgo)</label>
                                    <textarea
                                        className="input-premium w-full h-32 py-4"
                                        placeholder="Describa el impacto de este documento..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Periodo de Gracia</label>
                                        <input
                                            type="number"
                                            className="input-premium w-full"
                                            value={formData.gracePeriodDays}
                                            onChange={(e) => setFormData({ ...formData, gracePeriodDays: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Asociable a</label>
                                        <select
                                            className="input-premium w-full text-[10px] font-black"
                                            value={formData.targetType}
                                            onChange={(e) => setFormData({ ...formData, targetType: e.target.value as any })}
                                        >
                                            <option value="BOTH">Persona & Vehículo</option>
                                            <option value="PERSON">Solo Persona</option>
                                            <option value="VEHICLE">Solo Vehículo</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col justify-end p-4 bg-foreground/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Vencimiento</span>
                                            <input
                                                type="checkbox"
                                                className="size-5 rounded-lg border-white/10 bg-black/40 text-brand-red focus:ring-brand-red"
                                                checked={formData.requiresExpiry}
                                                onChange={(e) => setFormData({ ...formData, requiresExpiry: e.target.checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-12">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="button-red flex-1 py-5 flex items-center justify-center gap-3"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                                        <span className="font-black uppercase tracking-widest text-sm">Guardar Configuración</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="button-glass px-10 py-5"
                                    >
                                        <span className="font-black uppercase tracking-widest text-sm opacity-50">Cancelar</span>
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
