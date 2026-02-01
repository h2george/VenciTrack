import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: '#0A0F1A' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '30%', height: '30%', background: 'rgba(26, 75, 142, 0.1)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '3rem' }}>
                    <span style={{ fontFamily: 'Material Symbols Outlined' }}>arrow_back</span>
                    Volver al inicio
                </Link>

                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Política de Privacidad</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3rem' }}>Última actualización: Enero 2026</p>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem', padding: '3rem' }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#E6334D' }}>1. Información que Recopilamos</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            Recopilamos información que nos proporcionas directamente, incluyendo:
                        </p>
                        <ul style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Nombre y correo electrónico</li>
                            <li>Información de documentos y fechas de vencimiento</li>
                            <li>Datos de vehículos y personas asociadas</li>
                            <li>Preferencias de notificación</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#E6334D' }}>2. Cómo Usamos tu Información</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            Utilizamos la información recopilada para:
                        </p>
                        <ul style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                            <li>Enviar recordatorios de vencimientos</li>
                            <li>Mejorar nuestros servicios</li>
                            <li>Comunicarnos contigo sobre actualizaciones</li>
                            <li>Garantizar la seguridad de tu cuenta</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#E6334D' }}>3. Seguridad de Datos</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Implementamos medidas de seguridad de nivel empresarial, incluyendo encriptación AES-256, para proteger tu información personal. Tus datos están almacenados en servidores seguros con acceso restringido.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#E6334D' }}>4. Compartir Información</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            No vendemos ni compartimos tu información personal con terceros para fines de marketing. Solo compartimos datos cuando es necesario para proporcionar nuestros servicios (por ejemplo, proveedores de email y WhatsApp para enviar notificaciones).
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#E6334D' }}>5. Tus Derechos</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Puedes hacerlo desde la configuración de tu cuenta o contactándonos directamente.
                        </p>
                    </section>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                        ¿Tienes preguntas sobre nuestra política de privacidad?
                    </p>
                    <Link href="/contact" style={{ color: '#E6334D', fontWeight: 700, textDecoration: 'none' }}>
                        Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    );
}
