import { ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from "@/shared/components/layout/ThemeToggle";

const LandingHero = () => {
    return (
        <div className="relative overflow-hidden bg-background text-foreground min-h-[90vh] flex flex-col justify-center">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-blue/10 rounded-full blur-[140px] -z-10 animate-pulse-glow" />
            <div className="absolute top-[20%] right-[10%] size-64 bg-brand-red/5 rounded-full blur-[100px] -z-10 animate-float" />
            <div className="absolute bottom-[10%] left-[5%] size-48 bg-emerald-500/5 rounded-full blur-[80px] -z-10 animate-float [animation-delay:2s]" />

            <nav className="absolute top-0 left-0 right-0 z-50 container mx-auto flex items-center justify-between px-6 py-8">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="size-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-2xl shadow-brand-blue/40 group-hover:rotate-12 transition-transform duration-500">
                        <ShieldCheck size={26} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link to="/register" className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-brand-red/20 active:scale-95">
                        Comenzar Gratis
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 pt-32 pb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-[120px] font-black tracking-tighter uppercase mb-8 leading-[0.85] italic selection:bg-brand-blue selection:text-white"
                    >
                        Control <span className="text-brand-blue">Total</span> <br />
                        <span className="relative inline-block">
                            Sin Multas
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 1 }}
                                className="absolute -bottom-2 left-0 h-4 bg-brand-red/20 -z-10 skew-x-12"
                            />
                        </span>
                    </motion.h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="max-w-3xl mx-auto text-muted font-semibold text-xl md:text-3xl mb-16 leading-tight tracking-tight px-4"
                >
                    La plataforma profesional gratuita que <span className="text-foreground">garantiza</span> tu operatividad eliminando los pagos por mora.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        to="/register"
                        className="w-full sm:w-auto h-20 px-16 inline-flex items-center justify-center bg-brand-red text-white rounded-[2rem] text-lg font-black uppercase tracking-widest hover:scale-105 hover:bg-brand-red/90 active:scale-95 transition-all shadow-2xl shadow-brand-red/30 group"
                    >
                        Empezar Ahora
                        <Zap size={20} className="ml-3 group-hover:fill-current animate-pulse" />
                    </Link>
                    <Link
                        to="/login"
                        className="w-full sm:w-auto h-20 px-16 inline-flex items-center justify-center bg-surface/50 backdrop-blur-xl border-2 border-border text-foreground rounded-[2rem] text-lg font-black uppercase tracking-widest hover:bg-surface transition-all active:scale-95"
                    >
                        Ingresar
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export { LandingHero };
