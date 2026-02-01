import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

/**
 * GET /api/documents
 * Lists all documents for the authenticated user with optional filters
 * Query params:
 * - status: ACTIVE | EXPIRED | INACTIVE
 * - subjectId: Filter by subject
 * - documentTypeId: Filter by document type
 * - expiringSoon: true (next 30 days)
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const subjectId = searchParams.get('subjectId');
    const documentTypeId = searchParams.get('documentTypeId');
    const expiringSoon = searchParams.get('expiringSoon') === 'true';

    const where: any = {
      userId: session.userId // Filter by authenticated user
    };

    if (status) {
      where.status = status;
    }

    if (subjectId) {
      where.subjectId = subjectId;
    }

    if (documentTypeId) {
      where.documentTypeId = documentTypeId;
    }

    if (expiringSoon) {
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      where.expiryDate = {
        lte: thirtyDaysFromNow,
        gte: now
      };
    }

    const documents = await prisma.document.findMany({
      where,
      include: {
        subject: true,
        documentType: true,
        reminders: {
          orderBy: { sentAt: 'desc' },
          take: 1
        }
      },
      orderBy: {
        expiryDate: 'asc'
      }
    });

    // Calculate days until expiry for each document
    const documentsWithDays = documents.map(doc => {
      const now = new Date();
      const daysUntilExpiry = Math.ceil(
        (doc.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...doc,
        daysUntilExpiry,
        isExpired: daysUntilExpiry < 0,
        isExpiringSoon: daysUntilExpiry >= 0 && daysUntilExpiry <= 30
      };
    });

    return NextResponse.json({
      success: true,
      data: documentsWithDays,
      count: documentsWithDays.length
    });

  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/documents
 * Creates a new document for the authenticated user
 * Body:
 * - documentTypeId: string
 * - subjectId: string
 * - expiryDate: ISO date string
 * - status?: ACTIVE (default)
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { documentTypeId, subjectId, expiryDate, status = 'ACTIVE' } = body;

    // Validation
    if (!documentTypeId || !subjectId || !expiryDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: documentTypeId, subjectId, expiryDate'
        },
        { status: 400 }
      );
    }

    // Verify that documentType exists
    const documentType = await prisma.documentType.findUnique({
      where: { id: documentTypeId }
    });

    if (!documentType) {
      return NextResponse.json(
        { success: false, error: 'Document type not found' },
        { status: 404 }
      );
    }

    // Verify that subject exists AND belongs to the user
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        userId: session.userId
      }
    });

    if (!subject) {
      return NextResponse.json(
        { success: false, error: 'Subject not found or access denied' },
        { status: 404 }
      );
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        userId: session.userId,
        documentTypeId,
        subjectId,
        expiryDate: new Date(expiryDate),
        status
      },
      include: {
        subject: true,
        documentType: true
      }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        entityType: 'DOCUMENT',
        entityId: document.id,
        action: 'CREATE',
        description: `Document ${documentType.name} created for ${subject.name}`,
        userId: session.userId
      }
    });

    return NextResponse.json({
      success: true,
      data: document
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
