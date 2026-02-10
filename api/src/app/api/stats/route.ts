import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: {
            urgencyLevels: { critical: 2, warning: 5, stable: 12 }
        }
    });
}
