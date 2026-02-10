import { prisma } from "@/server/db/prisma";

interface DashboardStats {
    total: number;
    atRisk: number;
    nextMonth: number;
}

/**
 * Fetches all documents with relational data
 */
export async function getDashboardDocuments() {
    return await prisma.document.findMany({
        include: {
            documentType: true,
            subject: true,
        },
        orderBy: {
            expiryDate: 'asc'
        }
    });
}

/**
 * Fetches dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
    const docs = await prisma.document.findMany();
    const now = new Date();
    const inAMonth = new Date();
    inAMonth.setDate(now.getDate() + 30);

    return {
        total: docs.length,
        atRisk: docs.filter((d: any) => new Date(d.expiryDate) < inAMonth).length,
        nextMonth: docs.filter((d: any) => {
            const date = new Date(d.expiryDate);
            return date >= now && date < inAMonth;
        }).length
    };
}
