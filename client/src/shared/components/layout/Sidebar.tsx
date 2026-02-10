import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    CircleDot,
    Users,
    FileText,
    FileCog,
    History
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useAuthContext } from "@/features/auth/auth-context";

export default function Sidebar() {
    const { user } = useAuthContext();

    const allNavItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['ADMIN', 'USER'] },
        { href: "/users", label: "Usuarios", icon: Users, roles: ['ADMIN'] },
        { href: "/documents", label: "Documentos", icon: FileText, roles: ['ADMIN', 'USER'] },
        { href: "/document-types", label: "Tipos de Documento", icon: FileCog, roles: ['ADMIN'] },
        { href: "/history", label: "Historial", icon: History, roles: ['ADMIN', 'USER'] },
        { href: "/settings", label: "Configuración", icon: Settings, roles: ['ADMIN', 'USER'] }
    ];

    const navItems = allNavItems.filter(item => user?.role ? item.roles.includes(user.role) : false);

    const handleLogout = () => {
        // Simple logout redirect for now
        window.location.href = "/login";
    };

    return (
        <aside className={`fixed top-0 left-0 h-screen z-50 bg-card border-r border-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="p-6 border-b border-border flex items-center gap-4">
                <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                </div>
                {!isCollapsed && <span className="font-black uppercase tracking-tighter text-lg">Vencitrack</span>}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} to={item.href} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                            <item.icon size={20} />
                            {!isCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border space-y-4">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
                    <ThemeToggle />
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-4 p-3 rounded-xl text-destructive hover:bg-destructive/10">
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-bold text-sm">Cerrar Sesión</span>}
                </button>
            </div>
        </aside>
    );
}
