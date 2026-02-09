/**
 * @file dashboard/page.tsx
 * @description Master Dashboard of VenciTrack. 
 * Refactored under Kaizen principles to use modular components and centralized queries.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import AddDocumentModal from "@/shared/components/AddDocumentModal";
import StatsGrid from "@/shared/components/dashboard/StatsGrid";
import DocumentTable from "@/shared/components/dashboard/DocumentTable";
import { Plus, Search, Calendar, ChevronDown, Loader2 } from "lucide-react";

export default function Dashboard(): React.ReactElement {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const docsRes = await fetch("/api/documents");
      const docsJson = await docsRes.json();
      if (docsJson.success) setDocuments(docsJson.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doc: any) => {
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este documento?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredDocs = documents.filter(doc =>
    (doc.alias || doc.documentType?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.subject?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatus = (expiryDate: string) => {
    const date = new Date(expiryDate);
    const now = new Date();
    const inAMonth = new Date();
    inAMonth.setDate(now.getDate() + 30);
    return date < inAMonth ? (date < now ? "Vencido" : "Próximo") : "Protegido";
  };

  const stats = [
    { label: "Total Documentos", value: documents.length, change: "0%", color: "text-white" },
    { label: "En Riesgo", value: documents.filter(d => getStatus(d.expiryDate) !== "Protegido").length, change: "+2", color: "text-brand-red" },
    { label: "Próximo Mes", value: documents.filter(d => getStatus(d.expiryDate) === "Próximo").length, change: "-1", color: "text-brand-blue" }
  ];

  if (loading && documents.length === 0) {
    return (
      <div className="flex items-center justify-center min-vh-100 bg-[var(--bg)]">
        <Loader2 className="animate-spin text-brand-red size-10" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#0A0A0A] text-[var(--text)] font-sans">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase">Dashboard</h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)] italic">
              Gestión Unificada de Vencimientos
            </p>
          </div>
          <button
            onClick={() => { setEditingDoc(null); setIsModalOpen(true); }}
            className="button-red px-8 py-4 flex items-center gap-3 active:scale-95 group transition-all shadow-premium"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span className="font-black uppercase tracking-widest text-sm">Registrar Documento</span>
          </button>
        </header>

        <StatsGrid stats={stats} />

        {/* Table Interface */}
        <div className="glass-card bg-[#111] border-white/5 overflow-visible">
          {/* Controls */}
          <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-center border-b border-white/5">
            <div className="flex gap-4 w-full md:w-auto">
              <button className="button-glass px-5 py-3 text-[10px] font-black uppercase flex items-center gap-2">
                Asociado <ChevronDown size={14} />
              </button>
              <button className="button-glass px-5 py-3 text-[10px] font-black uppercase flex items-center gap-2">
                Mes de Vencimiento <Calendar size={14} />
              </button>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-red transition-colors" size={18} />
              <input
                type="text"
                placeholder="Buscar documento..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-none focus:border-brand-red/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <DocumentTable
            documents={filteredDocs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <AddDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        editDocument={editingDoc}
      />
    </main>
  );
}
