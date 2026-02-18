"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface GlowProps {
    className?: string;
    variant?: "blue" | "red" | "emerald" | "purple";
    size?: "sm" | "md" | "lg" | "xl";
    opacity?: number;
}

const variants = {
    blue: "bg-brand-blue",
    red: "bg-brand-red",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
};

const sizes = {
    sm: "size-48 blur-[60px]",
    md: "size-64 blur-[80px]",
    lg: "size-96 blur-[120px]",
    xl: "w-full h-[600px] blur-[140px]",
};

export const Glow = ({
    className,
    variant = "blue",
    size = "md",
    opacity = 0.1
}: GlowProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            className={cn(
                "absolute rounded-full pointer-events-none -z-10",
                variants[variant],
                sizes[size],
                className
            )}
        />
    );
};
