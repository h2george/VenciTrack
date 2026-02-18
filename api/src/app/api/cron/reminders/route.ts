import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { sendNotification } from "@/shared/lib/notifications";
import { generateSecureToken } from "@/shared/lib/tokens";

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/reminders
 * Punto de entrada para el protocolo automatizado de recordatorios.
 * Ejecuta la lógica dinámica basándose en Preferencias de Usuario (HU-8.1).
 */
export async function GET() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Epic 7.1: Los tokens expiran en 48 horas para seguridad de alta fidelidad
    const SECURE_TOKEN_EXPIRY_MS = 48 * 60 * 60 * 1000;

    // 1. Obtener todos los documentos activos con sus usuarios y preferencias específicas (HU-8.1)
    const activeDocs = await prisma.document.findMany({
        where: {
            status: "ACTIVE",
            deactivatedAt: null,
        },
        include: {
            subject: true,
            documentType: true,
            user: {
                include: {
                    preferences: true
                }
            }
        }
    });

    const results = [];

    for (const doc of activeDocs) {
        // Cálculo de días restantes
        const expiryDate = new Date(doc.expiryDate);
        const diffInTime = expiryDate.getTime() - startOfToday.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

        // Epic 8.1 & 3.1: Reglas configurables basadas en preferencias de usuario
        const userPrefs = doc.user?.preferences;
        const anticipationDays = userPrefs?.anticipationDays ?? 30; // Predeterminado o específico del usuario
        const channels = userPrefs?.channels?.split(',') || ["EMAIL"];
        const frequency = userPrefs?.frequency || "IMMEDIATE";

        // Lógica: Iniciar en 'anticipationDays', luego seguir conteos críticos (7, 3, 1)
        const insistenceIntervals = new Set([anticipationDays, 7, 3, 1]);

        // HU-3.1: Si la frecuencia es IMMEDIATE, añadimos intervalos semanales entre inicio y zona crítica
        if (frequency === "IMMEDIATE") {
            for (let d = anticipationDays - 7; d > 7; d -= 7) {
                insistenceIntervals.add(d);
            }
        }

        // Decisión final: Notificar si está en un intervalo específico O en territorio crítico vencido
        const shouldNotify = insistenceIntervals.has(diffInDays) || (diffInDays <= 0 && diffInDays > -3);

        if (shouldNotify) {
            // Verificar si ya se envió un recordatorio hoy para evitar spam
            const alreadySentToday = await prisma.reminder.findFirst({
                where: {
                    documentId: doc.id,
                    sentAt: { gte: startOfToday },
                    status: "SENT"
                }
            });

            if (!alreadySentToday) {
                const token = generateSecureToken();
                await prisma.secureToken.create({
                    data: {
                        token,
                        documentId: doc.id,
                        expiresAt: new Date(now.getTime() + SECURE_TOKEN_EXPIRY_MS),
                        action: "UPDATE_DATE"
                    }
                });

                const actionUrl = `${process.env['NEXT_PUBLIC_BASE_URL'] || 'http://localhost:3000'}/u/${token}`;
                const recipientEmail = doc.user?.email || "admin@vencitrack.com";

                // HU-8.1: Soporte multicanal (Email y futuro WhatsApp)
                for (const channel of channels) {
                    const res = await sendNotification(
                        doc.subject.name,
                        doc.documentType.name,
                        doc.expiryDate,
                        channel as any,
                        actionUrl,
                        recipientEmail
                    );

                    const metadata = JSON.stringify({
                        target: recipientEmail,
                        daysRemaining: diffInDays,
                        anticipationDays,
                        channel,
                        frequency,
                        tokenAction: "UPDATE_DATE",
                        requestId: now.getTime()
                    });

                    await prisma.reminder.create({
                        data: {
                            documentId: doc.id,
                            channel,
                            status: res.success ? "SENT" : "FAILED",
                            message: `Alerta: ${diffInDays} días restantes. Activado por regla ${frequency} (${anticipationDays}d anticipación).`,
                            metadata
                        }
                    });

                    // HU-5.2: Evidencia en la bitácora de auditoría
                    await prisma.auditLog.create({
                        data: {
                            entityType: "DOCUMENT",
                            entityId: doc.id,
                            action: "RISK_COMMUNICATION",
                            description: `Protocolo de Riesgo: Notificación enviada vía ${channel} a ${recipientEmail}. Razón: ${diffInDays} días para vencimiento.`,
                            metadata,
                            userId: doc.userId
                        }
                    });
                }

                results.push({ docId: doc.id, days: diffInDays, status: "NOTIFICADO", channels });
            }
        }
    }

    return NextResponse.json({
        success: true,
        stats: {
            processed: activeDocs.length,
            notified: results.length
        },
        results
    });
}
