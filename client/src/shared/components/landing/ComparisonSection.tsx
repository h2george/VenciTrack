import { X, Check } from "lucide-react";

export const ComparisonSection = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-foreground">
                        El costo del <span className="text-brand-red">Caos</span> vs El valor del <span className="text-emerald-500">Control</span>
                    </h2>
                    <p className="text-muted text-lg font-medium">
                        ¿Sigues usando Excel y calendarios? Estás perdiendo dinero y tranquilidad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Chaos */}
                    <div className="p-8 rounded-3xl bg-surface-soft border border-border flex flex-col h-full">
                        <div className="mb-8 p-3 w-fit rounded-xl bg-red-100/50 dark:bg-red-900/30 text-brand-red">
                            <X size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-8 text-foreground">Sin VenciTrack</h3>
                        <ul className="space-y-6 flex-1">
                            <li className="flex gap-4">
                                <div className="text-brand-red font-bold">✕</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Multas Sorpresa</strong>
                                    <span className="text-muted text-sm leading-relaxed">Se te pasa la fecha y pagas reajustes o multas costosas.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-brand-red font-bold">✕</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Documentos Dispersos</strong>
                                    <span className="text-muted text-sm leading-relaxed">Unos en WhatsApp, otros en email... es imposible encontrarlos hoy.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-brand-red font-bold">✕</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Riesgo Operativo</strong>
                                    <span className="text-muted text-sm leading-relaxed">Vehículos o licencias paradas sin que te des cuenta.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* The Control */}
                    <div className="p-8 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex flex-col h-full">
                        <div className="mb-8 p-3 w-fit rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500">
                            <Check size={28} />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-8 text-foreground">Con VenciTrack</h3>
                        <ul className="space-y-6 flex-1">
                            <li className="flex gap-4">
                                <div className="text-emerald-500 font-bold">✓</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Ahorro Garantizado</strong>
                                    <span className="text-muted text-sm leading-relaxed">Alertas escalonadas (30, 15, 7 días) antes de cualquier pago.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-emerald-500 font-bold">✓</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Bóveda Digital</strong>
                                    <span className="text-muted text-sm leading-relaxed">Todo centralizado y seguro en una sola plataforma en la nube.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-emerald-500 font-bold">✓</div>
                                <div>
                                    <strong className="text-foreground block text-lg font-bold">Continuidad Total</strong>
                                    <span className="text-muted text-sm leading-relaxed">El sistema trabaja 24/7 para garantizar que nunca pierdas nada.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
