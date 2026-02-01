import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/users
 * List all users with their document counts for administrators
 */
export async function GET() {
    try {
        const session = await getSession();

        // Safety check: Only admins can access this
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: { role: "USER" },
            select: {
                id: true,
                name: true,
                email: true,
                company: true,
                createdAt: true,
                _count: {
                    select: {
                        documents: true,
                        subjects: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error("Admin users list error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
