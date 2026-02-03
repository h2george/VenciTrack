/**
 * @file Sidebar.tsx
 * @description Master navigation component. Implements high-fidelity brand identity 
 * and kinetic interaction states. Supports collapsible mode.
 */

"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from "@/components/ThemeToggle";
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Sidebar Component
 * @returns {React.ReactElement} The responsive and collapsible navigation sidebar.
 */
export default function Sidebar(): React.ReactElement {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Initial load for collapse state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem("sidebar-collapsed");
        if (savedState === "true") {
            setIsCollapsed(true);
            document.documentElement.style.setProperty('--sidebar-width', '100px');
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '280px');
        }

        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.role === 'ADMIN') {
                    setIsAdmin(true);
                }
            })
            .catch(err => console.error("Error checking role", err));
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebar-collapsed", newState.toString());
        document.documentElement.style.setProperty('--sidebar-width', newState ? '100px' : '280px');
    };

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
        <aside
            className={`sidebar-premium flex flex-col p-6 border-r border-[var(--border)] bg-[var(--card)] backdrop-blur-3xl fixed h-screen z-[500] selection:bg-brand-red/20 overflow-y-auto overflow-x-hidden ${isCollapsed ? 'items-center px-4' : ''}`}
            style={{ width: 'var(--sidebar-width)' }}
        >
            {/* Collapse Toggle Control */}
            <button
                onClick={toggleCollapse}
                className={`absolute right-4 top-13 size-8 rounded-xl bg-[var(--bg-soft)] border border-[var(--border)] text-[var(--text)] flex items-center justify-center shadow-lg hover:border-brand-red/40 hover:text-brand-red active:scale-95 transition-all z-[501] group/toggle`}
                title={isCollapsed ? "Expandir" : "Contraer"}
            >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Branding */}
            <Link href="/dashboard" className={`flex items-center gap-3 mb-14 group ${isCollapsed ? 'justify-center px-0' : 'px-1 mr-8'}`}>
                <div className="size-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-xl shadow-brand-red/10 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <span className="icon text-white text-xl">verified_user</span>
                </div>
                {!isCollapsed && (
                    <div className="animate-fade-in whitespace-nowrap overflow-hidden">
                        <h2 className="text-lg font-black tracking-tighter text-[var(--text)] leading-none mb-1">VenciTrack</h2>
                        <p className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--text-muted)] italic">Security Vault</p>
                    </div>
                )}
            </Link>

            {/* Navigation Sections */}
            <div className="flex flex-col gap-10">
                <nav className="flex flex-col gap-1.5">
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-40 mb-3 ${isCollapsed ? 'text-center' : 'px-3'}`}>
                        {isCollapsed ? '•••' : 'Operaciones Base'}
                    </p>
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-brand-red/10 text-brand-red shadow-inner shadow-brand-red/5' : 'text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)]'} ${isCollapsed ? 'justify-center px-0' : ''}`}
                                title={isCollapsed ? (link.label === 'Bóveda Viva' ? 'Panel Principal' : link.label) : ""}
                            >
                                <span className={`icon text-2xl transition-transform group-hover:scale-110 ${isActive ? 'text-brand-red' : 'text-[var(--text-muted)] group-hover:text-brand-red'} shrink-0`}>
                                    {link.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="font-black text-[12px] tracking-widest uppercase animate-fade-in whitespace-nowrap overflow-hidden text-ellipsis">
                                        {link.label === 'Bóveda Viva' ? 'Panel Principal' : link.label}
                                    </span>
                                )}
                                {!isCollapsed && isActive && <div className="ml-auto size-1.5 rounded-full bg-brand-red shadow-glow shadow-brand-red/50 animate-pulse"></div>}
                            </Link>
                        );
                    })}
                </nav>

                {/* System Management */}
                <nav className="flex flex-col gap-1.5">
                    {!isCollapsed && (
                        <div className="flex items-center justify-between px-3 mb-3 animate-fade-in">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-40">Sistema</p>
                            <ThemeToggle />
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="flex justify-center mb-4 scale-75">
                            <ThemeToggle />
                        </div>
                    )}

                    <Link
                        href="/settings"
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname === '/settings' ? 'bg-brand-blue/10 text-brand-blue' : 'text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)]'} ${isCollapsed ? 'justify-center px-0' : ''}`}
                        title={isCollapsed ? "Ajustes" : ""}
                    >
                        <span className={`icon text-2xl ${pathname === '/settings' ? 'text-brand-blue' : 'text-[var(--text-muted)] group-hover:text-brand-blue'} shrink-0`}>settings</span>
                        {!isCollapsed && (
                            <span className="font-black text-[12px] tracking-widest uppercase animate-fade-in whitespace-nowrap">Ajustes</span>
                        )}
                    </Link>

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group text-brand-red/60 hover:text-brand-red hover:bg-brand-red/5 w-full text-left ${isCollapsed ? 'justify-center px-0' : ''}`}
                        title={isCollapsed ? "Cerrar Sesión" : ""}
                    >
                        <span className="icon text-2xl group-hover:animate-pulse shrink-0">
                            {isLoggingOut ? 'sync' : 'logout'}
                        </span>
                        {!isCollapsed && (
                            <span className="font-black text-[12px] tracking-widest uppercase animate-fade-in whitespace-nowrap">
                                {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
                            </span>
                        )}
                    </button>
                </nav>
            </div>
        </aside>
    );
}
