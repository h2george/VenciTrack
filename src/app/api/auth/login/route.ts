import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { verifyPassword, encrypt, SESSION_DURATION } from "@/shared/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // 1. Validations
        if (!email || !password) {
            return NextResponse.json(
                { error: "Correo y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // 2. Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // 3. Verify password
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // 4. Create Session with Role and Password Change requirement
        const expires = new Date(Date.now() + SESSION_DURATION);
        const sessionToken = await encrypt({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            forcePasswordChange: user.forcePasswordChange, // Added to session
            expires
        });

        // 5. Set Cookie
        (await cookies()).set("session", sessionToken, {
            expires,
            httpOnly: true,
            secure: process.env[''] === "production",
            sameSite: "lax",
        });

        // 6. Log Action
        await prisma.auditLog.create({
            data: {
                entityType: "USER",
                entityId: user.id,
                action: "LOGIN",
                description: `Usuario ${user.email} ha iniciado sesión`,
                userId: user.id,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                forcePasswordChange: user.forcePasswordChange // Added field
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Hubo un error al procesar el inicio de sesión" },
            { status: 500 }
        );
    }
}
