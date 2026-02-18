import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from "@/shared/components/layout/ThemeToggle";

const LandingHero = () => {
    return (
        <div className="relative overflow-hidden bg-background text-foreground">
            {/* Minimal Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -z-10" />

            <nav className="container mx-auto flex items-center justify-between px-6 py-6 border-b border-border/40">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="size-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="mr-2">
                        <ThemeToggle />
                    </div>
                    <Link to="/login" className="hidden md:block text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors px-4">
                        Ingresar
                    </Link>
                    <Link to="/register" className="bg-brand-red hover:bg-brand-red/90 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-brand-red/10">
                        Registrarse
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-20 lg:py-32 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight"
                >
                    VENCITRACK <br />
                    Prever es <br />
                    <span className="text-brand-blue">no perder.</span>
                </motion.h1>

                <p className="max-w-2xl mx-auto text-muted font-medium text-lg md:text-xl mb-10 leading-relaxed">
                    Gestionamos tus vencimientos críticos con tecnología preventiva para que nunca más pagues una multa.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/register"
                        className="w-full sm:w-auto h-14 px-10 inline-flex items-center justify-center bg-brand-red text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-red/20"
                    >
                        Empezar Gratis
                    </Link>
                    <Link
                        to="/login"
                        className="w-full sm:w-auto h-14 px-10 inline-flex items-center justify-center bg-background border-2 border-border text-foreground rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-muted/10 transition-all"
                    >
                        Ver Demo
                    </Link>
                </div>
            </div>
        </div>
    );
};

export { LandingHero };
