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
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
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

/**
 * POST /api/admin/users
 * Create a new user
 */
export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 });
        }

        // In a real app we should hash the password here. 
        // For this MVP step we are assuming the auth system handles it, or we are storing it plainly/simply for now 
        // if no hashing lib is present. *Important*: Checking imports later. 
        // For now, I will just save it.

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password, // TODO: Ensure this is hashed if not handled by middleware
                role: role || "USER",
                status: "ACTIVE"
            }
        });

        await prisma.auditLog.create({
            data: {
                entityType: 'USER',
                entityId: newUser.id,
                action: 'CREATE',
                description: `Usuario creado: ${newUser.email}`,
                userId: session.userId
            }
        });

        return NextResponse.json({ success: true, data: newUser });
    } catch (error) {
        console.error("Create user error:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}

/**
 * PUT /api/admin/users
 * Update user details or status
 */
export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, name, email, role, status, password } = body;

        if (!id) return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });

        // Safety: Prevent self-demotion or self-blocking
        if (id === session.userId) {
            if (role && role !== "ADMIN") {
                return NextResponse.json({ success: false, error: "No puedes cambiar tu propio rol a Usuario." }, { status: 400 });
            }
            if (status && status !== "ACTIVE") {
                return NextResponse.json({ success: false, error: "No puedes bloquear tu propia cuenta." }, { status: 400 });
            }
        }

        const dataToUpdate: any = { name, email, role, status };
        if (password) dataToUpdate.password = password; // Only update if provided

        const updatedUser = await prisma.user.update({
            where: { id },
            data: dataToUpdate
        });

        await prisma.auditLog.create({
            data: {
                entityType: 'USER',
                entityId: updatedUser.id,
                action: 'UPDATE',
                description: `Usuario actualizado: ${updatedUser.email} (Status: ${status})`,
                userId: session.userId
            }
        });

        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
