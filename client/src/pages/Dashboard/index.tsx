import Sidebar from "@/shared/components/layout/Sidebar";
import { ShieldCheck, FileText, AlertTriangle, Bell } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 pl-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black tracking-tighter uppercase">Terminal de Control</h1>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        Sistema Activo
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Documentos Activos</span>
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FileText size={18} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black">124</h3>
                            <span className="text-xs font-bold text-green-500">+12%</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Próx. Vencimientos</span>
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <AlertTriangle size={18} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black">7</h3>
                            <span className="text-xs font-bold text-muted-foreground">En 30 días</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Alertas Críticas</span>
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                <Bell size={18} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-red-500">2</h3>
                            <span className="text-xs font-bold text-red-500 animate-pulse">Acción Requerida</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cumplimiento</span>
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <ShieldCheck size={18} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-emerald-500">98%</h3>
                            <span className="text-xs font-bold text-muted-foreground">Nivel Óptimo</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
