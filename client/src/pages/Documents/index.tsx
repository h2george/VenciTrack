
import Sidebar from "@/shared/components/layout/Sidebar";
import { FileText, Plus, Search, Filter, MoreVertical, AlertTriangle, CheckCircle } from "lucide-react";

export default function DocumentsPage() {
    // Mock Data mimicking what roles would see (their own documents)
    const documents = [
        { id: 1, name: "SOAT Camioneta AB-123", type: "Seguro Vehicular", expiry: "2026-03-15", status: "VALID", entity: "RIMAC Seguros" },
        { id: 2, name: "Revisión Técnica", type: "Certificado", expiry: "2026-02-20", status: "WARNING", entity: "CITV Lima" },
        { id: 3, name: "Contrato de Alquiler", type: "Legal", expiry: "2026-06-01", status: "VALID", entity: "Inmobiliaria Centenario" },
        { id: 4, name: "Licencia de Funcionamiento", type: "Permiso", expiry: "2025-12-31", status: "CRITICAL", entity: "Municipalidad de Lima" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VALID': return 'text-green-500 bg-green-500/10';
            case 'WARNING': return 'text-amber-500 bg-amber-500/10';
            case 'CRITICAL': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'VALID': return 'Vigente';
            case 'WARNING': return 'Por Vencer';
            case 'CRITICAL': return 'Vencido';
            default: return status;
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col transition-all duration-300 ml-64 p-8 overflow-y-auto">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Mis Documentos</h1>
                        <p className="text-muted-foreground">Gestiona y monitorea tus documentos activos.</p>
                    </div>
                    <button className="h-12 px-6 bg-primary text-primary-foreground font-bold rounded-xl text-sm uppercase tracking-wide hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                        <Plus size={20} />
                        Nuevo Documento
                    </button>
                </header>

                {/* Filters & Search */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar documentos, pólizas o entidades..."
                            className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                        />
                    </div>
                    <button className="px-4 py-3 bg-card border border-border rounded-xl flex items-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                        <Filter size={20} />
                        <span>Filtros</span>
                    </button>
                </div>

                {/* Documents Table */}
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="p-4 pl-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Documento</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Entidad / Asociado</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Vencimiento</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Estado</th>
                                <th className="p-4 pr-6 text-right font-bold text-xs uppercase tracking-wider text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-muted/20 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight">{doc.name}</p>
                                                <p className="text-xs text-muted-foreground">{doc.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium">{doc.entity}</td>
                                    <td className="p-4 text-sm font-mono text-muted-foreground">{doc.expiry}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getStatusColor(doc.status)}`}>
                                            {doc.status === 'VALID' && <CheckCircle size={12} />}
                                            {doc.status === 'WARNING' && <AlertTriangle size={12} />}
                                            {getStatusLabel(doc.status)}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="size-8 rounded-lg hover:bg-background hover:border border-transparent hover:border-border inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
