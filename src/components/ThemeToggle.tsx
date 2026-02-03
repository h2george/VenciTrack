/**
 * @file ThemeToggle.tsx
 * @description System-level brightness controller. Manages persistence 
 * of visual modes (Light/Dark) via DOM attributes and LocalStorage.
 */

"use client";

import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 * @returns {React.ReactElement} A kinetic switch for theme selection.
 */
export default function ThemeToggle(): React.ReactElement {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = (): void => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="size-11 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md group"
            title={`Alternar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-label="Alternar Tema"
        >
            <span className="icon text-xl text-[var(--text)] group-hover:text-brand-red transition-colors">
                {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
        </button>
    );
}
