import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/stats
 * Returns dashboard statistics for the authenticated user
 * - Total documents
 * - Expiring soon (30 days)
 * - Expired documents
 * - Alerts sent (total reminders)
 * - Documents by type
 * - Documents by status
 * - Upcoming expirations timeline
 */
export async function GET() {
    try {
        // Get authenticated user
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const now = new Date();
        if (session.role === 'ADMIN') {
            const [
                totalDocuments,
                totalUsers,
                totalReminders,
                activities
            ] = await Promise.all([
                prisma.document.count(),
                prisma.user.count(),
                prisma.reminder.count({ where: { status: 'SENT' } }),
                prisma.auditLog.findMany({
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: { user: true }
                })
            ]);

            // Documents expiring today
            const expiringToday = await prisma.document.count({
                where: {
                    status: 'ACTIVE',
                    expiryDate: {
                        gte: new Date(now.setHours(0, 0, 0, 0)),
                        lte: new Date(now.setHours(23, 59, 59, 999))
                    }
                }
            });

            return NextResponse.json({
                success: true,
                data: {
                    overview: {
                        totalDocuments,
                        totalUsers,
                        totalReminders,
                        expiringToday
                    },
                    activities: activities.map(log => ({
                        user: log.user?.name || "Sistema",
                        action: log.description,
                        time: log.createdAt
                    }))
                }
            });
        }

        // Regular User Logic
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        // Parallel queries for performance - all filtered by userId
        const [
            totalDocuments,
            expiringSoon,
            expired,
            totalReminders,
            documentsByType,
            documentsByStatus,
            upcomingExpirations
        ] = await Promise.all([
            // Total documents for this user
            prisma.document.count({
                where: { userId: session.userId }
            }),

            // Expiring soon (next 30 days) for this user
            prisma.document.count({
                where: {
                    userId: session.userId,
                    status: 'ACTIVE',
                    expiryDate: {
                        lte: thirtyDaysFromNow,
                        gte: now
                    }
                }
            }),

            // Expired documents for this user
            prisma.document.count({
                where: {
                    userId: session.userId,
                    expiryDate: {
                        lt: now
                    },
                    status: 'ACTIVE'
                }
            }),

            // Total reminders sent for this user's documents
            prisma.reminder.count({
                where: {
                    status: 'SENT',
                    document: {
                        userId: session.userId
                    }
                }
            }),

            // Documents grouped by type for this user
            prisma.document.groupBy({
                by: ['documentTypeId'],
                where: { userId: session.userId },
                _count: {
                    id: true
                }
            }),

            // Documents grouped by status for this user
            prisma.document.groupBy({
                by: ['status'],
                where: { userId: session.userId },
                _count: {
                    id: true
                }
            }),

            // Upcoming expirations (next 90 days) for this user
            prisma.document.findMany({
                where: {
                    userId: session.userId,
                    status: 'ACTIVE',
                    expiryDate: {
                        gte: now,
                        lte: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
                    }
                },
                include: {
                    subject: true,
                    documentType: true
                },
                orderBy: {
                    expiryDate: 'asc'
                },
                take: 10
            })
        ]);

        // Enrich documents by type with type names
        const documentTypeIds = documentsByType.map(d => d.documentTypeId);
        const types = await prisma.documentType.findMany({
            where: {
                id: {
                    in: documentTypeIds
                }
            }
        });

        const typeMap = new Map(types.map(t => [t.id, t.name]));
        const documentsByTypeEnriched = documentsByType.map(d => ({
            type: typeMap.get(d.documentTypeId) || 'Unknown',
            count: d._count.id
        }));

        // Calculate urgency levels
        const urgencyLevels = {
            critical: 0,  // < 7 days
            warning: 0,   // 7-15 days
            normal: 0     // 16-30 days
        };

        await Promise.all([
            prisma.document.count({
                where: {
                    status: 'ACTIVE',
                    expiryDate: {
                        gte: now,
                        lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                    }
                }
            }).then(count => { urgencyLevels.critical = count; }),

            prisma.document.count({
                where: {
                    status: 'ACTIVE',
                    expiryDate: {
                        gte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
                        lte: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
                    }
                }
            }).then(count => { urgencyLevels.warning = count; }),

            prisma.document.count({
                where: {
                    status: 'ACTIVE',
                    expiryDate: {
                        gte: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
                        lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                }
            }).then(count => { urgencyLevels.normal = count; })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                overview: {
                    totalDocuments,
                    expiringSoon,
                    expired,
                    totalReminders
                },
                urgencyLevels,
                documentsByType: documentsByTypeEnriched,
                documentsByStatus: documentsByStatus.map(d => ({
                    status: d.status,
                    count: d._count.id
                })),
                upcomingExpirations: upcomingExpirations.map(doc => {
                    const daysUntilExpiry = Math.ceil(
                        (doc.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return {
                        ...doc,
                        daysUntilExpiry
                    };
                })
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
