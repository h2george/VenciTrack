
import Sidebar from "@/shared/components/layout/Sidebar";

export default function HistoryPage() {
    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col transition-all duration-300 ml-64 p-8 overflow-y-auto">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Historial de Cumplimiento</h1>
                </header>
                <div className="flex-1 bg-card rounded-3xl border border-border p-8 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-muted-foreground text-lg mb-4">Auditoría completa de vencimientos pasados.</p>
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold uppercase tracking-wider">
                            Módulo en Construcción
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}
