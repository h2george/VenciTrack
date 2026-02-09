import { NextResponse } from "next/server";
import { getSession } from "@/shared/lib/auth";
import { prisma } from "@/server/db/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/document-types
 * Lists global document types accessible to all users.
 */
export async function GET() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const types = await prisma.documentType.findMany({
            where: {
                OR: [
                    { isGlobal: true },
                    { userId: session.userId }
                ]
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({ success: true, data: types });
    } catch (error) {
        console.error("Error fetching document types:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
