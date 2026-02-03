/**
 * @file dashboard/page.tsx
 * @description Central command for users and administrators. Implements premium 
 * grid systems and visual hierarchy.
 */

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AddDocumentModal from "@/components/AddDocumentModal";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

/**
 * Dashboard Component
 * @returns {React.ReactElement} The adaptive dashboard view.
 */
export default function Dashboard(): React.ReactElement {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchUserRole();
  }, []);

  async function fetchUserRole(): Promise<void> {
    try {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      if (json.success && json.data.role === 'ADMIN') {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error("Error fetching user role", err);
    }
  }

  async function fetchStats(): Promise<void> {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      const json = await res.json();
      if (json.success) setStats(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getUrgencyStatus = (days: number) => {
    if (days < 0) return { text: 'Vencido', color: 'var(--brand-red)', icon: 'error' };
    if (days <= 7) return { text: 'Vence Pronto', color: 'var(--brand-red)', icon: 'warning' };
    if (days <= 30) return { text: 'Próximo', color: 'var(--brand-blue)', icon: 'info' };
    return { text: 'Protegido', color: 'var(--text-muted)', icon: 'check_circle' };
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-vh-100 bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <span className="icon animate-spin text-4xl text-brand-red">progress_activity</span>
          <p className="font-black uppercase tracking-widest text-[var(--text-muted)] text-xs">Sincronizando Bóveda...</p>
        </div>
      </div>
    );
  }

  // Common Header Pattern
  const DashboardHeader = ({ title, subtitle, action }: { title: string, subtitle: string, action?: React.ReactNode }) => (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-6 bg-brand-red rounded-full"></div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{title}</h1>
        </div>
        <p className="text-[var(--text-muted)] font-medium text-base flex items-center gap-2">
          {subtitle}
        </p>
      </div>
      {action}
    </header>
  );

  // ----------------------------------------------------------------------
  // VISTA ADMINISTRADOR (Panel de Control)
  // ----------------------------------------------------------------------
  if (isAdmin) {
    return (
      <main className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Sidebar />
        <div className="main-premium flex-1">
          <DashboardHeader
            title="Panel de Control"
            subtitle="Centro de comando maestro. Gestión de infraestructura y cumplimiento."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "/admin/users", icon: "manage_accounts", title: "Usuarios", desc: "Administra cuentas, roles y permisos de acceso al sistema.", color: "text-brand-blue" },
              { href: "/admin/document-types", icon: "category", title: "Categorías de Vencimiento", desc: "Configura las reglas y plazos de alerta por cada tipo de fecha.", color: "text-brand-blue" },
              { href: "/admin/documents", icon: "database", title: "Base de Datos Global", desc: "Gestión centralizada y normalización de todos los registros del sistema.", color: "text-brand-blue" },
              { href: "/admin/integrations", icon: "hub", title: "Integraciones", desc: "Configuración de notificaciones, Meta Pixel y analítica externa.", color: "text-brand-red" }
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="glass-card hover:-translate-y-2 transition-all p-10 flex flex-col gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center border border-foreground/10`}>
                  <span className={`icon text-3xl ${card.color}`}>{card.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">{card.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ----------------------------------------------------------------------
  // VISTA USUARIO (Mi Bóveda)
  // ----------------------------------------------------------------------
  return (
    <main className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />
      <div className="main-premium flex-1 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

        <DashboardHeader
          title="Panel de Control"
          subtitle="Tus fechas y vencimientos están protegidos con encriptación de alto nivel."
          action={
            <button
              onClick={() => setIsModalOpen(true)}
              id="btn-add-document"
              className="button-red px-8 py-4 flex items-center gap-3 active:scale-95"
            >
              <span className="icon">add_circle</span>
              <span className="font-black uppercase tracking-widest text-sm">Nuevo Vencimiento</span>
            </button>
          }
        />

        {!stats ? (
          <div className="glass-card p-20 text-center flex flex-col items-center">
            <span className="icon text-6xl text-brand-red mb-6">lock_reset</span>
            <p className="text-lg font-bold text-[var(--text-secondary)]">Error en el protocolo de sincronización.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* Stats Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Vencimientos", value: stats.totalDocuments, icon: "inventory_2", color: "text-brand-blue" },
                { label: "En Riesgo (30d)", value: stats.expiringSoon, icon: "warning", color: "text-brand-red", highlight: true },
                { label: "Alertas Activas", value: stats.totalReminders, icon: "notifications_active", color: "text-[var(--text)]" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-10 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{stat.label}</span>
                    <span className={`icon ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <h2 className={`text-6xl font-black ${stat.highlight ? 'text-brand-red' : ''}`}>{stat.value}</h2>
                </div>
              ))}
            </section>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Feed */}
              <section className="lg:col-span-2 glass-card p-10">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--border)]">
                  <h3 className="font-black uppercase tracking-[0.1em] text-sm italic">Protocolo de Expiración</h3>
                  <Link href="/documents" className="text-xs font-black uppercase text-brand-blue hover:underline">Ver Historial</Link>
                </div>

                <div className="flex flex-col gap-4">
                  {stats.upcomingExpirations.length === 0 ? (
                    <div className="p-20 text-center text-[var(--text-muted)] italic text-sm">
                      No se detectan amenazas de vencimiento.
                    </div>
                  ) : (
                    stats.upcomingExpirations.map((doc: any) => {
                      const status = getUrgencyStatus(doc.daysUntilExpiry);
                      return (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:bg-foreground/5 transition-all group"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center border border-foreground/10">
                              <span className="icon text-2xl text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                                {doc.subject.type === 'VEHICLE' ? 'directions_car' : 'person_outline'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-black text-base">{doc.documentType.name}</h4>
                              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">
                                {doc.subject.name} • {format(new Date(doc.expiryDate), "dd MMM yyyy", { locale: es })}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 text-right">
                            <span className="stat-pill text-[10px]" style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}30` }}>
                              {status.text}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                              {doc.daysUntilExpiry < 0 ? 'Vencido' : `En ${doc.daysUntilExpiry} días`}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              {/* Action Sidebar */}
              <aside className="flex flex-col gap-8">
                <div className="glass-card p-10 bg-brand-red/5 border-brand-red/20 relative overflow-hidden group">
                  <span className="icon absolute top-[-10px] right-[-10px] text-brand-red/5 text-8xl pointer-events-none group-hover:scale-110 transition-transform">bolt</span>
                  <h3 className="text-xl font-black mb-4">Análisis Predictivo</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium mb-8">
                    Se detecta un pico de vencimientos en 90 días. Optimiza tu presupuesto agendando renovaciones hoy.
                  </p>
                  <button className="w-full button-glass text-xs font-black py-4 active:scale-95">
                    Planificar Gestión
                  </button>
                </div>

                <div className="glass-card p-10 flex flex-col gap-6">
                  <h3 className="font-black uppercase tracking-[0.2em] text-xs text-center border-b border-[var(--border)] pb-4 italic">Operaciones Rápidas</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="button-glass w-full justify-between px-6 hover:border-brand-red/40"
                    >
                      <span className="flex items-center gap-3">
                        <span className="icon text-brand-red">qr_code_scanner</span>
                        Escaneo Rápido
                      </span>
                      <span className="icon text-xs text-[var(--text-muted)]">arrow_forward</span>
                    </button>
                    <Link
                      href="/subjects"
                      className="button-glass w-full justify-between px-6 hover:border-brand-blue/40"
                    >
                      <span className="flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="icon text-brand-blue">person_add</span>
                        Nuevo Asociado
                      </span>
                      <span className="icon text-xs text-[var(--text-muted)]">arrow_forward</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="button-glass w-full justify-between px-6 hover:border-brand-blue/40"
                    >
                      <span className="flex items-center gap-3 text-[var(--text-primary)]">
                        <span className="icon text-brand-blue">notifications_active</span>
                        Alertas & Canales
                      </span>
                      <span className="icon text-xs text-[var(--text-muted)]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>

      <AddDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStats}
      />
    </main>
  );
}
