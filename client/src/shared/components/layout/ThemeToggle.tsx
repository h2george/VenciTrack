import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
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

    if (!mounted) return <div className="size-10 rounded-xl bg-muted animate-pulse" />;

    return (
        <button
            onClick={toggleTheme}
            className="size-10 rounded-xl bg-accent/50 border border-border flex items-center justify-center transition-all hover:scale-105"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
