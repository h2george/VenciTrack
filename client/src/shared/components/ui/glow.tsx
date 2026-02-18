import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface GlowProps {
    className?: string;
    variant?: "blue" | "red" | "emerald" | "purple";
    size?: "sm" | "md" | "lg" | "xl";
    /** 0–1 final opacity after fade-in */
    opacity?: number;
    /** animate a slow pulse */
    pulse?: boolean;
}

const colorMap = {
    blue: "bg-[var(--brand-blue)]",
    red: "bg-[var(--brand-red)]",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
};

const sizeMap = {
    sm: "w-48  h-48  blur-[80px]",
    md: "w-72  h-72  blur-[100px]",
    lg: "w-[32rem] h-[32rem] blur-[140px]",
    xl: "w-full h-[700px] blur-[180px]",
};

export const Glow = ({
    className,
    variant = "blue",
    size = "md",
    opacity = 0.25,
    pulse = false,
}: GlowProps) => {
    return (
        <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
                pulse
                    ? { opacity: [opacity * 0.6, opacity, opacity * 0.6], scale: [1, 1.08, 1] }
                    : { opacity, scale: 1 }
            }
            transition={
                pulse
                    ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 1.2, ease: "easeOut" }
            }
            className={cn(
                "absolute rounded-full pointer-events-none -z-10",
                colorMap[variant],
                sizeMap[size],
                className,
            )}
        />
    );
};
