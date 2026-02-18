import { ShieldCheck } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-background border-t border-border py-20">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col items-center gap-6 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="size-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                    </div>
                    <p className="text-muted max-w-lg font-medium leading-relaxed">
                        Protegiendo la operatividad de profesionales y empresas con tecnología preventiva.
                        Tu tranquilidad es nuestro único objetivo.
                    </p>
                </div>

                <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-muted text-xs font-bold uppercase tracking-widest">
                        © 2026 VenciTrack. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-muted font-black uppercase tracking-tighter">Sistemas 100% Operativos</span>
                        </div>
                        <span className="text-[10px] text-muted font-black uppercase tracking-widest opacity-50">Hecho con precisión digital</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
