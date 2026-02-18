import { Shield, Bell, FileText, Zap } from "lucide-react";

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
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group">
                            <div className={`size-14 rounded-2xl bg-surface-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={28} className={feature.color} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-muted text-sm leading-relaxed font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
