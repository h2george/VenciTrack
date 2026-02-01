/**
 * @file documents/page.tsx
 * @description Master inventory of documents. Implements high-fidelity 
 * status tracking and detailed reporting.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AddDocumentModal from "@/components/AddDocumentModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Interface for Document entities
 */
interface Document {
    id: string;
    expiryDate: string;
    subject: {
        name: string;
        type: 'VEHICLE' | 'PERSON';
    };
    documentType: {
        name: string;
    };
}

/**
 * DocumentsPage Component
 * @returns {JSX.Element} The rendered documents list.
 */
export default function DocumentsPage(): JSX.Element {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    async function fetchDocuments(): Promise<void> {
        setLoading(true);
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

    return (
        <main className="flex bg-[var(--bg)] min-h-screen text-[var(--text)]">
            <Sidebar />
            <div className="main-premium flex-1">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
                            <h1 className="text-5xl font-black tracking-tighter">Bóveda Documental</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Control absoluto sobre la vigencia de tus activos
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        id="btn-add-vault"
                        className="button-red px-8 py-4 flex items-center gap-3 shadow-xl shadow-brand-red/10"
                    >
                        <span className="icon">add_circle</span>
                        <span className="font-black uppercase tracking-widest text-sm">Nueva Póliza</span>
                    </button>
                </header>

                <section className="glass-card p-10 min-h-[500px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-32 gap-6 opacity-30">
                            <span className="icon animate-spin text-4xl">progress_activity</span>
                            <p className="uppercase tracking-[0.4em] font-black italic text-xs">Descifrando Registros...</p>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-32 gap-8 text-center bg-gray-500/5 rounded-3xl border border-dashed border-white/10">
                            <div className="size-24 rounded-full bg-foreground/5 flex items-center justify-center">
                                <span className="icon text-6xl opacity-10">inventory_2</span>
                            </div>
                            <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black">
                                Bóveda sin registros activos
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="p-8 rounded-[2.5rem] border border-[var(--border)] bg-[var(--card-glass)] hover:bg-[var(--card-glass-hover)] transition-all flex flex-col gap-8 group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="size-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shadow-inner">
                                            <span className="icon text-2xl text-[var(--text-muted)]">
                                                {doc.subject.type === 'VEHICLE' ? 'directions_car' : 'account_circle'}
                                            </span>
                                        </div>
                                        <span className="stat-pill text-[9px] bg-emerald-500/10 text-emerald-500 border-none px-3 font-black tracking-widest uppercase">
                                            Vidente
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-black text-xl mb-2 tracking-tight group-hover:text-brand-red transition-colors">
                                            {doc.documentType.name}
                                        </h3>
                                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] italic border-l-2 border-brand-red pl-3">
                                            {doc.subject.name}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-[var(--border)] flex justify-between items-end">
                                        <div>
                                            <p className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-[0.2em] mb-1">Expiración</p>
                                            <p className="font-black text-lg text-[var(--text-primary)] leading-none">
                                                {format(new Date(doc.expiryDate), "dd MMM yyyy", { locale: es })}
                                            </p>
                                        </div>
                                        <button className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-brand-red/10 hover:text-brand-red transition-all flex items-center justify-center group/btn">
                                            <span className="icon text-xl group-hover/btn:scale-110">more_horiz</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <AddDocumentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchDocuments}
            />
        </main>
    );
}
