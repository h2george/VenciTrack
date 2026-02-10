import { prisma } from "@/server/db/prisma";

/**
 * Fetches all audit logs with user information
 * Follows Kaizen pattern: Centralized query logic for reusability and type safety
 */
export async function getAuditLogs() {
    return await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true
        }
    });
}
