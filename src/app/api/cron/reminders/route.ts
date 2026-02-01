import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/notifications";
import { generateSecureToken, TOKEN_EXPIRY_DAYS } from "@/lib/tokens";

export const dynamic = 'force-dynamic';

export async function GET() {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // 1. Get all active documents expiring soon
    const docs = await prisma.document.findMany({
        where: {
            status: "ACTIVE",
            expiryDate: {
                lte: thirtyDaysFromNow,
                gt: now,
            }
        },
        include: {
            subject: true,
            documentType: true
        }
    });

    const results = [];

    for (const doc of docs) {
        // 2. Simple logic: Send reminder if it's the first time OR weekly
        // For this prototype, we'll just send it once if no reminder exists for this doc in last 7 days
        const lastReminder = await prisma.reminder.findFirst({
            where: { documentId: doc.id },
            orderBy: { sentAt: 'desc' }
        });

        const isRecentlyNotified = lastReminder &&
            (now.getTime() - lastReminder.sentAt.getTime()) < (7 * 24 * 60 * 60 * 1000);

        if (!isRecentlyNotified) {
            // 3. Generate Secure Link
            const token = generateSecureToken();
            await prisma.secureToken.create({
                data: {
                    token,
                    documentId: doc.id,
                    expiresAt: new Date(now.getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
                    action: "UPDATE_DATE"
                }
            });

            const actionUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/u/${token}`;

            // 4. Send Notification
            const user = await prisma.user.findUnique({
                where: { id: doc.userId }
            });
            const recipientEmail = user?.email || "admin@vencitrack.com";

            const res = await sendNotification(
                doc.subject.name,
                doc.documentType.name,
                doc.expiryDate,
                "EMAIL", // Default to Email for now
                actionUrl,
                recipientEmail
            );

            // 5. Log Reminder
            await prisma.reminder.create({
                data: {
                    documentId: doc.id,
                    channel: "EMAIL",
                    status: res.success ? "SENT" : "FAILED",
                    message: res.message
                }
            });

            // 6. Audit Log
            await prisma.auditLog.create({
                data: {
                    entityType: "DOCUMENT",
                    entityId: doc.id,
                    action: "NOTIFY",
                    description: `Reminder sent to associates of ${doc.subject.name}`
                }
            });

            results.push({ docId: doc.id, status: "NOTIFIED" });
        } else {
            results.push({ docId: doc.id, status: "SKIPPED_RECENT" });
        }
    }

    return NextResponse.json({
        processed: docs.length,
        results
    });
}
