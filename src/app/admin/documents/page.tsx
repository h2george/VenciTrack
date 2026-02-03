/**
 * @file admin/documents/page.tsx
 * @description Master ledger for all documents across the system. 
 * Implements administrative oversight and global registry access.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, Plus, UploadCloud, ShieldCheck } from "lucide-react";

/**
 * Interface for Global Document entities
 */
interface GlobalDocument {
    id: string;
    expiryDate: string;
    user: {
        name: string;
    };
    subject: {
        name: string;
    };
    documentType: {
        name: string;
    };
}

/**
 * AdminDocumentsPage Component
 * @returns {React.ReactElement} The rendered global document registry.
 */
export default function AdminDocumentsPage(): React.ReactElement {
    const [documents, setDocuments] = useState<GlobalDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);

    const fetchAdminDocs = async () => {
        try {
            const res = await fetch("/api/documents");
            const json = await res.json();
            if (json.success) setDocuments(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminDocs();
    }, []);

    const handleBulkImport = async () => {
        const confirm = window.confirm("¿Deseas ejecutar el protocolo de Carga Masiva (Demo)?");
        if (!confirm) return;

        setImporting(true);
        try {
            const res = await fetch("/api/admin/bulk-import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [
                        {
                            subjectName: "Demo Flota A",
                            subjectType: "VEHICLE",
                            typeName: "Seguro Vehicular",
                            category: "LEGAL",
                            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                        },
                        {
                            subjectName: "Operador Juan",
                            subjectType: "PERSON",
                            typeName: "Licencia de Conducir",
                            category: "PERSONAL",
                            expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
                        }
                    ]
                })
            });

            const data = await res.json();
            if (data.success) {
                alert(`Protocolo Completado. Creados: ${data.created}`);
                fetchAdminDocs();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setImporting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text)]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-brand-red" size={40} />
                    <p className="font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-[10px]">Cargando Historial Global...</p>
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
                            <h1 className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">Historial Global</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Control centralizado de vigencias y alertas de todos los usuarios
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBulkImport}
                            disabled={importing}
                            className="button-glass px-8 py-4 flex items-center gap-3 border-brand-blue/20 hover:border-brand-blue/50 transform active:scale-95 transition-all"
                        >
                            {importing ? <Loader2 className="animate-spin text-brand-blue" size={20} /> : <UploadCloud size={20} className="text-brand-blue" />}
                            <span className="font-black uppercase tracking-widest text-xs">Carga Masiva</span>
                        </button>
                    </div>
                </header>

                <section className="glass-card p-4 overflow-hidden shadow-2xl shadow-black/20 border-white/5">
                    <div className="overflow-x-auto">
                        <table className="table-premium w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Vencimiento / Propietario</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Asociado</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Expiración</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Estado</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {documents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-32">
                                            <div className="flex flex-col items-center opacity-30">
                                                <Plus size={48} className="mb-4" />
                                                <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black italic">
                                                    Bóveda global desierta: No se detectan registros.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    documents.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-brand-red uppercase tracking-tight">{doc.documentType?.name || 'Vencimiento'}</span>
                                                    <span className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] opacity-60">{doc.user?.name || 'Sistema'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-1 h-3 w-1 bg-brand-blue rounded-full"></div>
                                                    <span className="text-sm font-bold text-[var(--text-secondary)]">{doc.subject?.name || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-sm font-black text-[var(--text-muted)]">
                                                    {format(new Date(doc.expiryDate), "dd MMM yyyy", { locale: es })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="stat-pill text-[9px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 font-black tracking-widest uppercase">
                                                    ACTIVO
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button className="inline-flex size-10 rounded-xl bg-foreground/5 items-center justify-center hover:bg-brand-red/10 hover:text-brand-red transition-all border border-white/5">
                                                    <ShieldCheck size={18} />
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
