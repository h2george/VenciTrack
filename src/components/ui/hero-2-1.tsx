"use client";

import { useState } from "react";
import { ArrowRight, Menu, X, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Hero2 Component - Humanized for VenciTrack
 * @description Focuses on task management, clear calls to action, and 
 * simplified vocabulary. Features a high-fidelity screen mockup.
 */
const Hero2 = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative overflow-hidden bg-[var(--background)] selection:bg-brand-red/30 transition-colors duration-500">
            {/* Background Gradients - Enhanced for depth */}
            <div className="absolute -right-60 -top-10 blur-3xl z-0 pointer-events-none opacity-40 dark:opacity-60 overflow-hidden">
                <div className="h-[25rem] rounded-full w-[60rem] bg-gradient-to-r from-brand-red/20 via-brand-blue/20 to-yellow-500/10 animate-pulse"></div>
            </div>

            {/* Content container */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="container mx-auto flex items-center justify-between px-6 py-8 lg:px-12">
                    <Link href="/" className="flex items-center group transition-all active:scale-95">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red text-white shadow-2xl shadow-brand-red/20 group-hover:rotate-6 transition-transform">
                            <ShieldCheck size={26} />
                        </div>
                        <span className="ml-4 text-2xl font-black text-[var(--foreground)] tracking-tighter uppercase">VenciTrack</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/login" className="px-8 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                            Ingresar
                        </Link>
                        <Link href="/register" className="px-8 py-3 rounded-2xl bg-brand-red text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-brand-red/30 hover:scale-105 transition-all">
                            Registrarse
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden size-12 flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 text-[var(--foreground)] glass-panel"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Hero content */}
                <div className="container mx-auto mt-24 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mx-auto mb-10 flex max-w-fit items-center justify-center space-x-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-5 py-2.5"
                    >
                        <div className="size-2 rounded-full bg-brand-red animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)] opacity-50">
                            Innovación en Gestión Documental
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-5xl text-6xl font-black tracking-tighter text-[var(--foreground)] md:text-8xl leading-[0.95] uppercase"
                    >
                        Prever es <br /> <span className="text-brand-red italic">no perder.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-10 max-w-2xl text-lg md:text-xl text-[var(--foreground)] opacity-60 font-bold leading-relaxed uppercase tracking-wide"
                    >
                        Controlamos tus fechas críticas para evitar multas, pérdida de seguros y riesgos legales. Gestión inteligente, recordatorios implacables.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0"
                    >
                        <Link href="/register" className="h-16 w-full sm:w-72 rounded-[2rem] bg-black dark:bg-white flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-white dark:text-black hover:scale-105 transition-all shadow-premium active:scale-95">
                            Crea tu cuenta de riesgo
                        </Link>
                    </motion.div>

                    {/* Screenshot Mockup - Glassmorphism Pro */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative mx-auto mt-32 w-full max-w-6xl animate-float"
                    >
                        <div className="absolute -inset-10 bg-brand-red/10 blur-[130px] opacity-30 pointer-events-none" />

                        <div className="relative overflow-hidden rounded-[3rem] glass-panel p-2 shadow-2xl">
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--background)] aspect-[16/10] flex flex-col">
                                {/* Browser Chrome */}
                                <div className="h-14 w-full bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 flex items-center px-6 gap-3">
                                    <div className="flex gap-2">
                                        <div className="size-3 rounded-full bg-red-500/30" />
                                        <div className="size-3 rounded-full bg-yellow-500/30" />
                                        <div className="size-3 rounded-full bg-green-500/30" />
                                    </div>
                                    <div className="mx-auto w-1/4 h-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" />
                                </div>
                                {/* Inner GUI Content */}
                                <div className="flex-1 w-full relative overflow-hidden bg-[var(--background)]">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-brand-red opacity-50" />
                                    <div className="flex flex-col p-12 gap-10">
                                        <div className="flex justify-between items-center">
                                            <div className="h-8 w-60 rounded-2xl bg-black/10 dark:bg-white/10" />
                                            <div className="h-12 w-12 rounded-2xl bg-brand-red/20" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-8">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-40 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]" />
                                            ))}
                                        </div>
                                        <div className="flex-1 rounded-[3rem] border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-transparent via-brand-red/5 to-transparent animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export { Hero2 };
