import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/stats
 * Global statistics for administrators
 */
export async function GET() {
    try {
        const session = await getSession();

        // Safety check: Only admins can access this
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const now = new Date();
        const [
            totalUsers,
            totalDocuments,
            totalRemindersSent,
            activeUsersCount,
            recentActivity,
            userGrowth
        ] = await Promise.all([
            prisma.user.count({ where: { role: "USER" } }),
            prisma.document.count(),
            prisma.reminder.count({ where: { status: "SENT" } }),
            prisma.user.count({
                where: {
                    sessions: {
                        some: { expiresAt: { gt: now } }
                    }
                }
            }),
            prisma.auditLog.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, email: true } } }
            }),
            prisma.user.groupBy({
                by: ['createdAt'],
                _count: { id: true },
                orderBy: { createdAt: 'asc' },
                take: 30
            })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalDocuments,
                totalRemindersSent,
                activeUsersCount,
                recentActivity,
                userGrowth
            }
        });

    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
