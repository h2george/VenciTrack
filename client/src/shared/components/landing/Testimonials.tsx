import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Carlos M.",
        role: "Director de Operaciones",
        quote: "El protocolo de VenciTrack eliminó el error humano de nuestra flota. Cero multas desde la implementación.",
        avatar: "CM",
    },
    {
        name: "Ana R.",
        role: "Gerente de Logística",
        quote: "Recibir la alerta 'Acción Inmediata' en WhatsApp nos salvó de una clausura. La mejor herramienta del sector.",
        avatar: "AR",
    },
    {
        name: "Roberto D.",
        role: "Admin. de Flotas",
        quote: "Simple. Rápido. Seguro. La inteligencia exponencial al servicio del compliance de mi empresa.",
        avatar: "RD",
    },
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-surface-soft relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]
                            bg-[var(--brand-blue)] opacity-[0.05] blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-foreground">
                        Confianza <span className="text-brand-blue">Operativa</span>
                    </h2>
                    <p className="text-muted font-semibold text-lg">
                        Empresas que ya eliminaron las multas de su operación.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="p-8 rounded-3xl bg-surface border border-border
                                       hover:border-brand-blue/30 hover:shadow-lg
                                       transition-colors duration-300 flex flex-col cursor-default"
                        >
                            <div className="flex gap-1 mb-6 text-amber-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-foreground text-base leading-relaxed font-bold italic mb-8 flex-1">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="size-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-black">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted font-bold mt-0.5 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
