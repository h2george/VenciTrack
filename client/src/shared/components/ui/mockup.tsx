"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface MockupProps {
    children: React.ReactNode;
    className?: string;
}

export const Mockup = ({ children, className }: MockupProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                perspective: "1200px",
                opacity,
                scale,
                rotateX,
            }}
            className={cn(
                "relative mx-auto w-full max-w-6xl",
                className
            )}
        >
            {/* Soft Glow behind mockup */}
            <div className="absolute -inset-10 bg-brand-blue/10 blur-[100px] opacity-50 pointer-events-none" />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-soft p-2 shadow-2xl shadow-black/20 dark:shadow-black/60 border border-border/50">
                <div className="relative overflow-hidden rounded-[2rem] bg-background aspect-[16/10] border border-border/30">
                    {/* Browser Header Illusion */}
                    <div className="h-10 w-full bg-surface-soft/50 border-b border-border/20 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="size-2.5 rounded-full bg-red-400/40" />
                            <div className="size-2.5 rounded-full bg-yellow-400/40" />
                            <div className="size-2.5 rounded-full bg-green-400/40" />
                        </div>
                        <div className="mx-auto w-1/3 h-4 rounded-lg bg-surface border border-border/20" />
                    </div>
                    {/* Content area */}
                    <div className="relative w-full h-full overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
