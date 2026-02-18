import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-32 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden
                               shadow-[0_40px_100px_-20px_rgba(0,80,200,0.4)]"
                >
                    {/* Radial shine */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-white/10 blur-[60px] pointer-events-none" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 relative z-10"
                    >
                        ¿Listo para tomar <br /> el control total?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.7 }}
                        className="max-w-xl mx-auto text-blue-100 text-lg md:text-xl font-medium mb-12 relative z-10"
                    >
                        Únete a los profesionales que ya eliminaron el riesgo de vencimientos con VenciTrack.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10"
                    >
                        <Link
                            to="/register"
                            className="w-full sm:w-auto h-16 px-12 inline-flex items-center justify-center
                                       bg-white text-brand-blue rounded-2xl text-base font-black uppercase tracking-widest
                                       hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]
                                       transition-all duration-300 active:scale-95 group shadow-xl"
                        >
                            Comenzar Ahora
                            <Zap size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
