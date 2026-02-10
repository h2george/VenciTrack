import { Link } from "react-router-dom";
import { ShieldCheck, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { APP_VERSION } from "@/shared/lib/versions";
import { useEffect, useState } from "react";

export function Footer() {
    const [apiVersion, setApiVersion] = useState<string>("...");

    useEffect(() => {
        fetch("/api/version")
            .then(res => res.json())
            .then(data => setApiVersion(data.version))
            .catch(() => setApiVersion("?"));
    }, []);

    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    <div>
                        <Link href="/" className="flex items-center gap-2 font-black uppercase tracking-tighter text-xl mb-4">
                            <ShieldCheck className="text-primary" size={24} />
                            <span>VenciTrack</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Gestión inteligente de vencimientos para evitar riesgos.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Redes</h4>
                        <div className="flex gap-4">
                            <Facebook size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
                            <Instagram size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
                            <Linkedin size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Preferencia</h4>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                    <p>© 2026 Vencitrack</p>
                    <div className="flex gap-4">
                        <span>Client v{APP_VERSION}</span>
                        <span>API v{apiVersion}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
