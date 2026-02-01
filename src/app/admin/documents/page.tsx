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
 * @returns {JSX.Element} The rendered global document registry.
 */
export default function AdminDocumentsPage(): JSX.Element {
    const [documents, setDocuments] = useState<GlobalDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAdminDocs(): Promise<void> {
            try {
                const res = await fetch("/api/documents");
                const json = await res.json();
                if (json.success) setDocuments(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAdminDocs();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-vh-100 bg-[var(--bg)] text-[var(--text)]">
                <div className="flex flex-col items-center gap-4">
                    <span className="icon animate-spin text-4xl text-brand-red">progress_activity</span>
                    <p className="font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-[10px]">Indexando Bóveda Global...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Bóveda Global</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Control centralizado de vigencias y protocolos legales
                        </p>
                    </div>
                </header>

                <section className="glass-card p-4 overflow-hidden shadow-2xl shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="table-premium w-full text-left">
                            <thead>
                                <tr className="border-b border-[var(--border)]">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Documento / Propietario</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Asociado</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Expiración</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Estado</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-32">
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black italic opacity-30">
                                                Bóveda global desierta: No se detectan registros.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    documents.map((doc) => (
                                        <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-6 font-bold">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-brand-red uppercase tracking-tight">{doc.documentType?.name || 'Documento'}</span>
                                                    <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{doc.user?.name || 'Sistema'}</span>
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
                                                <span className="stat-pill text-[9px] bg-emerald-500/10 text-emerald-500 border-none px-4 font-black tracking-widest uppercase">
                                                    VALIDO
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <button className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-brand-red/10 hover:text-brand-red transition-all">
                                                    <span className="icon text-lg">policy</span>
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
