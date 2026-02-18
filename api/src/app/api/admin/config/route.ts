import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { getSession } from "@/shared/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (session?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const configs = await prisma.systemConfig.findMany();
        const configMap = configs.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            config: {
                SMTP_HOST: configMap.SMTP_HOST || "",
                SMTP_PORT: configMap.SMTP_PORT || "",
                SMTP_USER: configMap.SMTP_USER || "",
                SMTP_PASS: configMap.SMTP_PASS || "",
                SMTP_FROM: configMap.SMTP_FROM || "",
                META_PIXEL_ID: configMap.META_PIXEL_ID || "",
                GOOGLE_ANALYTICS_ID: configMap.GOOGLE_ANALYTICS_ID || ""
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error fetching config" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (session?.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const entries = Object.entries(body);

        for (const [key, value] of entries) {
            await prisma.systemConfig.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            });
        }

        return NextResponse.json({ success: true, message: "Configuración guardada" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error saving config" }, { status: 500 });
    }
}
