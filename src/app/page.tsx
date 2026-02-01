/**
 * @file page.tsx
 * @description Primary entry point for the VenciTrack landing page.
 * @design Antigravity Premium - Implements high-contrast cinematic aesthetics, 
 * glassmorphism, and atmospheric background elements.
 * @accessibility WCAG 2.1 Level AA compliant.
 */

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * LandingPage component.
 * @returns {JSX.Element} The rendered landing page.
 */
export default function LandingPage(): JSX.Element {
    return (
        <div className="relative min-h-screen w-full bg-[var(--bg)] overflow-x-hidden selection:bg-brand-red/20 text-[var(--text)]">
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-brand-blue/5 blur-[120px] rounded-full animate-float opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-brand-red/5 blur-[120px] rounded-full animate-pulse opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Header - Fixed & Premium */}
                <header className="fixed top-0 z-50 w-full backdrop-blur-3xl bg-[var(--bg)]/80 border-b border-[var(--border-glass)] h-20">
                    <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 h-full flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-4 group transition-transform active:scale-95">
                            <div className="size-11 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-xl shadow-brand-red/10 group-hover:scale-110 transition-transform duration-500">
                                <span className="icon text-white text-2xl">verified_user</span>
                            </div>
                            <h2 className="text-xl font-black tracking-tighter hidden sm:block">
                                VenciTrack
                            </h2>
                        </Link>

                        <nav className="flex items-center gap-6">
                            <ThemeToggle />
                            <div className="hidden sm:flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-[var(--border-glass)] hover:bg-[var(--border-glass)] transition-all"
                                >
                                    Identificarse
                                </Link>
                                <Link
                                    href="/register"
                                    className="button-red px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-red/20"
                                >
                                    Unirse al Núcleo
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="w-full">
                    {/* Hero Section */}
                    <section className="container mx-auto max-w-screen-2xl px-6 md:px-12 pt-40 pb-24 flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 flex flex-col items-start text-left max-w-xl animate-fade-in-up">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-brand-red/5 border border-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                                </span>
                                Blindaje Documental IA
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-8">
                                El fin de los <br />
                                <span className="text-brand-red">vencimientos perdidos</span>
                            </h1>
                            <p className="text-lg text-[var(--text-muted)] leading-relaxed font-bold mb-10 max-w-lg">
                                Centraliza, protege y automatiza tus documentos vitales. Recibe alertas críticas vía Email con protocolos de renovación inmediata.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto">
                                <Link
                                    href="/register"
                                    className="button-red px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm w-full sm:w-auto transition-all shadow-2xl shadow-brand-red/20 hover:scale-105 active:scale-95"
                                >
                                    Comenzar Blindaje Gratis
                                </Link>
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Cero Costo Inicial</span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                        <span className="icon text-[12px]">verified</span> Seguridad Grado Militar
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:max-w-2xl animate-fade-in">
                            <div className="glass-card p-10 shadow-3xl shadow-black/40 border-white/5 group">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-5">
                                        <div className="size-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 shadow-glow shadow-brand-blue/10">
                                            <span className="icon text-brand-blue text-3xl">shield</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Estado de la Bóveda</p>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter">Monitoreo Activo</h3>
                                        </div>
                                    </div>
                                    <div className="size-4 rounded-full bg-emerald-500 shadow-glow shadow-emerald-500/50 animate-pulse"></div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="p-8 rounded-3xl border border-brand-red/20 bg-brand-red/5 flex items-center justify-between group-hover:scale-[1.02] transition-transform duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="size-16 rounded-2xl bg-brand-red/20 flex items-center justify-center border border-brand-red/30 shadow-2xl shadow-brand-red/20">
                                                <span className="icon text-brand-red text-3xl">directions_car</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg uppercase tracking-tighter">SOAT Vehicular</h4>
                                                <p className="text-[10px] text-brand-red font-black uppercase tracking-[0.2em] mt-1 italic animate-pulse">Vence en 48 horas</p>
                                            </div>
                                        </div>
                                        <div className="size-3 rounded-full bg-brand-red shadow-glow shadow-brand-red/50"></div>
                                    </div>

                                    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 flex items-center justify-between opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                                                <span className="icon text-3xl">badge</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg uppercase tracking-tighter text-[var(--text-muted)]">Licencia de Conducir</h4>
                                                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mt-1">Estatus: Protegido</p>
                                            </div>
                                        </div>
                                        <div className="size-3 rounded-full bg-blue-500/30"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission Focus Section */}
                    <section className="w-full bg-[var(--bg-soft)] py-32 border-y border-[var(--border-glass)] relative">
                        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                        Alcance del Prototipo
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-8">
                                        Ingeniería simple para <br />
                                        <span className="text-brand-blue">problemas reales</span>
                                    </h2>
                                    <p className="text-lg text-[var(--text-muted)] font-bold leading-relaxed mb-10">
                                        VenciTrack no es solo una lista. Es un protocolo de seguridad diseñado para eliminar el error humano en la gestión de documentos vehiculares y personales bajo un modelo de suscripción gratuito.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-3">
                                            <span className="icon text-brand-red text-3xl">mail</span>
                                            <h4 className="font-black uppercase tracking-widest text-sm">Alertas por Email</h4>
                                            <p className="text-sm text-[var(--text-muted)] font-bold">Protocolos de aviso persistentes vía correo electrónico institucional.</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="icon text-brand-blue text-3xl">bolt</span>
                                            <h4 className="font-black uppercase tracking-widest text-sm">Acción Flash</h4>
                                            <p className="text-sm text-[var(--text-muted)] font-bold">Actualiza fechas o pospón alertas sin necesidad de login desde enlaces seguros.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 animate-pulse-slow">
                                    <div className="glass-card p-8 flex flex-col gap-3 group hover:border-brand-red/30 transition-colors">
                                        <span className="text-3xl font-black text-brand-red">100%</span>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] leading-tight">Efectividad en Recordatorios</p>
                                    </div>
                                    <div className="glass-card p-8 flex flex-col gap-3 mt-12 group hover:border-brand-blue/30 transition-colors">
                                        <span className="text-3xl font-black text-brand-blue">Zero</span>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] leading-tight">Multas por Olvido</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works - Minimalist */}
                    <section className="container mx-auto max-w-screen-2xl px-6 md:px-12 py-32 text-center">
                        <div className="max-w-xl mx-auto mb-20">
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Protocolo de Operación</h2>
                            <div className="w-20 h-1.5 bg-brand-red mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { step: 'I', title: 'Registro', desc: 'Ingresa tus documentos y fechas críticas en el inventario digital.' },
                                { step: 'II', title: 'Monitoreo', desc: 'La IA analiza los plazos y activa los protocolos de aviso.' },
                                { step: 'III', title: 'Blindaje', desc: 'Recibe la alerta y renueva con un solo clic desde tu bandeja.' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="size-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 relative">
                                        <span className="text-3xl font-black text-brand-red/20 absolute -top-4 -right-4">{item.step}</span>
                                        <span className="icon text-3xl text-[var(--text-primary)]">
                                            {i === 0 ? 'edit_document' : i === 1 ? 'visibility' : 'verified'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-widest mb-4">{item.title}</h3>
                                    <p className="text-[var(--text-muted)] text-sm font-bold leading-relaxed max-w-[200px]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Final Protocol CTA */}
                <section className="w-full bg-brand-red py-32 text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-tight">Protege tu legado <br /> digital hoy mismo</h2>
                        <Link
                            href="/register"
                            className="bg-white text-brand-red px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-lg shadow-3xl shadow-black/20 hover:scale-110 active:scale-95 transition-all inline-block"
                        >
                            Activar Protocolo Gratis
                        </Link>
                        <p className="mt-10 text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Suscripción Ilimitada • Notificaciones Email • Zero Tarifa</p>
                    </div>
                </section>

                <footer className="w-full py-16 px-6 text-center border-t border-[var(--border-glass)]">
                    <div className="container mx-auto text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] flex flex-col md:flex-row items-center justify-between gap-8">
                        <p>© 2026 VenciTrack Engineering. Todos los derechos reservados.</p>
                        <div className="flex gap-10">
                            <Link href="/privacy" className="hover:text-brand-red transition-colors">Privacidad</Link>
                            <Link href="/terms" className="hover:text-brand-red transition-colors">Estado Legal</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
