import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, User, Mail, UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al registrarse");
            }

            // Registro exitoso -> Redirigir al dashboard
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-10 text-center">
                    <Link to="/" className="group mb-6">
                        <div className="size-16 rounded-2xl bg-brand-red text-white flex items-center justify-center shadow-2xl shadow-brand-red/20 transition-transform group-hover:scale-105">
                            <ShieldCheck size={32} />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">Crear Cuenta</h1>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Únete a la plataforma profesional</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input id="name" name="name" type="text" placeholder="Juan Pérez" className="pl-12" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input id="email" name="email" type="email" placeholder="admin@empresa.com" className="pl-12" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-12" required minLength={6} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red/90 text-white" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Registrando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <UserPlus size={16} />
                                Crear Cuenta Gratis
                            </span>
                        )}
                    </Button>
                </form>

                <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-foreground hover:underline">Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}
