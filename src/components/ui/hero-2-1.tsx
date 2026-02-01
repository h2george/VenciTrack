"use client";

import { useState } from "react";
import { ArrowRight, Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * Hero2 Component - Humanized for VenciTrack
 * @description Focuses on task management, clear calls to action, and 
 * simplified vocabulary. Features a high-fidelity screen mockup.
 */
const Hero2 = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative overflow-hidden bg-white dark:bg-black selection:bg-brand-red/30 transition-colors duration-500">
            {/* Background Gradients */}
            <div className="flex flex-col items-end absolute -right-60 -top-10 blur-3xl z-0 pointer-events-none opacity-50 dark:opacity-100">
                <div className="h-[15rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[8rem] from-brand-red/10 to-brand-blue/10"></div>
                <div className="h-[15rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[8rem] from-brand-red/5 to-yellow-500/5"></div>
            </div>

            {/* Content container */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="container mx-auto flex items-center justify-between px-6 py-6 lg:px-12">
                    <Link href="/" className="flex items-center group transition-all active:scale-95">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white shadow-lg shadow-brand-red/10">
                            <ShieldCheck size={22} />
                        </div>
                        <span className="ml-3 text-xl font-black text-black dark:text-white tracking-tighter">VenciTrack</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login" className="h-12 w-40 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-black uppercase tracking-widest text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95">
                            Ingresar
                        </Link>
                        <Link href="/register" className="h-12 w-40 rounded-2xl bg-brand-red flex items-center justify-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-brand-red/20 hover:scale-105 transition-all active:scale-95">
                            Registrarse
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden size-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-black dark:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </nav>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 flex flex-col p-8 bg-white dark:bg-black md:hidden"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <Link href="/" className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <span className="ml-3 text-xl font-black text-black dark:text-white tracking-tighter">VenciTrack</span>
                                </Link>
                                <button onClick={() => setMobileMenuOpen(false)} className="size-10 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-black dark:text-white">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                <Link href="/login" className="w-full h-14 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center text-sm font-black uppercase tracking-widest text-black dark:text-white">
                                    Ingresar
                                </Link>
                                <Link href="/register" className="w-full h-14 rounded-2xl bg-brand-red flex items-center justify-center text-sm font-black uppercase tracking-widest text-white">
                                    Registrarse
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero content */}
                <div className="container mx-auto mt-20 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
                            No dejes que se te pase ni una fecha
                        </span>
                        <ArrowRight className="h-3 w-3 text-brand-red" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-4xl text-5xl font-black tracking-tighter text-black dark:text-white md:text-6xl lg:text-7xl leading-[1.1]"
                    >
                        Control total de tus <br className="hidden md:block" /> <span className="text-brand-red">vencimientos</span> importantes.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto mt-8 max-w-2xl text-base md:text-lg text-black/60 dark:text-white/50 font-medium leading-relaxed"
                    >
                        Desde documentos de tu vehículo hasta citas médicas e hipotecas. Recibe recordatorios preventivos por correo electrónico para que siempre estés al día.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
                    >
                        <Link href="/register" className="h-14 w-full sm:w-64 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-xs font-black uppercase tracking-widest text-white dark:text-black hover:scale-[1.02] transition-all shadow-2xl shadow-black/10 active:scale-95">
                            Empieza gratis ahora
                        </Link>
                    </motion.div>

                    {/* Screenshot Placeholder - High Fidelity Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative mx-auto mt-20 w-full max-w-5xl"
                    >
                        <div className="absolute inset-0 bg-brand-red/10 blur-[10rem] opacity-30 dark:opacity-20 pointer-events-none" />

                        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] aspect-[16/10] sm:aspect-[16/9] flex flex-col">
                            {/* Browser Header */}
                            <div className="h-8 md:h-12 w-full bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="size-2 md:size-3 rounded-full bg-red-500/20" />
                                    <div className="size-2 md:size-3 rounded-full bg-yellow-500/20" />
                                    <div className="size-2 md:size-3 rounded-full bg-green-500/20" />
                                </div>
                                <div className="mx-auto w-1/3 h-4 md:h-6 rounded-lg bg-black/5 dark:bg-white/5" />
                            </div>
                            {/* Screenshot Image - Grayscale */}
                            <div className="flex-1 w-full relative overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                                    alt="VenciTrack Dashboard Mockup"
                                    className="w-full h-full object-cover grayscale opacity-10 dark:opacity-20"
                                />
                                <div className="absolute inset-0 flex items-center justify-center flex-col p-12">
                                    <div className="w-full max-w-3xl space-y-6 text-left">
                                        <div className="h-8 w-48 rounded-2xl bg-black/10 dark:bg-white/20 animate-pulse" />
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="h-24 rounded-3xl bg-black/5 dark:bg-white/10 animate-pulse" />
                                            <div className="h-24 rounded-3xl bg-black/5 dark:bg-white/10 animate-pulse" />
                                            <div className="h-24 rounded-3xl bg-black/5 dark:bg-white/10 animate-pulse" />
                                        </div>
                                        <div className="h-64 rounded-[2rem] bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-red/50" />
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
