export const Testimonials = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16">
                    Confianza <span className="text-primary">Operativa</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-card border border-border">
                        <div className="flex gap-1 text-primary mb-4">★★★★★</div>
                        <p className="text-muted-foreground mb-6 font-medium">"El protocolo de VenciTrack eliminó el error humano de nuestra flota. Cero multas desde la implementación."</p>
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-muted-foreground">CM</div>
                            <div>
                                <p className="font-bold text-sm uppercase">Carlos M.</p>
                                <p className="text-xs text-muted-foreground">Director de Operaciones</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-card border border-border">
                        <div className="flex gap-1 text-primary mb-4">★★★★★</div>
                        <p className="text-muted-foreground mb-6 font-medium">"Recibir la alerta 'Acción Inmediata' en WhatsApp nos salvó de una clausura. La mejor herramienta gratuita."</p>
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-muted-foreground">AR</div>
                            <div>
                                <p className="font-bold text-sm uppercase">Ana R.</p>
                                <p className="text-xs text-muted-foreground">Gerente de Logística</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-card border border-border">
                        <div className="flex gap-1 text-primary mb-4">★★★★★</div>
                        <p className="text-muted-foreground mb-6 font-medium">"Simple. Rápido. Seguro. La inteligencia exponencial al servicio del compliance."</p>
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-muted-foreground">RD</div>
                            <div>
                                <p className="font-bold text-sm uppercase">Roberto D.</p>
                                <p className="text-xs text-muted-foreground">Admin. de Flotas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
