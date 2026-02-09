"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * @file ThemeToggle.tsx
 * @description Premium theme switcher component for dark/light mode
 */

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="size-12 rounded-2xl bg-foreground/5 border border-white/5 animate-pulse" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="size-12 rounded-2xl bg-foreground/5 border border-white/10 hover:border-brand-blue/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-blue/10 group"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun
                    size={20}
                    className="text-[var(--text-muted)] group-hover:text-brand-blue transition-colors duration-300 group-hover:rotate-180 transition-transform"
                />
            ) : (
                <Moon
                    size={20}
                    className="text-[var(--text-muted)] group-hover:text-brand-blue transition-colors duration-300 group-hover:-rotate-12 transition-transform"
                />
            )}
        </button>
    );
}
