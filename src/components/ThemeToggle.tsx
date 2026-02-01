/**
 * @file ThemeToggle.tsx
 * @description System-level brightness controller. Manages persistence 
 * of visual modes (Light/Dark) via DOM attributes and LocalStorage.
 */

"use client";

import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 * @returns {JSX.Element} A kinetic switch for theme selection.
 */
export default function ThemeToggle(): JSX.Element {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    /**
     * Toggles between visual modes with DOM mutation
     */
    const toggleTheme = (): void => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="size-11 rounded-2xl bg-[var(--card-glass)] border border-[var(--border-glass)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md group"
            title={`Alternar a modo ${theme === 'light' ? 'obscuro' : 'claro'}`}
            aria-label="Alternar Tema"
        >
            <span className="icon text-xl text-[var(--text-primary)] group-hover:text-brand-red transition-colors">
                {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
        </button>
    );
}
