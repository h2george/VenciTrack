"use client";

import { motion } from "framer-motion";

interface StatItem {
    label: string;
    value: number;
    change: string;
    color: string;
}

interface StatsGridProps {
    stats: StatItem[];
}

/**
 * StatsGrid Component
 * Premium stat visualization with Framer Motion animations
 */
export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-10 border-white/5 bg-[#111] space-y-2 hover-glow transition-all"
                >
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50 block">
                        {stat.label}
                    </span>
                    <div className="flex items-end gap-3">
                        <h3 className={`text-6xl font-black ${stat.color} tracking-tighter leading-none`}>
                            {stat.value}
                        </h3>
                        <span className={`text-[10px] font-black mb-1 ${stat.change.startsWith('+') ? 'text-brand-red' : 'text-emerald-500'}`}>
                            {stat.change}
                        </span>
                    </div>
                </motion.div>
            ))}
        </section>
    );
}
