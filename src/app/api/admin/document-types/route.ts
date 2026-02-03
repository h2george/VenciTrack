import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/document-types
 * HU-1.1: List configurable document types
 */
export async function GET() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        const types = await prisma.documentType.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({ success: true, data: types });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}

/**
 * POST /api/admin/document-types
 * HU-1.1: Create unique document types
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const { name, category, description, gracePeriodDays, requiresExpiry, targetType } = body;

        if (!name || !category) {
            return NextResponse.json({ success: false, error: "Name and Category are required" }, { status: 400 });
        }

        const newType = await prisma.documentType.create({
            data: {
                name,
                category,
                description,
                gracePeriodDays: gracePeriodDays || 30,
                requiresExpiry: requiresExpiry ?? true,
                targetType: targetType || "BOTH",
                isGlobal: true,
                userId: session.userId
            }
        });

        // HU-5.1: Audit creation
        await prisma.auditLog.create({
            data: {
                entityType: 'DOCUMENT_TYPE',
                entityId: newType.id,
                action: 'CREATE',
                description: `HU-1.1: Nuevo tipo de documento configurado: ${name}. Relevancia: Eficiencia.`,
                userId: session.userId
            }
        });

        return NextResponse.json({ success: true, data: newType });
    } catch (error) {
        console.error("Error creating document type:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
