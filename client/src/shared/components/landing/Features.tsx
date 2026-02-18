import { Shield, Bell, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Shield,
        title: "Panel Digital Seguro",
        description: "Almacenamiento centralizado con Protocolo VenciTrack. Tu información, organizada y segura.",
        color: "text-blue-600 dark:text-blue-400",
        accent: "group-hover:bg-brand-blue",
    },
    {
        icon: Bell,
        title: "Alertas Multicanal",
        description: "Notificaciones 'Acción Inmediata' vía Email y WhatsApp para prevenir cualquier multa.",
        color: "text-red-600 dark:text-red-400",
        accent: "group-hover:bg-brand-red",
    },
    {
        icon: FileText,
        title: "Monitoreo Continuo",
        description: "Detección automática de vencimientos críticos. El sistema trabaja para ti las 24 horas.",
        color: "text-emerald-600 dark:text-emerald-400",
        accent: "group-hover:bg-emerald-500",
    },
    {
        icon: Zap,
        title: "Acceso Ilimitado",
        description: "Sin límites de documentos. Sin planes ocultos. Una herramienta gratuita y profesional.",
        color: "text-amber-600 dark:text-amber-400",
        accent: "group-hover:bg-amber-500",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
};

export const Features = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[var(--brand-blue)] opacity-[0.06] rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-4">
                        Todo lo que <span className="text-brand-blue">necesitas</span>
                    </h2>
                    <p className="text-muted font-semibold text-lg max-w-xl mx-auto">
                        Cuatro pilares que garantizan tu operatividad sin interrupciones.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            whileHover={{ y: -10, transition: { duration: 0.25 } }}
                            className="group p-8 rounded-[2rem] bg-surface-soft border border-border/50
                                       hover:bg-surface hover:border-brand-blue/30
                                       hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]
                                       dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]
                                       transition-colors duration-300 cursor-default"
                        >
                            <div className={`size-14 rounded-2xl bg-surface flex items-center justify-center mb-6
                                            shadow-md shadow-black/5 ${feature.accent}
                                            group-hover:text-white transition-colors duration-300`}>
                                <feature.icon size={28} className={`${feature.color} group-hover:text-white transition-colors`} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-foreground italic">
                                {feature.title}
                            </h3>
                            <p className="text-muted text-sm leading-relaxed font-semibold">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
