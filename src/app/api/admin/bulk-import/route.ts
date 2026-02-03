import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/bulk-import
 * HU-1.1: Importación masiva de documentos, sujetos y tipos.
 * Implementa una ingesta de alto rendimiento con registro de auditoría.
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: "Prohibido" }, { status: 403 });
        }

        const body = await request.json();
        const { items } = body;

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ success: false, error: "Carga inválida: se requiere un arreglo de elementos" }, { status: 400 });
        }

        const results = {
            created: 0,
            skipped: 0,
            errors: [] as string[]
        };

        // Procesamiento transaccional (óptimo para mantener la consistencia)
        await prisma.$transaction(async (tx) => {
            for (const item of items) {
                try {
                    // 1. Resolver o crear Sujeto (Persona o Vehículo)
                    let subject = await tx.subject.findFirst({
                        where: { name: item.subjectName, userId: session.userId }
                    });

                    if (!subject) {
                        subject = await tx.subject.create({
                            data: {
                                name: item.subjectName,
                                type: item.subjectType || "PERSON",
                                details: item.subjectDetails,
                                userId: session.userId
                            }
                        });
                    }

                    // 2. Resolver o crear Tipo de Documento
                    let docType = await tx.documentType.findFirst({
                        where: { name: item.typeName }
                    });

                    if (!docType) {
                        docType = await tx.documentType.create({
                            data: {
                                name: item.typeName,
                                category: item.category || "GENERAL",
                                requiresExpiry: true,
                                isGlobal: true,
                                userId: session.userId
                            }
                        });
                    }

                    // 3. Crear el Documento final
                    await tx.document.create({
                        data: {
                            userId: session.userId,
                            subjectId: subject.id,
                            documentTypeId: docType.id,
                            expiryDate: new Date(item.expiryDate),
                            status: "ACTIVE"
                        }
                    });

                    results.created++;
                } catch (err: any) {
                    console.error("Error en elemento individual:", err);
                    results.errors.push(`Fila ${results.created + results.skipped + 1}: ${err.message}`);
                    results.skipped++;
                }
            }
        }, {
            timeout: 30000 // 30s de tiempo de espera para importaciones grandes
        });

        // Registrar la operación masiva en la auditoría (HU-5.1)
        await prisma.auditLog.create({
            data: {
                entityType: 'BULK_IMPORT',
                entityId: 'SYSTEM',
                action: 'CREATE',
                description: `HU-1.1: Carga masiva completada. Procesados: ${items.length}, Creados: ${results.created}.`,
                userId: session.userId,
                metadata: JSON.stringify(results)
            }
        });

        return NextResponse.json({ success: true, ...results });
    } catch (error: any) {
        console.error("Error maestro en importación masiva:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
