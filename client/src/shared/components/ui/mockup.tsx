import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface MockupProps {
    children: React.ReactNode;
    className?: string;
}

export const Mockup = ({ children, className }: MockupProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Scroll-based parallax (3D tilt on enter) ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.95", "start 0.3"],   // triggers as mockup enters viewport
    });

    const rawRotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
    const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const rawOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    // Spring-smooth the values so motion feels physical
    const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 18 });
    const scale = useSpring(rawScale, { stiffness: 60, damping: 18 });
    const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });

    // --- Mouse-hover tilt (subtle, max ±6 deg) ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 });
    const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        /* Perspective wrapper — must be a separate element */
        <div
            ref={containerRef}
            className={cn("relative mx-auto w-full max-w-6xl", className)}
            style={{ perspective: "1400px" }}
        >
            {/* Glow halo behind the frame */}
            <div className="absolute -inset-8 rounded-[3rem] bg-[var(--brand-blue)] opacity-[0.12] blur-[80px] pointer-events-none" />

            {/* Animated frame — scroll + hover tilt */}
            <motion.div
                style={{ rotateX, scale, opacity }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    style={{ rotateX: tiltX, rotateY: tiltY }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-surface-soft p-[3px]
                               shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)]
                               dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]
                               border border-border/40"
                >
                    {/* Shine sweep on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-10
                                   bg-gradient-to-br from-white/10 via-transparent to-transparent"
                        style={{ opacity: useTransform(tiltY, [-6, 6], [0.15, 0]) }}
                    />

                    <div className="relative overflow-hidden rounded-[2.25rem] bg-background border border-border/20">
                        {/* Browser chrome */}
                        <div className="h-9 w-full bg-surface-soft/60 border-b border-border/20 flex items-center px-4 gap-2 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="size-2.5 rounded-full bg-red-400/50" />
                                <div className="size-2.5 rounded-full bg-yellow-400/50" />
                                <div className="size-2.5 rounded-full bg-green-400/50" />
                            </div>
                            <div className="mx-auto w-1/3 h-4 rounded-md bg-surface border border-border/20" />
                        </div>

                        {/* Content */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                            {children}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
