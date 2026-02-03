import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        const configs = await prisma.systemConfig.findMany();
        const configMap: Record<string, string> = {};
        configs.forEach(c => configMap[c.key] = c.value);

        return NextResponse.json({ success: true, data: configMap });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        // Expect body: { "META_PIXEL_ID": "...", "GA_MEASUREMENT_ID": "..." }

        const updates = Object.entries(body as Record<string, any>)
            .filter(([, value]) => typeof value === 'string')
            .map(async ([key, value]) => {
                return prisma.systemConfig.upsert({
                    where: { key },
                    update: { value: value as string },
                    create: { key, value: value as string }
                });
            });

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
