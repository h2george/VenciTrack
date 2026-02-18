import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/shared/lib/auth";
import { prisma } from "@/server/db/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { password } = await request.json();
        if (!password || password.length < 8) {
            return NextResponse.json({ success: false, error: "Contraseña inválida" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: session.userId },
            data: {
                password: hashedPassword,
                forcePasswordChange: false
            }
        });

        return NextResponse.json({ success: true, message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
    }
}
