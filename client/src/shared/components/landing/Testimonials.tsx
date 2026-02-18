import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Carlos M.",
        role: "Director de Operaciones",
        quote: "El protocolo de VenciTrack eliminó el error humano de nuestra flota. Cero multas desde la implementación.",
    },
    {
        name: "Ana R.",
        role: "Gerente de Logística",
        quote: "Recibir la alerta 'Acción Inmediata' en WhatsApp nos salvó de una clausura. La mejor herramienta del sector.",
    },
    {
        name: "Roberto D.",
        role: "Admin. de Flotas",
        quote: "Simple. Rápido. Seguro. La inteligencia exponencial al servicio del compliance de mi empresa.",
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-16 text-foreground">
                    Confianza <span className="text-brand-blue">Operativa</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border shadow-sm flex flex-col items-center text-center">
                            <div className="flex gap-1 mb-6 text-amber-500">
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                                <Star size={20} fill="currentColor" />
                            </div>
                            <p className="text-foreground text-lg leading-relaxed font-bold italic mb-8">
                                "{t.quote}"
                            </p>
                            <div className="mt-auto">
                                <p className="font-black text-sm uppercase text-foreground">{t.name}</p>
                                <p className="text-xs text-muted font-bold mt-1 uppercase tracking-widest">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
