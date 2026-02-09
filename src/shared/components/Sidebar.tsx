"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Shield,
    FolderKanban,
    Zap,
    AlertTriangle,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    CircleDot
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

/**
 * @file Sidebar.tsx
 * @description Ultra-Premium Navigation Terminal for VenciTrack.
 * Features: Adaptive roles, collapsed mode, real-time counters, 
 * and military-grade aesthetics.
 */

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
    adminOnly?: boolean;
}

const navItems: NavItem[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard
    },
    {
        href: "/settings",
        label: "Configuración",
        icon: Settings
    }
];

const adminItems: NavItem[] = [
    {
        href: "/admin/users",
        label: "Usuarios",
        icon: Users
    },
    {
        href: "/admin/categories",
        label: "Categorías",
        icon: FolderKanban
    },
    {
        href: "/admin/integrations",
        label: "Integraciones",
        icon: Zap
    },
    {
        href: "/admin/settings",
        label: "Protocolos Sistema",
        icon: Shield
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [stats, setStats] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);

        fetchStats();
        checkAuth();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/stats");
            const data = await res.json();
            if (data.success) setStats(data.data);
        } catch (err) {
            console.error("Sidebar sync error");
        }
    };

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.success && data.data.role === 'ADMIN') setIsAdmin(true);
        } catch (err) {
            console.error("Auth sync error");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    const criticalCount = stats?.urgencyLevels?.critical || 0;

    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col shadow-2xl
                ${isCollapsed ? 'w-24' : 'w-72'}
                ${isMobile ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
            `}
        >
            {/* Collapse Toggle - Floating */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 size-6 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg border border-white/20 hover:scale-110 active:scale-90 transition-all z-[110]"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Brand Logo Section */}
            <div className={`p-6 border-b border-white/5 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} overflow-hidden`}>
                <div className="size-8 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-3xl shadow-brand-red/40 shrink-0">
                    <ShieldCheck size={18} />
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="min-w-0"
                    >
                        <h1 className="text-base font-black tracking-tighter text-[var(--text-sidebar-title)] leading-none uppercase truncate">Vencitrack</h1>
                        <div className="flex items-center gap-1.5 mt-1">
                            <CircleDot size={8} className="text-emerald-500 animate-pulse" />
                            <span className="text-[7px] font-black uppercase tracking-widest text-emerald-500/80 truncate">Sistema Activo</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Navigation Scroller */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-8 scrollbar-hide">

                {/* User Section */}
                <div className="space-y-1.5">
                    {!isCollapsed && <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-50 px-4 mb-3">Terminal Usuario</p>}
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="block group">
                                <div className={`
                                    relative flex items-center rounded-2xl transition-all duration-300
                                    ${isActive ? 'bg-brand-red/10 text-brand-red' : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text)]'}
                                    ${isCollapsed ? 'justify-center h-14' : 'px-4 py-3.5 gap-4'}
                                `}>
                                    <item.icon size={20} className={isActive ? 'text-brand-red' : 'group-hover:text-brand-red transition-colors'} />
                                    {!isCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}

                                    {/* Active Marker */}
                                    {isActive && <div className="absolute left-0 w-1 h-6 bg-brand-red rounded-r-full shadow-glow" />}

                                    {/* Badges */}
                                    {item.href === "/dashboard" && criticalCount > 0 && (
                                        <span className={`absolute ${isCollapsed ? 'top-2 right-2' : 'right-4'} px-1.5 py-0.5 rounded-md bg-brand-red text-white text-[8px] font-black animate-pulse`}>
                                            {criticalCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Admin Section - Only if admin */}
                {isAdmin && (
                    <div className="space-y-1.5">
                        {!isCollapsed && <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-blue/80 px-4 mb-3">Administración</p>}
                        {adminItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href} className="block group">
                                    <div className={`
                                        relative flex items-center rounded-2xl transition-all duration-300
                                        ${isActive ? 'bg-brand-blue/10 text-brand-blue' : 'text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-[var(--text)]'}
                                        ${isCollapsed ? 'justify-center h-14' : 'px-4 py-3.5 gap-4'}
                                    `}>
                                        <item.icon size={20} className={isActive ? 'text-brand-blue' : 'group-hover:text-brand-blue transition-colors'} />
                                        {!isCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                                        {isActive && <div className="absolute left-0 w-1 h-6 bg-brand-blue rounded-r-full shadow-glow" />}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer / Logout / Theme */}
            <div className="p-4 border-t border-white/5 bg-foreground/[0.01] space-y-2">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4 justify-between'} py-2`}>
                    {!isCollapsed && <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Apariencia</span>}
                    <ThemeToggle />
                </div>

                <button
                    onClick={handleLogout}
                    className={`
                        w-full flex items-center rounded-2xl transition-all duration-300
                        text-[var(--text-muted)] hover:bg-brand-red/10 hover:text-brand-red
                        ${isCollapsed ? 'justify-center h-14' : 'px-4 py-3.5 gap-4'}
                    `}
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    {!isCollapsed && <span className="font-bold text-sm tracking-tight text-brand-red/80">Cerrar Sesión</span>}
                </button>
            </div>

            {/* Alertas Status - Only Expanded */}
            {!isCollapsed && (
                <div className="p-4 lg:p-6 bg-brand-red/5 mt-[auto]">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-brand-red" size={16} />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[8px] font-black uppercase tracking-widest text-brand-red">Frecuencia Crítica</span>
                                <span className="text-[8px] font-black text-brand-red">88%</span>
                            </div>
                            <div className="h-1 w-full bg-brand-red/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "88%" }}
                                    className="h-full bg-brand-red"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
