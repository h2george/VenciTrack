"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter, ShieldCheck } from "lucide-react"
import Link from "next/link"

/**
 * Footerdemo Component - Optimized for VenciTrack
 * @description Master footer with fixed theme switching and simplified navigation.
 */
function Footerdemo() {
    const [isDarkMode, setIsDarkMode] = React.useState(true)

    // Sync state with HTML class on mount and whenever isDarkMode changes
    React.useLayoutEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        const initialDark = storedTheme === "dark" || (!storedTheme && document.documentElement.classList.contains("dark"))
        setIsDarkMode(initialDark)

        if (initialDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = (checked: boolean) => {
        setIsDarkMode(checked)
        if (checked) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <footer className="relative border-t border-black/5 dark:border-white/5 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-6 py-16 md:px-12">
                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 font-black tracking-tighter text-xl">
                            <ShieldCheck className="text-brand-red" size={24} />
                            <span>VenciTrack</span>
                        </div>
                        <p className="mb-8 text-black/50 dark:text-white/40 text-sm font-medium leading-relaxed">
                            La herramienta simple para que nunca olvides tus fechas de vencimiento importantes.
                        </p>
                        <form className="relative group max-w-sm">
                            <Input
                                type="email"
                                placeholder="Recibe novedades"
                                className="pr-12 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:border-brand-red/50 transition-all rounded-xl h-12 text-xs font-bold"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-transform active:scale-90"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Contacto</h3>
                        <div className="space-y-4 text-sm font-medium text-black/60 dark:text-white/60">
                            <p className="hover:text-brand-red transition-colors cursor-pointer">Lima, Perú</p>
                            <p className="hover:text-brand-red transition-colors cursor-pointer">hola@vencitrack.com</p>
                        </div>
                    </div>

                    {/* Social & Theme Section */}
                    <div>
                        <h3 className="mb-6 text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Redes</h3>
                        <div className="mb-8 flex space-x-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 size-11">
                                            <Facebook className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Facebook</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 size-11">
                                            <Instagram className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Instagram</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 size-11">
                                            <Twitter className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Twitter</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 size-11">
                                            <Linkedin className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>LinkedIn</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-2xl w-fit group">
                            <Sun className={`h-4 w-4 transition-colors ${!isDarkMode ? 'text-brand-red' : 'text-black/20 dark:text-white/20'}`} />
                            <Switch
                                id="theme-toggle"
                                checked={isDarkMode}
                                onCheckedChange={toggleTheme}
                                className="data-[state=checked]:bg-brand-red data-[state=unchecked]:bg-black/20 dark:data-[state=unchecked]:bg-white/20"
                            />
                            <Moon className={`h-4 w-4 transition-colors ${isDarkMode ? 'text-brand-blue' : 'text-black/20 dark:text-white/20'}`} />
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-black/5 dark:border-white/5 pt-10 text-center md:flex-row">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/20 dark:text-white/20">
                        © 2026 VenciTrack. Todos los derechos reservados.
                    </p>
                    <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-black/20 dark:text-white/20">
                        <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacidad</Link>
                        <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Legales</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
