import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingHero = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative overflow-hidden bg-background">
            <nav className="container mx-auto flex items-center justify-between px-6 py-8">
                <Link to="/" className="flex items-center group">
                    <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="ml-3 text-xl font-black tracking-tighter uppercase">VenciTrack</span>
                </Link>
                <div className="hidden md:flex gap-6">
                    <Link to="/login" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Ingresar</Link>
                    <Link to="/register" className="text-sm font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-all">Registrarse</Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 pt-24 pb-48 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6"
                >
                    Prever es <br /><span className="text-primary italic">no perder.</span>
                </motion.h1>
                <p className="max-w-2xl mx-auto text-muted-foreground font-medium text-lg md:text-xl mb-12">
                    Gestionamos tus vencimientos críticos con tecnología preventiva para que nunca más pagues una multa.
                </p>
                <Link to="/register" className="inline-flex h-14 px-12 items-center justify-center bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                    Crea tu cuenta ahora
                </Link>
            </div>
        </div>
    );
};

export { LandingHero };
