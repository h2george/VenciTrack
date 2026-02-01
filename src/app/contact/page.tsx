"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: '#0A0F1A' }}>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '40%', height: '40%', background: 'rgba(230, 51, 77, 0.1)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '3rem' }}>
                    <span style={{ fontFamily: 'Material Symbols Outlined' }}>arrow_back</span>
                    Volver al inicio
                </Link>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center' }}>
                        Contáctanos
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '3rem' }}>
                        ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte.
                    </p>

                    {submitted ? (
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Material Symbols Outlined', fontSize: '3rem', color: '#10b981' }}>check_circle</span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.5rem' }}>¡Mensaje Enviado!</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Te responderemos en las próximas 24 horas.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem', padding: '3rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '0.875rem 1rem', borderRadius: '0.5rem', outline: 'none', transition: 'all 0.2s' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '0.875rem 1rem', borderRadius: '0.5rem', outline: 'none', transition: 'all 0.2s' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                                    Empresa (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '0.875rem 1rem', borderRadius: '0.5rem', outline: 'none', transition: 'all 0.2s' }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>
                                    Mensaje
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', padding: '0.875rem 1rem', borderRadius: '0.5rem', outline: 'none', transition: 'all 0.2s', resize: 'vertical' }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{ width: '100%', background: '#E6334D', color: 'white', fontWeight: 700, padding: '1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(230, 51, 77, 0.25)', transition: 'all 0.3s' }}
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    )}

                    <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Material Symbols Outlined', fontSize: '2rem', color: '#1A4B8E' }}>mail</span>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>Email</h4>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>soporte@vencitrack.com</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Material Symbols Outlined', fontSize: '2rem', color: '#E6334D' }}>schedule</span>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>Horario</h4>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Lun - Vie: 9am - 6pm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
