import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="size-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-2xl shadow-primary/20">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">Ingreso de Personal</h1>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Acceso Restringido a Protocolos</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Usuario / Email</Label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input id="email" type="email" placeholder="ADMIN-001" className="pl-12" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Palabra Clave</Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input id="password" type="password" placeholder="••••••••" className="pl-12" required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Autenticando..." : "Acceder al Sistema"}
                    </Button>
                </form>

                <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    ¿No tienes acceso? <Link to="/register" className="text-primary hover:underline">Solicitar Registro</Link>
                </p>
            </div>
        </div>
    );
}
