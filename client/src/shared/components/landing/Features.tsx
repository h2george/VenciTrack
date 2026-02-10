import { Shield, Bell, FileText, Zap } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Panel Digital Seguro",
        description: "Almacenamiento centralizado con Protocolo VenciTrack v2.0. Tu información, organizada y segura."
    },
    {
        icon: Bell,
        title: "Alertas Multicanal",
        description: "Notificaciones 'Acción Inmediata' vía Email y WhatsApp para prevenir multas."
    },
    {
        icon: FileText,
        title: "Monitoreo Continuo",
        description: "Detección automática de vencimientos críticos. El sistema trabaja para ti 24/7."
    },
    {
        icon: Zap,
        title: "Acceso Ilimitado",
        description: "Sin límites de documentos. Sin planes ocultos. Gestión profesional gratuita."
    }
];

export const Features = () => {
    return (
        <section className="py-24 bg-card border-y border-border/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                        Gestión <span className="text-primary">Inteligente</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Plataforma de monitoreo diseñada para eliminar el error humano y garantizar la continuidad operativa.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors group">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
