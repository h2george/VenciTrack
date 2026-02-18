import { Link } from "react-router-dom";

export const CTA = () => {
    return (
        <section className="py-32 bg-white dark:bg-slate-900 border-t border-border">
            <div className="container mx-auto px-6">
                <div className="bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-blue/20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent)]" />

                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 relative z-10">
                        ¿Listo para tomar <br /> el control total?
                    </h2>

                    <p className="max-w-xl mx-auto text-blue-100 text-lg md:text-xl font-medium mb-12 relative z-10">
                        Únete a los profesionales que ya eliminaron el riesgo de vencimientos con VenciTrack.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center bg-white text-brand-blue rounded-2xl text-base font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                        >
                            Comenzar Ahora
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
