import { Car, Heart, Building, Globe } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
    {
        icon: Car,
        title: "Vehicular",
        items: ["SOAT", "Revisiones Técnicas", "Seguros Vehiculares", "Permisos de Carga"],
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-900/10",
        border: "border-blue-100 dark:border-blue-900/20",
        dot: "bg-blue-300 dark:bg-blue-700",
    },
    {
        icon: Heart,
        title: "Salud & Personal",
        items: ["Seguros Médicos", "Carnets de Sanidad", "Licencias", "Pasaportes"],
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-900/10",
        border: "border-red-100 dark:border-red-900/20",
        dot: "bg-red-300 dark:bg-red-700",
    },
    {
        icon: Building,
        title: "Corporativo",
        items: ["Contratos", "Licencias Munic.", "Extintores", "Certificados ITSE"],
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/10",
        border: "border-amber-100 dark:border-amber-900/20",
        dot: "bg-amber-300 dark:bg-amber-700",
    },
    {
        icon: Globe,
        title: "Viajes & Otros",
        items: ["Visas", "Seguros de Viaje", "Membresías", "Garantías"],
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-900/10",
        border: "border-purple-100 dark:border-purple-900/20",
        dot: "bg-purple-300 dark:bg-purple-700",
    },
];

export const DocumentShowcase = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-foreground">
                        Más que una <span className="text-brand-blue">agenda</span>
                    </h2>
                    <p className="text-muted text-lg font-medium">
                        Un gestor integral para tu vida y negocio. Centraliza todo tipo de vencimiento.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={`p-8 rounded-3xl bg-surface border ${cat.border}
                                        hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-default`}
                        >
                            <div className={`size-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6`}>
                                <cat.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-foreground">{cat.title}</h3>
                            <ul className="space-y-2 flex-1">
                                {cat.items.map((item) => (
                                    <li key={item} className="text-sm font-medium text-muted flex items-center gap-2">
                                        <div className={`size-1.5 rounded-full ${cat.dot}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
