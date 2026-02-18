import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
    try {
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: {
                    in: ["META_PIXEL_ID", "GOOGLE_ANALYTICS_ID"]
                }
            }
        });

        const configMap = configs.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        // Fallback to env vars if not in DB
        const metaPixelId = configMap.META_PIXEL_ID || "";
        const gaId = configMap.GOOGLE_ANALYTICS_ID || "";

        return NextResponse.json({
            success: true,
            config: {
                META_PIXEL_ID: metaPixelId,
                GOOGLE_ANALYTICS_ID: gaId
            }
        });
    } catch (error) {
        console.error("Error fetching public config:", error);
        return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
    }
}
