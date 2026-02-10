
import Sidebar from "@/shared/components/layout/Sidebar";
import { useState } from "react";
import { Bell, Mail, MessageSquare, Save, User } from "lucide-react";
import { useAuthContext } from "@/features/auth/auth-context";

export default function SettingsPage() {
    const { user } = useAuthContext();
    const [notifications, setNotifications] = useState({
        email: true,
        whatsapp: false,
        frequency: "DAILY"
    });

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col transition-all duration-300 ml-64 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Configuración</h1>
                    <p className="text-muted-foreground">Gestiona tu perfil y preferencias de alerta.</p>
                </header>

                <div className="grid gap-8 max-w-4xl">
                    {/* Perfil de Usuario */}
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">Perfil de Usuario</h2>
                                <p className="text-xs text-muted-foreground">Información personal y de acceso</p>
                            </div>
                        </div>
                        <div className="p-6 grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nombre Completo</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name || "Usuario"}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Correo Electrónico</label>
                                <input
                                    type="email"
                                    defaultValue="usuario@empresa.com"
                                    className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Contraseña</label>
                                <div className="flex gap-4">
                                    <input
                                        type="password"
                                        defaultValue="********"
                                        className="flex-1 bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button className="px-6 py-2.5 bg-secondary text-secondary-foreground font-bold rounded-xl text-xs uppercase tracking-wide hover:bg-secondary/80">
                                        Cambiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preferencias de Notificación */}
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">Notificaciones</h2>
                                <p className="text-xs text-muted-foreground">Canales y frecuencia de alertas</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Notificaciones por Email</p>
                                        <p className="text-xs text-muted-foreground">Recibe alertas de vencimiento en tu bandeja.</p>
                                    </div>
                                </div>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input
                                        type="checkbox"
                                        name="toggle"
                                        id="email-toggle"
                                        checked={notifications.email}
                                        onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer peer checked:right-0 checked:border-primary border-gray-300 left-0"
                                    />
                                    <label htmlFor="email-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-primary"></label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border opacity-75">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm">WhatsApp</p>
                                            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase">Próximamente</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Alertas inmediatas en tu celular.</p>
                                    </div>
                                </div>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none opacity-50 cursor-not-allowed">
                                    <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                                    <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full border-4 border-gray-300"></div>
                                </div>
                            </div>

                            <div className="grid gap-3 pt-4 border-t border-border">
                                <label className="text-sm font-medium">Frecuencia de Resumen</label>
                                <select
                                    value={notifications.frequency}
                                    onChange={(e) => setNotifications(prev => ({ ...prev, frequency: e.target.value }))}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                >
                                    <option value="IMMEDIATE">Inmediato (Apenas ocurra)</option>
                                    <option value="DAILY">Diario (Resumen a las 8:00 AM)</option>
                                    <option value="WEEKLY">Semanal (Resumen los Lunes)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button className="px-8 py-4 bg-primary text-primary-foreground font-black rounded-xl text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                            <Save size={18} />
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
