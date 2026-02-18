import { Shield, Bell, FileText, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Shield,
        title: "Panel Digital Seguro",
        description: "Almacenamiento centralizado con Protocolo VenciTrack. Tu información, organizada y segura.",
        color: "text-blue-600 dark:text-blue-400"
    },
    {
        icon: Bell,
        title: "Alertas Multicanal",
        description: "Notificaciones 'Acción Inmediata' vía Email y WhatsApp para prevenir cualquier multa.",
        color: "text-red-600 dark:text-red-400"
    },
    {
        icon: FileText,
        title: "Monitoreo Continuo",
        description: "Detección automática de vencimientos críticos. El sistema trabaja para ti las 24 horas.",
        color: "text-emerald-600 dark:text-emerald-400"
    },
    {
        icon: Zap,
        title: "Acceso Ilimitado",
        description: "Sin límites de documentos. Sin planes ocultos. Una herramienta gratuita y profesional.",
        color: "text-amber-600 dark:text-amber-400"
    }
];

export const Features = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 size-96 bg-brand-blue/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group p-10 rounded-[2.5rem] bg-surface-soft border border-border/50 hover:bg-surface hover:border-brand-blue/30 transition-all duration-500 shadow-sm"
                        >
                            <div className={`size-16 rounded-3xl bg-surface flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500`}>
                                <feature.icon size={32} className={`${feature.color} group-hover:text-white transition-colors`} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-foreground italic">{feature.title}</h3>
                            <p className="text-muted text-base leading-relaxed font-semibold opacity-80">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
