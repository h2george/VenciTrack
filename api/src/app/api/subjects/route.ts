import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getSession } from "@/shared/lib/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/subjects
 * Lists all subjects (people or vehicles) for the authenticated user
 * Query params:
 * - type: PERSON | VEHICLE (optional)
 */
export async function GET(request: NextRequest) {
    try {
        // Get authenticated user
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        const where: any = {
            userId: session.userId // Filter by authenticated user
        };

        if (type) {
            where.type = type;
        }

        const subjects = await prisma.subject.findMany({
            where,
            include: {
                _count: {
                    select: { documents: true }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json({
            success: true,
            data: subjects,
            count: subjects.length
        });

    } catch (error) {
        console.error('Error fetching subjects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch subjects' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/subjects
 * Creates a new subject (person or vehicle) for the authenticated user
 * Body:
 * - type: PERSON | VEHICLE
 * - name: string
 * - details: string (optional - e.g., plate number, DNI, etc.)
 */
export async function POST(request: NextRequest) {
    try {
        // Get authenticated user
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { type, name, details } = body;

        if (!type || !name) {
            return NextResponse.json(
                { success: false, error: 'Type and name are required' },
                { status: 400 }
            );
        }

        if (!['PERSON', 'VEHICLE'].includes(type)) {
            return NextResponse.json(
                { success: false, error: 'Type must be PERSON or VEHICLE' },
                { status: 400 }
            );
        }

        const subject = await prisma.subject.create({
            data: {
                userId: session.userId,
                type,
                name,
                details: details || null
            }
        });

        await prisma.auditLog.create({
            data: {
                entityType: 'SUBJECT',
                entityId: subject.id,
                action: 'CREATE',
                description: `Subject ${name} (${type}) created`,
                userId: session.userId
            }
        });

        return NextResponse.json({
            success: true,
            data: subject
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating subject:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create subject' },
            { status: 500 }
        );
    }
}
