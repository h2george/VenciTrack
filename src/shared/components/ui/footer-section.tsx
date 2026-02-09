"use client"



import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, ShieldCheck } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/shared/components/ThemeToggle";
import { useEffect, useState } from "react";
import { APP_VERSION } from "@/shared/lib/versions";

/**
 * Footerdemo Component - Optimized for VenciTrack
 * @description Master footer using the unified ThemeToggle for consistency.
 */
function Footerdemo() {
    const [apiVersion, setApiVersion] = useState<string>("loading...");

    useEffect(() => {
        fetch("/api/version")
            .then(res => res.json())
            .then(data => setApiVersion(data.version))
            .catch(() => setApiVersion("unknown"));
    }, []);

    return (
        <footer className="relative border-t border-black/5 dark:border-white/5 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
            <div className="container mx-auto px-6 py-16 md:px-12">
                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 font-black tracking-tighter text-xl text-[var(--foreground)]">
                            <ShieldCheck className="text-brand-red" size={24} />
                            <span>VenciTrack</span>
                        </div>
                        <p className="mb-8 text-[var(--text-muted)] text-sm font-medium leading-relaxed">
                            La herramienta simple para que nunca olvides tus fechas de vencimiento importantes.
                        </p>
                        <form className="relative group max-w-sm">
                            <Input
                                type="email"
                                placeholder="Recibe novedades"
                                className="pr-12 input-premium h-12 text-xs font-bold"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-transform active:scale-90 border-none"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Contacto</h3>
                        <div className="space-y-4 text-sm font-medium text-[var(--text-muted)]">
                            <p className="hover:text-brand-red transition-colors cursor-pointer">Lima, Perú</p>
                            <p className="hover:text-brand-red transition-colors cursor-pointer">hola@vencitrack.com</p>
                        </div>
                    </div>

                    {/* Social & Theme Section */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Redes y Preferencias</h3>
                        <div className="mb-8 flex space-x-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-[var(--border)] bg-[var(--card)] hover:bg-[var(--bg-soft)] text-[var(--foreground)] size-11">
                                            <Facebook className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Facebook</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-[var(--border)] bg-[var(--card)] hover:bg-[var(--bg-soft)] text-[var(--foreground)] size-11">
                                            <Instagram className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Instagram</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-[var(--border)] bg-[var(--card)] hover:bg-[var(--bg-soft)] text-[var(--foreground)] size-11">
                                            <Linkedin className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>LinkedIn</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Unified Theme Controller */}
                        <div className="flex flex-col gap-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Apariencia del Sistema</p>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[var(--border)] pt-10 text-center md:flex-row">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">
                            © 2026 VenciTrack. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-30">
                            <span>App v{APP_VERSION}</span>
                            <span className="opacity-50">|</span>
                            <span>API v{apiVersion}</span>
                        </div>
                    </div>
                    <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">
                        <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacidad</Link>
                        <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Legales</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
