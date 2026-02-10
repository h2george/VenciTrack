import { Link } from "react-router-dom";

export const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10"></div>
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                    Protege tu operación <br /> <span className="text-primary">hoy mismo.</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
                    Únete a la red de gestión profesional. Es 100% gratuito. Sin límites. Sin riesgos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="h-14 px-10 flex items-center justify-center bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                        Activar Cuenta Ahora
                    </Link>
                </div>
            </div>
        </section>
    );
};
