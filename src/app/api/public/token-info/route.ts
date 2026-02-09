import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/token-info
 * HU-4.1: Public endpoint to verify a token and get basic document data
 * This allows the public interface to show what is being updated without requiring login.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ success: false, error: "Token missing" }, { status: 400 });
        }

        const secureToken = await prisma.secureToken.findUnique({
            where: { token },
            include: {
                document: {
                    include: {
                        subject: true,
                        documentType: true
                    }
                }
            }
        });

        if (!secureToken) {
            return NextResponse.json({ success: false, error: "Token invalid" }, { status: 404 });
        }

        if (secureToken.usedAt) {
            return NextResponse.json({ success: false, error: "Token already used" }, { status: 410 });
        }

        if (secureToken.expiresAt < new Date()) {
            return NextResponse.json({ success: false, error: "Token expired" }, { status: 403 });
        }

        // Return only non-sensitive data needed for the UI
        return NextResponse.json({
            success: true,
            data: {
                subject: { name: secureToken.document.subject.name },
                documentType: { name: secureToken.document.documentType.name },
                expiryDate: secureToken.document.expiryDate,
                action: secureToken.action
            }
        });

    } catch (error) {
        console.error("Token Info Error:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
