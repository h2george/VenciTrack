/**
 * @file page.tsx
 * @description Primary entry point for the VenciTrack landing page.
 * @design Antigravity Premium - Refined spacing and broader service scope.
 */

import { Hero2 } from "@/components/ui/hero-2-1";
import { Footerdemo } from "@/components/ui/footer-section";
import { Mail, Zap, Calendar, Bell, CheckCircle2, Layout, Star, Quote, ShieldCheck, Clock, AlertTriangle, TrendingUp, Users, HeartPulse, Home, Plane, Car } from "lucide-react";
import Link from "next/link";

/**
 * LandingPage component.
 * @returns {React.ReactElement} The rendered landing page.
 */
export default function LandingPage(): React.ReactElement {
    return (
        <div className="relative min-h-screen w-full bg-white dark:bg-black overflow-x-hidden transition-colors duration-500 text-black dark:text-white">
            <main className="w-full">
                {/* Hero section */}
                <Hero2 />

                {/* Statistics / Numbers Section - Tighter spacing */}
                <section className="py-20 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {[
                                { label: "Usuarios Activos", value: "2.5k+", icon: <Users size={20} className="text-brand-blue" /> },
                                { label: "Alertas Enviadas", value: "15k+", icon: <TrendingUp size={20} className="text-brand-red" /> },
                                { label: "Multas Evitadas", value: "98%", icon: <ShieldCheck size={20} className="text-emerald-500" /> },
                                { label: "Configuración", value: "30s", icon: <Clock size={20} className="text-yellow-500" /> }
                            ].map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="inline-flex size-12 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Scope Section - Broadening the horizon */}
                <section className="py-32 bg-white dark:bg-black">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12">
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase leading-tight">
                                Controla <span className="text-brand-red">todo lo que vence</span>
                            </h2>
                            <p className="text-black/50 dark:text-white/40 font-bold text-sm leading-relaxed uppercase tracking-widest">
                                Una sola herramienta para múltiples necesidades
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: <Car size={24} className="text-brand-red" />, title: "Vehículos", items: ["SOAT", "Licencia", "Seguros", "Revisión"] },
                                { icon: <HeartPulse size={24} className="text-emerald-500" />, title: "Salud", items: ["Citas", "Vacunas", "Chequeos", "Recetas"] },
                                { icon: <Home size={24} className="text-brand-blue" />, title: "Finanzas", items: ["Hipotecas", "Seguros", "Impuestos", "Contratos"] },
                                { icon: <Plane size={24} className="text-yellow-500" />, title: "Viajes", items: ["Pasaporte", "Visas", "Seguros", "Mantenimiento"] },
                            ].map((cat, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-brand-red/20 transition-all group">
                                    <div className="size-12 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-widest mb-6">{cat.title}</h3>
                                    <ul className="space-y-3">
                                        {cat.items.map((item, j) => (
                                            <li key={j} className="text-xs font-bold text-black/40 dark:text-white/40 flex items-center gap-2">
                                                <div className="size-1 rounded-full bg-brand-red" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pain Points & Comparison - Tighter spacing */}
                <section className="py-32 bg-black/[0.02] dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase leading-tight">
                                    El costo de un <br /> <span className="text-brand-red">vencimiento olvidado</span>
                                </h2>
                                <p className="text-black/60 dark:text-white/40 font-medium text-lg leading-relaxed mb-10">
                                    Un olvido de un solo día puede significar multas costosas, pérdida de tiempo o sorpresas legales desagradables.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: <AlertTriangle className="text-brand-red" size={20} />, text: "Multas evitables", cost: "S/ 500+" },
                                        { icon: <Clock className="text-brand-blue" size={20} />, text: "Días de papeleo", cost: "2-3 días" },
                                        { icon: <ShieldCheck className="text-emerald-500" size={20} />, text: "Seguros no vigentes", cost: "Riesgo Total" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/5 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                {item.icon}
                                                <span className="font-bold text-sm">{item.text}</span>
                                            </div>
                                            <span className="text-xs font-black text-brand-red uppercase bg-brand-red/5 px-3 py-1 rounded-full">{item.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-brand-red/5 blur-[8rem] group-hover:bg-brand-red/10 transition-all rounded-full" />
                                <div className="relative glass-card overflow-hidden rounded-[2.5rem] border border-black/10 dark:border-white/10 p-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[2rem]">
                                            <div className="size-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-6">
                                                <AlertTriangle size={20} className="text-brand-red" />
                                            </div>
                                            <h4 className="font-black uppercase tracking-widest text-xs mb-4">Sin VenciTrack</h4>
                                            <ul className="space-y-3 text-[11px] font-bold text-black/40 dark:text-white/40">
                                                <li className="flex items-center gap-2">❌ Olvidos frecuentes</li>
                                                <li className="flex items-center gap-2">❌ Multas acumuladas</li>
                                                <li className="flex items-center gap-2">❌ Estrés constante</li>
                                                <li className="flex items-center gap-2">❌ Riesgo legal</li>
                                            </ul>
                                        </div>
                                        <div className="bg-brand-red p-8 rounded-[2rem] text-white">
                                            <div className="size-10 rounded-full bg-white/20 flex items-center justify-center mb-6">
                                                <CheckCircle2 size={20} className="text-white" />
                                            </div>
                                            <h4 className="font-black uppercase tracking-widest text-xs mb-4">Con VenciTrack</h4>
                                            <ul className="space-y-3 text-[11px] font-bold">
                                                <li className="flex items-center gap-2">✅ Avisos al correo</li>
                                                <li className="flex items-center gap-2">✅ Cero multas</li>
                                                <li className="flex items-center gap-2">✅ Control total</li>
                                                <li className="flex items-center gap-2">✅ Tranquilidad</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Value Propositions */}
                <section id="features" className="py-32 bg-white dark:bg-black">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12">
                        <div className="text-center mb-24 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase leading-tight">
                                La herramienta que <br /> piensa por ti
                            </h2>
                            <p className="text-black/50 dark:text-white/40 font-bold text-sm leading-relaxed">
                                Diseñamos VenciTrack para ser la extensión de tu memoria que nunca falla.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Mail className="text-brand-red" size={24} />,
                                    title: "Alertas por Correo",
                                    desc: "No revises tu calendario. Nosotros te enviamos recordatorios preventivos directamente a tu correo."
                                },
                                {
                                    icon: <Zap className="text-brand-blue" size={24} />,
                                    title: "Actualización Rápida",
                                    desc: "Al renovar, actualiza la nueva fecha desde un botón seguro en el correo. Sin logins innecesarios."
                                },
                                {
                                    icon: <Calendar className="text-emerald-500" size={24} />,
                                    title: "Control Centralizado",
                                    desc: "Todo en un solo lugar. Listado simple de tus fechas próximas y su estado actual."
                                },
                                {
                                    icon: <Bell className="text-yellow-500" size={24} />,
                                    title: "Recordatorios Recurrentes",
                                    desc: "Si no actúas, te volvemos a avisar. No paramos hasta que estés seguro y el documento renovado."
                                },
                                {
                                    icon: <CheckCircle2 className="text-green-500" size={24} />,
                                    title: "Fácil de Usar",
                                    desc: "Registras la fecha en 30 segundos. Sin configuraciones, sin procesos complejos."
                                },
                                {
                                    icon: <Layout className="text-brand-red" size={24} />,
                                    title: "Gratis por siempre",
                                    desc: "Nuestra herramienta esencial es gratuita. Queremos ayudarte a evitar multas innecesarias."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="p-10 rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all group">
                                    <div className="size-12 rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-widest mb-4">{feature.title}</h3>
                                    <p className="text-sm text-black/50 dark:text-white/40 font-bold leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Proof / Testimonials Section */}
                <section className="py-32 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 overflow-hidden">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">Usuarios Protegidos</h2>
                        <div className="flex items-center justify-center gap-1 mb-8">
                            {[...Array(5)].map((_, i) => <Star key={i} className="fill-yellow-500 text-yellow-500" size={20} />)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                            {[
                                { name: "Carlos R.", role: "Particular", text: "VenciTrack me salvó de una multa por el SOAT que se me pasó por 2 días. El correo de recordatorio llegó justo a tiempo." },
                                { name: "Ana M.", role: "Logística", text: "Llevar el control de 5 vehículos era un dolor de cabeza. Con esta herramienta centralicé todo y ya no hay sorpresas." },
                                { name: "Luis T.", role: "Independiente", text: "Me gusta lo simple que es. No tengo que entrar a la app cada vez, el correo tiene todo lo que necesito." }
                            ].map((t, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-black border border-black/5 dark:border-white/5 relative shadow-sm">
                                    <Quote className="absolute top-6 right-6 text-black/5 dark:text-white/5" size={40} />
                                    <p className="text-sm font-bold text-black/70 dark:text-white/50 mb-8 italic leading-relaxed">&quot;{t.text}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                                            <span className="text-[10px] font-black text-brand-red">{t.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest">{t.name}</p>
                                            <p className="text-[10px] text-black/40 dark:text-white/30 font-bold uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final Push Section */}
                <section className="py-40 text-center relative overflow-hidden bg-white dark:bg-black border-t border-black/5 dark:border-white/5">
                    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-tight uppercase">Deja de preocuparte <br /> por el olvido</h2>
                        <Link
                            href="/register"
                            className="bg-brand-red text-white px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl shadow-brand-red/20 hover:scale-105 active:scale-95 transition-all inline-block"
                        >
                            Crear cuenta gratuita
                        </Link>
                        <p className="mt-10 text-[9px] font-black uppercase tracking-[0.4em] text-black/20 dark:text-white/20">Tu herramienta de confianza para que todo siga vigente</p>
                    </div>
                </section>

                {/* Support Dark/Light Footer */}
                <Footerdemo />
            </main>
        </div>
    );
}
