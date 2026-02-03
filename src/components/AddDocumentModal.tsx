/**
 * @file AddDocumentModal.tsx
 * @description High-fidelity registration interface for new documents. 
 * Implements secure state flows and premium interactive feedback.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Component Properties
 */
interface AddDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

/**
 * Entity definitions for strict typing
 */
interface Subject {
    id: string;
    name: string;
    type: string;
}

interface DocumentType {
    id: string;
    name: string;
}

/**
 * AddDocumentModal Component
 */
export default function AddDocumentModal({ isOpen, onClose, onSuccess }: AddDocumentModalProps): React.ReactElement | null {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [docTypes, setDocTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        subjectId: "",
        documentTypeId: "",
        expiryDate: ""
    });

    useEffect(() => {
        if (isOpen) {
            fetchData();
            setSuccess(false);
            setError("");
        }
    }, [isOpen]);

    /**
     * Synchronizes selection data from the master ledger
     */
    async function fetchData(): Promise<void> {
        setLoading(true);
        try {
            const [subsRes, typesRes] = await Promise.all([
                fetch("/api/subjects"),
                fetch("/api/document-types")
            ]);

            const subsJson = await subsRes.json();
            const typesJson = await typesRes.json();

            if (subsJson.success) setSubjects(subsJson.data);
            if (typesJson.success) setDocTypes(typesJson.data);
        } catch (err) {
            setError("Falla en la sincronización de datos.");
        } finally {
            setLoading(false);
        }
    }

    /**
     * Commits new document protocol to the server
     */
    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/documents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const json = await res.json();

            if (json.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            } else {
                setError(json.error || "Falla al registrar el documento.");
            }
        } catch (err) {
            setError("Error de red. El servidor no responde.");
        } finally {
            setSubmitting(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
            <div className="glass-card w-full max-w-lg p-10 relative overflow-hidden shadow-3xl shadow-black/60 border-brand-red/10 animate-scale-in">
                {/* Atmospheric accents */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/10 blur-3xl rounded-full"></div>

                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                        <h2 className="text-xl font-black uppercase tracking-tight">Nueva Póliza</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-red/10 hover:text-brand-red transition-all"
                    >
                        <span className="icon">close</span>
                    </button>
                </div>

                {success ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
                        <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 shadow-glow shadow-emerald-500/20">
                            <span className="icon text-emerald-500 text-5xl">verified</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Acción Exitosa</h3>
                        <p className="text-[var(--text-muted)] text-[10px] uppercase font-black tracking-widest leading-relaxed">
                            Bóveda actualizada: Registro encriptado y persistido.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {error && (
                            <div className="p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-shake">
                                <span className="icon text-base">emergency_home</span>
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Asociado Maestro</label>
                            <div className="relative group">
                                <span className="icon absolute left-5 text-lg text-[var(--text-muted)] group-focus-within:text-brand-red transition-colors top-1/2 -translate-y-1/2 pointer-events-none">
                                    {subjects.find(s => s.id === formData.subjectId)?.type === 'VEHICLE' ? 'directions_car' : 'person'}
                                </span>
                                <select
                                    required
                                    className="input-premium pl-14 pr-12 py-4 appearance-none w-full"
                                    value={formData.subjectId}
                                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                >
                                    <option value="" disabled className="bg-slate-900">Seleccionar Ente...</option>
                                    {subjects.map(s => (
                                        <option key={s.id} value={s.id} className="bg-slate-900">{s.name} {s.type === 'VEHICLE' ? '[Placa]' : '[Persona]'}</option>
                                    ))}
                                </select>
                                <span className="icon absolute right-5 text-sm text-[var(--text-muted)] pointer-events-none top-1/2 -translate-y-1/2">expand_more</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Tipo de Documento</label>
                            <div className="relative group">
                                <span className="icon absolute left-5 text-lg text-[var(--text-muted)] group-focus-within:text-brand-red transition-colors top-1/2 -translate-y-1/2 pointer-events-none">inventory_2</span>
                                <select
                                    required
                                    className="input-premium pl-14 pr-12 py-4 appearance-none w-full"
                                    value={formData.documentTypeId}
                                    onChange={(e) => setFormData({ ...formData, documentTypeId: e.target.value })}
                                >
                                    <option value="" disabled className="bg-slate-900">Protocolo de Registro...</option>
                                    {docTypes.map(t => (
                                        <option key={t.id} value={t.id} className="bg-slate-900">{t.name}</option>
                                    ))}
                                </select>
                                <span className="icon absolute right-5 text-sm text-[var(--text-muted)] pointer-events-none top-1/2 -translate-y-1/2">expand_more</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Fecha de Expiración</label>
                            <div className="relative group">
                                <span className="icon absolute left-5 text-lg text-[var(--text-muted)] group-focus-within:text-brand-red transition-colors top-1/2 -translate-y-1/2 pointer-events-none">event</span>
                                <input
                                    type="date"
                                    required
                                    className="input-premium pl-14 pr-6 py-4 w-full"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || loading}
                            className={`button-red py-5 flex items-center justify-center gap-4 shadow-xl shadow-brand-red/20 mt-4 ${submitting ? 'opacity-50' : 'hover:scale-[1.02]'}`}
                        >
                            <span className="icon text-lg">{submitting ? 'sync' : 'lock'}</span>
                            <span className="font-black uppercase tracking-widest text-sm">
                                {submitting ? 'Sincronizando...' : 'Consolidar Registro'}
                            </span>
                        </button>

                        <div className="flex items-center justify-center gap-2 opacity-20">
                            <div className="h-px w-8 bg-current"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Protocolo de Seguridad Activo</span>
                            <div className="h-px w-8 bg-current"></div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
