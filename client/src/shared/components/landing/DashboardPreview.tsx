import { motion } from "framer-motion";

export const DashboardPreview = () => {
    return (
        <section className="relative py-12 -mt-32 z-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 bg-background/50 backdrop-blur-xl group"
                >
                    <div className="aspect-[16/10] bg-zinc-900 flex items-center justify-center overflow-hidden">
                        {/* 
                            Nota: Usando una imagen representativa premium de dashboard. 
                            En una implementación real, aquí iría el screenshot real de la app.
                        */}
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Vista Previa del Panel VenciTrack"
                            className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent"></div>

                        {/* Overlay elements for 'High Tech' feel */}
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center gap-2">
                            <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Sistema Activo</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
