import { motion } from "framer-motion";

export const DashboardPreview = () => {
    return (
        <section className="py-24 bg-background relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 relative">
                {/* Floating Notification Mocks */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -left-4 top-1/4 z-30 hidden lg:block"
                >
                    <div className="p-4 bg-surface rounded-2xl shadow-2xl border border-border animate-float">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-brand-red flex items-center justify-center text-white">
                                <span className="text-[10px] font-black italic">!</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-foreground leading-none">Alerta Crítica</p>
                                <p className="text-[8px] text-muted font-bold mt-1">DNI Vence en 3 días</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute -right-4 bottom-1/4 z-30 hidden lg:block"
                >
                    <div className="p-4 bg-surface rounded-2xl shadow-2xl border border-border animate-float [animation-delay:1s]">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <span className="text-[10px] font-black">✓</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-foreground leading-none">Documento Al Día</p>
                                <p className="text-[8px] text-muted font-bold mt-1">Seguro EPS Renovado</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden border-[12px] border-surface-soft shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)] dark:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)]"
                >
                    <div className="aspect-[16/10] bg-surface relative">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Dashboard Preview"
                            className="w-full h-full object-cover opacity-90 grayscale-[0.2]"
                        />
                        {/* Interactive Overlay Illusion */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
