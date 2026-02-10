"use client";

import { useState, useEffect } from "react";
import { X, FileText, Upload, Loader2, Save, Trash2 } from "lucide-react";

interface DocumentType {
    id: string;
    name: string;
    category: string;
}

interface AddDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    editDocument?: any; // If provided, we are in edit mode
}

export default function AddDocumentModal({ isOpen, onClose, onSuccess, editDocument }: AddDocumentModalProps) {
    const [loading, setLoading] = useState(false);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [formData, setFormData] = useState({
        documentTypeId: "",
        alias: "",
        expiryDate: "",
        issueDate: "",
        notes: ""
    });

    useEffect(() => {
        if (isOpen) {
            fetchDocumentTypes();
            if (editDocument) {
                // Initialize form with edit data
                setFormData({
                    documentTypeId: editDocument.documentTypeId || "",
                    alias: editDocument.alias || "",
                    expiryDate: editDocument.expiryDate ? editDocument.expiryDate.split('T')[0] : "",
                    issueDate: editDocument.issueDate ? editDocument.issueDate.split('T')[0] : "",
                    notes: editDocument.notes || ""
                });
            } else {
                // Reset form for new document
                setFormData({
                    documentTypeId: "",
                    alias: "",
                    expiryDate: "",
                    issueDate: "",
                    notes: ""
                });
            }
        }
    }, [isOpen, editDocument]);

    const fetchDocumentTypes = async () => {
        try {
            const res = await fetch("/api/admin/document-types");
            const json = await res.json();
            if (json.success) {
                setDocumentTypes(json.data);
            }
        } catch (err) {
            console.error("Error fetching document types:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = editDocument ? `/api/documents/${editDocument.id}` : "/api/documents";
        const method = editDocument ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const json = await res.json();
            if (json.success) {
                onSuccess?.();
                handleClose();
            } else {
                alert("Error: " + (json.error || "Fallo en la operación"));
            }
        } catch (err) {
            console.error("Error saving document:", err);
            alert("Error al guardar el documento");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!editDocument || !confirm("¿Estás seguro de que deseas eliminar este documento?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/documents/${editDocument.id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                onSuccess?.();
                handleClose();
            }
        } catch (err) {
            console.error("Error deleting document:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleClose} />
            <div className="glass-card relative z-10 w-full max-w-2xl p-10 border-white/10 shadow-3xl shadow-black animate-fade-in-up overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                            <FileText className="text-brand-red" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--text)]">
                                {editDocument ? "Editar Documento" : "Nuevo Documento"}
                            </h2>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                {editDocument ? "Actualizar registro" : "Registro de Activo"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="size-10 rounded-xl bg-foreground/5 hover:bg-brand-red/10 hover:text-brand-red transition-all flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">
                                Tipo de Documento
                            </label>
                            <select
                                required
                                className="input-premium w-full"
                                value={formData.documentTypeId}
                                onChange={(e) => setFormData({ ...formData, documentTypeId: e.target.value })}
                            >
                                <option value="">Seleccionar...</option>
                                {documentTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">
                                Identificador (Ej: Placa, ID)
                            </label>
                            <input
                                required
                                type="text"
                                className="input-premium w-full"
                                placeholder="Ej: ABC-123"
                                value={formData.alias}
                                onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">
                                Fecha de Emisión
                            </label>
                            <input
                                type="date"
                                className="input-premium w-full"
                                value={formData.issueDate}
                                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">
                                Fecha de Vencimiento
                            </label>
                            <input
                                required
                                type="date"
                                className="input-premium w-full"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">
                            Notas Adicionales
                        </label>
                        <textarea
                            className="input-premium w-full h-24 py-4"
                            placeholder="Información extra..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="button-red flex-1 py-5 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                editDocument ? <Save size={20} /> : <Upload size={20} />
                            )}
                            <span className="font-black uppercase tracking-widest text-sm">
                                {loading ? "Procesando..." : (editDocument ? "Guardar Cambios" : "Crear Documento")}
                            </span>
                        </button>

                        {editDocument && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="button-glass border-brand-red/20 text-brand-red hover:bg-brand-red/10 px-6 py-5 flex items-center justify-center gap-2"
                            >
                                <Trash2 size={20} />
                                <span className="font-black uppercase tracking-widest text-xs">Eliminar</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleClose}
                            className="button-glass px-10 py-5"
                        >
                            <span className="font-black uppercase tracking-widest text-sm opacity-50">Cancelar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
