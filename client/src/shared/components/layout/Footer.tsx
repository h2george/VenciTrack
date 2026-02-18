import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-border py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="size-8 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-lg font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                        </Link>
                        <p className="text-muted max-w-sm font-medium leading-relaxed">
                            Plataforma premium para el monitoreo y control de vencimientos críticos. Tecnología preventiva al servicio de tu tranquilidad.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black uppercase text-sm mb-6">Producto</h4>
                        <ul className="space-y-4">
                            <li><Link to="/features" className="text-muted hover:text-brand-blue font-bold text-sm transition-colors">Características</Link></li>
                            <li><Link to="/pricing" className="text-muted hover:text-brand-blue font-bold text-sm transition-colors">Precios</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black uppercase text-sm mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link to="/privacy" className="text-muted hover:text-brand-blue font-bold text-sm transition-colors">Privacidad</Link></li>
                            <li><Link to="/terms" className="text-muted hover:text-brand-blue font-bold text-sm transition-colors">Términos</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted text-xs font-bold uppercase tracking-widest">
                        © 2026 VenciTrack. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-muted font-bold uppercase tracking-widest italic">Hecho con precisión digital</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
