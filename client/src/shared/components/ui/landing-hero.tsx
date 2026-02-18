import { ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from "@/shared/components/layout/ThemeToggle";
import { Glow } from "@/shared/components/ui/glow";
import { Mockup } from "@/shared/components/ui/mockup";

const LandingHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 lg:pt-48 pb-20">
            {/* Background Atmosphere */}
            <Glow variant="blue" size="xl" className="-top-40 left-1/2 -translate-x-1/2 opacity-20" />
            <Glow variant="red" size="lg" className="top-1/4 -right-20 opacity-10 animate-float" />
            <Glow variant="emerald" size="md" className="bottom-1/4 -left-20 opacity-10 animate-float [animation-delay:2s]" />

            <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-2 group transition-all active:scale-95">
                        <div className="size-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20 group-hover:rotate-6 transition-transform duration-300">
                            <ShieldCheck size={22} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/register" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-black uppercase tracking-widest hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20 active:scale-95">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Badge Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-soft border border-border/50 mb-8"
                >
                    <div className="size-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">Protege tu operatividad</span>
                </motion.div>

                {/* Main Headline with Glow Text */}
                <div className="max-w-5xl mx-auto mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] italic"
                    >
                        Control <span className="text-brand-blue relative">
                            Total
                            <span className="absolute inset-0 blur-2xl bg-brand-blue/20 -z-10" />
                        </span> <br />
                        <span className="text-foreground">Sin Multas</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="max-w-2xl mx-auto text-muted font-semibold text-lg md:text-2xl mb-12 leading-tight tracking-tight px-4"
                >
                    La plataforma profesional gratuita que <span className="text-foreground">garantiza</span> tu operatividad eliminando los pagos por mora.
                </motion.p>

                {/* CTAs with interaction */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
                >
                    <Link
                        to="/register"
                        className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center bg-brand-red text-white rounded-2xl text-base font-black uppercase tracking-widest hover:scale-105 hover:bg-brand-red/90 hover:shadow-2xl hover:shadow-brand-red/40 transition-all active:scale-95 group"
                    >
                        Empezar Ahora
                        <Zap size={18} className="ml-2 group-hover:rotate-12 transition-transform animate-pulse" />
                    </Link>
                    <Link
                        to="/login"
                        className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center bg-surface/50 backdrop-blur-xl border border-border text-foreground rounded-2xl text-base font-black uppercase tracking-widest hover:bg-surface transition-all active:scale-95"
                    >
                        Ingresar
                        <ArrowRight size={18} className="ml-2 opacity-50" />
                    </Link>
                </motion.div>

                {/* Mockup Display */}
                <Mockup className="mt-8">
                    <div className="w-full h-full bg-surface relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Plataforma VenciTrack"
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 grayscale-[0.1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />

                        {/* Fake UI Overlays */}
                        <div className="absolute top-10 left-10 p-4 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 shadow-2xl animate-float">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-brand-red flex items-center justify-center text-white font-black italic">!</div>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-foreground leading-none">Vencimiento Próximo</div>
                                    <div className="text-[8px] font-bold text-muted mt-1 underline decoration-brand-red">SOAT Vehículo ABC-123</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Mockup>
            </div>
        </section>
    );
};

export { LandingHero };

