"use client";

import { useState } from "react";
import { format, isBefore, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Car, User, MoreVertical, Edit2, Trash2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentTableProps {
    documents: any[];
    onEdit: (doc: any) => void;
    onDelete: (id: string) => void;
}

export default function DocumentTable({ documents, onEdit, onDelete }: DocumentTableProps) {
    const [activeRow, setActiveRow] = useState<string | null>(null);

    const getStatusInfo = (expiryDate: string) => {
        const date = new Date(expiryDate);
        const now = new Date();
        const inAWeek = addDays(now, 7);
        const inAMonth = addDays(now, 30);

        if (isBefore(date, now)) return { label: "Vencido", color: "bg-red-500/10 text-red-500 border-red-500/20" };
        if (isBefore(date, inAWeek)) return { label: "Crítico", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
        if (isBefore(date, inAMonth)) return { label: "Próximo", color: "bg-brand-red/10 text-brand-red border-brand-red/20" };
        return { label: "Protegido", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
    };

    if (documents.length === 0) {
        return (
            <div className="p-32 text-center flex flex-col items-center gap-4 opacity-30">
                <FileText size={64} strokeWidth={1} />
                <p className="font-black uppercase tracking-widest text-xs italic">Sin registros coincidentes</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-50 border-b border-white/5">
                        <th className="px-8 py-6">Tipo</th>
                        <th className="px-8 py-6">Documento</th>
                        <th className="px-8 py-6">Sujeto</th>
                        <th className="px-8 py-6">Vencimiento</th>
                        <th className="px-8 py-6">Estado</th>
                        <th className="px-8 py-6 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                    {documents.map((doc) => {
                        const status = getStatusInfo(doc.expiryDate);
                        const Icon = doc.subject?.type === 'VEHICLE' ? Car : User;

                        return (
                            <tr key={doc.id} className="group hover:bg-white/[0.01] transition-colors">
                                <td className="px-8 py-7">
                                    <div className="size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-muted)] group-hover:text-white transition-colors">
                                        <Icon size={18} />
                                    </div>
                                </td>
                                <td className="px-8 py-7">
                                    <div className="flex flex-col">
                                        <span className="font-black text-sm tracking-tight">{doc.alias || doc.documentType?.name}</span>
                                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide opacity-60">
                                            {doc.documentType?.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-7">
                                    <span className="text-sm font-bold text-white/80">{doc.subject?.name}</span>
                                </td>
                                <td className="px-8 py-7">
                                    <span className="text-sm font-black tracking-tight">
                                        {format(new Date(doc.expiryDate), "MMM dd, yyyy", { locale: es })}
                                    </span>
                                </td>
                                <td className="px-8 py-7">
                                    <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                                        {status.label}
                                    </span>
                                </td>
                                <td className="px-8 py-7 text-right relative">
                                    <button
                                        onClick={() => setActiveRow(activeRow === doc.id ? null : doc.id)}
                                        className="size-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-[var(--text-muted)] transition-all"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    <AnimatePresence>
                                        {activeRow === doc.id && (
                                            <>
                                                <div className="fixed inset-0 z-[140]" onClick={() => setActiveRow(null)} />
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    className="absolute right-12 top-16 z-[150] w-48 glass-card p-2 border-white/10 shadow-3xl"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={() => { onEdit(doc); setActiveRow(null); }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-colors"
                                                    >
                                                        <Edit2 size={14} className="text-emerald-500" />
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => { onDelete(doc.id); setActiveRow(null); }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs font-black uppercase tracking-widest text-brand-red transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                        Eliminar
                                                    </button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
