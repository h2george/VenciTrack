import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getSession } from "@/shared/lib/auth";

export async function GET(
    _request: NextRequest,
    context: any
) {
    try {
        const { params } = context;
        const session = await getSession();
        if (!session?.userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        // Await params carefully
        const { id } = await params;

        const document = await prisma.document.findFirst({
            where: { id, userId: session.userId },
            include: { subject: true, documentType: true }
        });

        if (!document) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: document });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    context: any
) {
    try {
        const { params } = context;
        const session = await getSession();
        if (!session?.userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await request.json();
        const { documentTypeId, alias, expiryDate, status } = body;

        const updated = await prisma.document.update({
            where: { id, userId: session.userId },
            data: {
                documentTypeId,
                alias,
                expiryDate: expiryDate ? new Date(expiryDate) : undefined,
                status
            }
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    context: any
) {
    try {
        const { params } = context;
        const session = await getSession();
        if (!session?.userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        await prisma.document.delete({
            where: { id, userId: session.userId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
