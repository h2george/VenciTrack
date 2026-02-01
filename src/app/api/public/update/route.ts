import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * POST /api/public/update
 * Public endpoint for updating document expiry date via secure token
 * No authentication required - security via token validation
 * 
 * Body:
 * - token: string (required)
 * - newExpiryDate: ISO date string (required)
 * - action: 'UPDATE_DATE' | 'DEACTIVATE' (optional, defaults to UPDATE_DATE)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, newExpiryDate, action = 'UPDATE_DATE' } = body;

        // Validation
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token is required' },
                { status: 400 }
            );
        }

        // Find and validate token
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
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 404 }
            );
        }

        // Check if token has already been used
        if (secureToken.usedAt) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token has already been used',
                    usedAt: secureToken.usedAt
                },
                { status: 400 }
            );
        }

        // Check if token has expired
        const now = new Date();
        if (secureToken.expiresAt < now) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token has expired',
                    expiredAt: secureToken.expiresAt
                },
                { status: 400 }
            );
        }

        // Validate action matches token's intended action
        if (secureToken.action !== action) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Token is not valid for action: ${action}. Expected: ${secureToken.action}`
                },
                { status: 400 }
            );
        }

        let updatedDocument;
        let auditDescription;

        // Execute the action
        if (action === 'UPDATE_DATE') {
            if (!newExpiryDate) {
                return NextResponse.json(
                    { success: false, error: 'New expiry date is required for UPDATE_DATE action' },
                    { status: 400 }
                );
            }

            const parsedDate = new Date(newExpiryDate);

            // Validate date is in the future
            if (parsedDate <= now) {
                return NextResponse.json(
                    { success: false, error: 'New expiry date must be in the future' },
                    { status: 400 }
                );
            }

            updatedDocument = await prisma.document.update({
                where: { id: secureToken.documentId },
                data: {
                    expiryDate: parsedDate,
                    updatedAt: now
                },
                include: {
                    subject: true,
                    documentType: true
                }
            });

            auditDescription = `Document ${updatedDocument.documentType.name} for ${updatedDocument.subject.name} updated via public link. New expiry: ${parsedDate.toISOString()}`;

        } else if (action === 'DEACTIVATE') {
            updatedDocument = await prisma.document.update({
                where: { id: secureToken.documentId },
                data: {
                    status: 'INACTIVE',
                    updatedAt: now
                },
                include: {
                    subject: true,
                    documentType: true
                }
            });

            auditDescription = `Document ${updatedDocument.documentType.name} for ${updatedDocument.subject.name} deactivated via public link`;

        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid action' },
                { status: 400 }
            );
        }

        // Mark token as used
        await prisma.secureToken.update({
            where: { id: secureToken.id },
            data: { usedAt: now }
        });

        // Create audit log
        await prisma.auditLog.create({
            data: {
                entityType: 'DOCUMENT',
                entityId: secureToken.documentId,
                action: action,
                description: auditDescription,
                userId: `public_token:${token.substring(0, 8)}...`
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Document updated successfully',
            data: {
                document: updatedDocument,
                action: action,
                previousExpiryDate: secureToken.document.expiryDate,
                newExpiryDate: action === 'UPDATE_DATE' ? updatedDocument.expiryDate : null
            }
        });

    } catch (error) {
        console.error('Error updating document via public link:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update document' },
            { status: 500 }
        );
    }
}
