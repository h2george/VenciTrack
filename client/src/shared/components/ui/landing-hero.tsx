import { ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from "@/shared/components/layout/ThemeToggle";
import { Glow } from "@/shared/components/ui/glow";
import { Mockup } from "@/shared/components/ui/mockup";

const LandingHero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-32 lg:pt-44 pb-24">

            {/* ── Background atmosphere ─────────────────────────────────────── */}
            {/* Primary blue blob — centred, large, pulsing */}
            <Glow
                variant="blue"
                size="xl"
                opacity={0.28}
                pulse
                className="top-[-10%] left-1/2 -translate-x-1/2"
            />
            {/* Red accent — top-right */}
            <Glow
                variant="red"
                size="lg"
                opacity={0.18}
                pulse
                className="top-[5%] -right-32"
            />
            {/* Emerald accent — bottom-left */}
            <Glow
                variant="emerald"
                size="md"
                opacity={0.15}
                className="bottom-[15%] -left-24 animate-float [animation-delay:2s]"
            />

            {/* ── Sticky nav ───────────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/70 backdrop-blur-2xl border-b border-border/30">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-2.5 group transition-all active:scale-95">
                        <div className="size-10 rounded-xl bg-brand-blue text-white flex items-center justify-center
                                        shadow-lg shadow-brand-blue/30 group-hover:rotate-6 transition-transform duration-300">
                            <ShieldCheck size={22} />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase text-foreground">VenciTrack</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            to="/register"
                            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-xl
                                       bg-brand-red text-white text-xs font-black uppercase tracking-widest
                                       hover:bg-brand-red/90 hover:shadow-lg hover:shadow-brand-red/30
                                       transition-all active:scale-95"
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero content ─────────────────────────────────────────────── */}
            <div className="container mx-auto px-6 text-center relative z-10 w-full">

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                               bg-surface-soft border border-border/60 mb-10"
                >
                    <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                        Protege tu operatividad · 100% gratuito
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase leading-[0.88] italic mb-8"
                >
                    Control{" "}
                    <span className="relative inline-block text-brand-blue">
                        Total
                        {/* Glow behind the word */}
                        <span className="absolute inset-0 blur-3xl bg-brand-blue/40 -z-10 scale-110" />
                    </span>
                    <br />
                    <span className="text-foreground">Sin Multas</span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.9 }}
                    className="max-w-2xl mx-auto text-muted font-semibold text-lg md:text-2xl mb-12 leading-snug px-4"
                >
                    La plataforma profesional gratuita que{" "}
                    <span className="text-foreground font-black">garantiza</span> tu operatividad
                    eliminando los pagos por mora.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    {/* Primary CTA */}
                    <Link
                        to="/register"
                        className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center
                                   bg-brand-red text-white rounded-2xl text-base font-black uppercase tracking-widest
                                   hover:scale-105 hover:bg-brand-red/90
                                   hover:shadow-[0_0_40px_-4px_var(--brand-red)]
                                   transition-all duration-300 active:scale-95 group"
                    >
                        Empezar Ahora
                        <Zap size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        to="/login"
                        className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center
                                   bg-surface/60 backdrop-blur-xl border border-border text-foreground
                                   rounded-2xl text-base font-black uppercase tracking-widest
                                   hover:bg-surface hover:border-brand-blue/40
                                   hover:shadow-[0_0_24px_-4px_var(--brand-blue)]
                                   transition-all duration-300 active:scale-95"
                    >
                        Ingresar
                        <ArrowRight size={18} className="ml-2 opacity-50" />
                    </Link>
                </motion.div>

                {/* ── Mockup ───────────────────────────────────────────────── */}
                <Mockup>
                    <div className="w-full h-full bg-surface relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Plataforma VenciTrack"
                            className="w-full h-full object-cover opacity-90 group-hover:scale-[1.03]
                                       transition-transform duration-[1200ms] ease-out grayscale-[0.1]"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

                        {/* Floating alert badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-8 left-8 p-3.5 rounded-2xl
                                       bg-background/85 backdrop-blur-md border border-border/60
                                       shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-brand-red flex items-center justify-center text-white font-black text-sm">!</div>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-foreground leading-none">Vencimiento Próximo</div>
                                    <div className="text-[8px] font-bold text-muted mt-1">SOAT · Vehículo ABC-123 · 3 días</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating success badge */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            className="absolute bottom-8 right-8 p-3.5 rounded-2xl
                                       bg-background/85 backdrop-blur-md border border-border/60
                                       shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-sm">✓</div>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-foreground leading-none">Documento Al Día</div>
                                    <div className="text-[8px] font-bold text-muted mt-1">Seguro EPS · Renovado</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Mockup>
            </div>
        </section>
    );
};

export { LandingHero };
