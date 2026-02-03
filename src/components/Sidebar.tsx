/**
 * @file Sidebar.tsx
 * @description Master navigation component. Implements high-fidelity brand identity 
 * and kinetic interaction states.
 */

"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Sidebar Component
 * @returns {React.ReactElement} The fixed navigation sidebar.
 */
export default function Sidebar(): React.ReactElement {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.role === 'ADMIN') {
                    setIsAdmin(true);
                }
            })
            .catch(err => console.error("Error checking role", err));
    }, []);

    const userLinks = [
        { href: '/dashboard', label: 'Bóveda Viva', icon: 'dashboard' },
        { href: '/documents', label: 'Inventario', icon: 'inventory_2' },
        { href: '/subjects', label: 'Asociados', icon: 'group' },
    ];

    const adminLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { href: '/admin/users', label: 'Usuarios', icon: 'manage_accounts' },
        { href: '/admin/documents', label: 'Docs Global', icon: 'database' },
        { href: '/admin/audit-logs', label: 'Bitácora', icon: 'history' },
        { href: '/admin/integrations', label: 'Integraciones', icon: 'hub' },
    ];

    const links = isAdmin ? [...userLinks, ...adminLinks.filter(l => l.href !== '/dashboard')] : userLinks;

    /**
     * Termina la sesión del usuario con limpieza de estado
     */
    async function handleLogout(): Promise<void> {
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <aside className="sidebar-premium flex flex-col p-8 border-r border-[var(--border-glass)] bg-[var(--sidebar-bg)] backdrop-blur-3xl fixed h-screen w-[300px] z-[500] selection:bg-brand-red/20 overflow-y-auto">
            {/* Branding - High Fidelity */}
            <Link href="/dashboard" className="flex items-center gap-4 mb-14 group px-2">
                <div className="size-11 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-xl shadow-brand-red/10 group-hover:scale-110 transition-transform duration-500">
                    <span className="icon text-white text-2xl">verified_user</span>
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-tighter text-[var(--text-primary)] leading-none mb-1">VenciTrack</h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] italic">Security Vault</p>
                </div>
            </Link>

            {/* Navigation Sections */}
            <div className="flex flex-col gap-10">
                <nav className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-40 px-3 mb-4">Operaciones Base</p>
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-brand-red/10 text-brand-red shadow-inner shadow-brand-red/5' : 'text-[var(--text-secondary)] hover:bg-[var(--border-glass)] hover:text-[var(--text-primary)]'}`}
                            >
                                <span className={`icon text-2xl transition-transform group-hover:scale-110 ${isActive ? 'text-brand-red' : 'text-[var(--text-muted)] group-hover:text-brand-red'}`}>
                                    {link.icon}
                                </span>
                                <span className="font-black text-[13px] tracking-tight uppercase tracking-widest">{link.label}</span>
                                {isActive && <div className="ml-auto size-1.5 rounded-full bg-brand-red shadow-glow shadow-brand-red/50 animate-pulse"></div>}
                            </Link>
                        );
                    })}
                </nav>

                {/* System Management */}
                <nav className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-3 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-40">Núcleo Sistema</p>
                        <ThemeToggle />
                    </div>

                    <Link
                        href="/settings"
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${pathname === '/settings' ? 'bg-brand-blue/10 text-brand-blue' : 'text-[var(--text-secondary)] hover:bg-[var(--border-glass)] hover:text-[var(--text-primary)]'}`}
                    >
                        <span className={`icon text-2xl ${pathname === '/settings' ? 'text-brand-blue' : 'text-[var(--text-muted)] group-hover:text-brand-blue'}`}>settings</span>
                        <span className="font-black text-[13px] tracking-widest uppercase">Ajustes</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group text-brand-red/60 hover:text-brand-red hover:bg-brand-red/5 w-full text-left"
                    >
                        <span className="icon text-2xl group-hover:animate-pulse">
                            {isLoggingOut ? 'sync' : 'logout'}
                        </span>
                        <span className="font-black text-[13px] tracking-widest uppercase">
                            {isLoggingOut ? 'Desconexión...' : 'Cerrar Protocolo'}
                        </span>
                    </button>
                </nav>
            </div>

            {/* AI Callout - Dynamic Visual */}
            <div className="mt-14 px-2">
                <div className="glass-card p-6 bg-gradient-to-br from-brand-blue/10 to-transparent border-brand-blue/20 group hover:border-brand-blue/40 transition-all cursor-default">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue shadow-glow shadow-brand-blue/50"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">IA Terminal</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] font-bold leading-relaxed mb-4">
                        Analizador de riesgos documentales activo.
                    </p>
                    <button className="w-full py-2.5 rounded-xl bg-brand-blue/10 text-brand-blue font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all duration-300">
                        Iniciar Escaneo
                    </button>
                </div>
            </div>
        </aside>
    );
}
