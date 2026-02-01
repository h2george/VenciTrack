import Link from "next/link";

export default function TermsPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: '#0A0F1A' }}>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '30%', height: '30%', background: 'rgba(230, 51, 77, 0.08)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '3rem' }}>
                    <span style={{ fontFamily: 'Material Symbols Outlined' }}>arrow_back</span>
                    Volver al inicio
                </Link>

                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Términos de Servicio</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3rem' }}>Última actualización: Enero 2026</p>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem', padding: '3rem' }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>1. Aceptación de Términos</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Al acceder y usar VenciTrack, aceptas estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes usar nuestro servicio.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>2. Uso del Servicio</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            Te otorgamos una licencia limitada, no exclusiva e intransferible para usar VenciTrack para:
                        </p>
                        <ul style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Gestionar fechas de vencimiento de documentos personales o empresariales</li>
                            <li>Recibir notificaciones automáticas</li>
                            <li>Acceder a reportes y estadísticas de tus documentos</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>3. Responsabilidades del Usuario</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            Como usuario, te comprometes a:
                        </p>
                        <ul style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Proporcionar información precisa y actualizada</li>
                            <li>Mantener la confidencialidad de tu cuenta</li>
                            <li>No usar el servicio para actividades ilegales</li>
                            <li>No intentar acceder a cuentas de otros usuarios</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>4. Limitación de Responsabilidad</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            VenciTrack es una herramienta de recordatorio y gestión. No somos responsables por consecuencias derivadas de documentos vencidos. Es responsabilidad del usuario verificar las fechas y tomar las acciones necesarias.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>5. Planes y Pagos</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Los planes de pago se facturan mensualmente. Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. No se realizan reembolsos por períodos parciales.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#1A4B8E' }}>6. Modificaciones</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos serán notificados por email con 30 días de anticipación.
                        </p>
                    </section>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                        ¿Tienes preguntas sobre nuestros términos?
                    </p>
                    <Link href="/contact" style={{ color: '#E6334D', fontWeight: 700, textDecoration: 'none' }}>
                        Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
