/**
 * @file subjects/page.tsx
 * @description Catalog of entities (vehicles/persons). Implements premium 
 * layout patterns and interaction states.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

/** 
 * Interface for Associate entities
 */
interface Subject {
    id: string;
    name: string;
    type: 'VEHICLE' | 'PERSON';
    _count?: {
        documents: number;
    };
}

/**
 * SubjectsPage Component
 * @returns {JSX.Element} The rendered associates gallery.
 */
export default function SubjectsPage(): JSX.Element {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubjects();
    }, []);

    async function fetchSubjects(): Promise<void> {
        setLoading(true);
        try {
            const res = await fetch("/api/subjects");
            const json = await res.json();
            if (json.success) setSubjects(json.data);
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
                            <h1 className="text-5xl font-black tracking-tighter">Asociados</h1>
                        </div>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.2em] text-[10px] italic ml-1">
                            Personas y vehículos en el núcleo de seguridad
                        </p>
                    </div>
                    <button
                        className="button-red px-8 py-4 flex items-center gap-3 shadow-xl shadow-brand-red/10 animate-fade-in"
                        id="btn-new-associate"
                    >
                        <span className="icon">person_add</span>
                        <span className="font-black uppercase tracking-widest text-sm">Nuevo Asociado</span>
                    </button>
                </header>

                <section className="glass-card p-10 min-h-[500px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-32 gap-6 opacity-30">
                            <span className="icon animate-spin text-4xl">progress_activity</span>
                            <p className="uppercase tracking-[0.4em] font-black italic text-xs">Vinculando Datos...</p>
                        </div>
                    ) : subjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-32 gap-8 text-center bg-gray-500/5 rounded-3xl border border-dashed border-white/10">
                            <div className="size-24 rounded-full bg-foreground/5 flex items-center justify-center">
                                <span className="icon text-6xl opacity-10">group</span>
                            </div>
                            <p className="text-[var(--text-muted)] uppercase tracking-widest text-xs font-black">
                                Bóveda de asociados vacía
                            </p>
                            <button className="button-glass px-6 py-2 text-[10px] font-black uppercase tracking-widest">
                                Inicializar Directorio
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {subjects.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="p-8 rounded-[2.5rem] border border-[var(--border)] bg-[var(--card-glass)] hover:bg-[var(--card-glass-hover)] transition-all group cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-black/5"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="size-16 rounded-3xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center transition-transform group-hover:scale-110">
                                            <span className="icon text-brand-blue text-3xl">
                                                {sub.type === 'VEHICLE' ? 'directions_car' : 'fingerprint'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl mb-1 group-hover:text-brand-red transition-colors">{sub.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-full">
                                                    {sub.type}
                                                </span>
                                                <span className="size-1 rounded-full bg-brand-red animate-pulse"></span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-brand-red">
                                                    {sub._count?.documents || 0} Docs Sincronizados
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
