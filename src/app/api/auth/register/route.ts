import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, encrypt, SESSION_DURATION } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, company } = await request.json();

        // 1. Validations
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Correo, nombre y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Este correo electrónico ya está registrado" },
                { status: 400 }
            );
        }

        // 3. Hash password
        const hashedPassword = await hashPassword(password);

        // 4. Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                company,
            },
        });

        // 5. Create Session with Role
        const expires = new Date(Date.now() + SESSION_DURATION);
        const sessionToken = await encrypt({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role, // Added role
            expires
        });

        // 6. Set Cookie
        (await cookies()).set("session", sessionToken, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        // 7. Log Action
        await prisma.auditLog.create({
            data: {
                entityType: "USER",
                entityId: user.id,
                action: "REGISTER",
                description: `Usuario ${user.email} se ha registrado exitosamente`,
                userId: user.id,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role // Added role
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Hubo un error al procesar el registro" },
            { status: 500 }
        );
    }
}
