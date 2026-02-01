import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/document-types
 * Lists all document types
 * Query params:
 * - category: Filter by category (optional)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const where: any = {};
        if (category) {
            where.category = category;
        }

        const documentTypes = await prisma.documentType.findMany({
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
            data: documentTypes,
            count: documentTypes.length
        });

    } catch (error) {
        console.error('Error fetching document types:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch document types' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/document-types
 * Creates a new document type
 * Body:
 * - name: string
 * - category: string
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, category } = body;

        if (!name || !category) {
            return NextResponse.json(
                { success: false, error: 'Name and category are required' },
                { status: 400 }
            );
        }

        const documentType = await prisma.documentType.create({
            data: {
                name,
                category
            }
        });

        await prisma.auditLog.create({
            data: {
                entityType: 'DOCUMENT_TYPE',
                entityId: documentType.id,
                action: 'CREATE',
                description: `Document type ${name} created in category ${category}`
            }
        });

        return NextResponse.json({
            success: true,
            data: documentType
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating document type:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create document type' },
            { status: 500 }
        );
    }
}
