import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/shared/lib/auth";
import { prisma } from "@/server/db/prisma";

export const dynamic = 'force-dynamic';

/**
 * POST /api/user/profile
 * Updates user name and email
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.userId },
            data: { name, email }
        });

        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
