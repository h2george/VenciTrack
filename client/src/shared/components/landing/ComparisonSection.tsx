import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

export const ComparisonSection = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Header scroll reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-foreground">
                        El costo del <span className="text-brand-red">Caos</span> vs El valor del{" "}
                        <span className="text-emerald-500">Control</span>
                    </h2>
                    <p className="text-muted text-lg font-medium">
                        ¿Sigues usando Excel y calendarios? Estás perdiendo dinero y tranquilidad.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Chaos */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="p-8 rounded-3xl bg-surface-soft border border-border flex flex-col h-full"
                    >
                        <div className="mb-8 p-3 w-fit rounded-xl bg-red-100/50 dark:bg-red-900/30 text-brand-red">
                            <X size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-8 text-foreground">Sin VenciTrack</h3>
                        <ul className="space-y-6 flex-1">
                            {[
                                ["Multas Sorpresa", "Se te pasa la fecha y pagas reajustes o multas costosas."],
                                ["Documentos Dispersos", "Unos en WhatsApp, otros en email... es imposible encontrarlos hoy."],
                                ["Riesgo Operativo", "Vehículos o licencias paradas sin que te des cuenta."],
                            ].map(([title, desc]) => (
                                <li key={title} className="flex gap-4">
                                    <div className="text-brand-red font-bold shrink-0">✕</div>
                                    <div>
                                        <strong className="text-foreground block text-lg font-bold">{title}</strong>
                                        <span className="text-muted text-sm leading-relaxed">{desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The Control */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="p-8 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex flex-col h-full"
                    >
                        <div className="mb-8 p-3 w-fit rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500">
                            <Check size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-8 text-foreground">Con VenciTrack</h3>
                        <ul className="space-y-6 flex-1">
                            {[
                                ["Ahorro Garantizado", "Alertas escalonadas (30, 15, 7 días) antes de cualquier pago."],
                                ["Bóveda Digital", "Todo centralizado y seguro en una sola plataforma en la nube."],
                                ["Continuidad Total", "El sistema trabaja 24/7 para garantizar que nunca pierdas nada."],
                            ].map(([title, desc]) => (
                                <li key={title} className="flex gap-4">
                                    <div className="text-emerald-500 font-bold shrink-0">✓</div>
                                    <div>
                                        <strong className="text-foreground block text-lg font-bold">{title}</strong>
                                        <span className="text-muted text-sm leading-relaxed">{desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
