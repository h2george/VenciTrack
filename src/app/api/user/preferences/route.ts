import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/user/preferences
 * Retorna las preferencias de notificación para el usuario autenticado (HU-8.1).
 */
export async function GET() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
        }

        const prefs = await prisma.userPreference.findUnique({
            where: { userId: session.userId }
        });

        if (prefs) {
            return NextResponse.json({
                success: true,
                data: {
                    ...prefs,
                    channels: prefs.channels.split(',')
                }
            });
        }

        return NextResponse.json({ success: true, data: null });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error Interno" }, { status: 500 });
    }
}

/**
 * POST /api/user/preferences
 * Updates notification preferences (HU-8.1)
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { channels, frequency, anticipationDays } = body;

        const updatedPrefs = await prisma.userPreference.upsert({
            where: { userId: session.userId },
            update: {
                channels: Array.isArray(channels) ? channels.join(',') : "EMAIL",
                frequency: frequency || "IMMEDIATE",
                anticipationDays: anticipationDays ?? 30,
            },
            create: {
                userId: session.userId,
                channels: Array.isArray(channels) ? channels.join(',') : "EMAIL",
                frequency: frequency || "IMMEDIATE",
                anticipationDays: anticipationDays ?? 30,
            }
        });

        // Audit log for preference change (HU-5.1)
        await prisma.auditLog.create({
            data: {
                entityType: 'USER_PREFERENCE',
                entityId: updatedPrefs.id,
                action: 'UPDATE',
                description: `HU-8.1: Preferencias de notificación actualizadas (Canales: ${updatedPrefs.channels}).`,
                userId: session.userId
            }
        });

        return NextResponse.json({ success: true, data: updatedPrefs });
    } catch (error) {
        console.error("Error updating preferences:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
