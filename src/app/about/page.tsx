import Link from "next/link";

export default function AboutPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: '#0A0F1A' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '40%', height: '40%', background: 'rgba(26, 75, 142, 0.15)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '3rem' }}>
                    <span style={{ fontFamily: 'Material Symbols Outlined' }}>arrow_back</span>
                    Volver al inicio
                </Link>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #E6334D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Sobre VenciTrack
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '3rem' }}>
                        Somos una startup tecnológica dedicada a resolver uno de los problemas más comunes pero críticos: el olvido de fechas de vencimiento importantes.
                    </p>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem', padding: '3rem', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Nuestra Misión</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Proteger a personas y empresas de las consecuencias de documentos vencidos mediante tecnología de alertas inteligentes y gestión automatizada. Creemos que nadie debería perder dinero, tiempo o tranquilidad por un vencimiento olvidado.
                        </p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2rem', padding: '3rem', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Nuestra Visión</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Convertirnos en la plataforma líder de gestión de vencimientos en América Latina, expandiendo nuestros servicios a seguros de salud, contratos empresariales, certificaciones profesionales y más.
                        </p>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, rgba(230, 51, 77, 0.1), rgba(26, 75, 142, 0.15))', backdropFilter: 'blur(16px)', border: '1px solid rgba(230, 51, 77, 0.2)', borderRadius: '2rem', padding: '3rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>¿Listo para empezar?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
                            Únete a miles de usuarios que ya confían en VenciTrack
                        </p>
                        <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#E6334D', color: 'white', fontWeight: 700, padding: '1rem 2rem', borderRadius: '0.75rem', textDecoration: 'none', boxShadow: '0 10px 25px rgba(230, 51, 77, 0.25)' }}>
                            Comenzar Gratis
                            <span style={{ fontFamily: 'Material Symbols Outlined' }}>arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
