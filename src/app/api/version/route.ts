import { NextResponse } from "next/server";
import { API_VERSION } from "@/shared/lib/versions";

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        version: API_VERSION,
        status: "active",
        service: "VenciTrack API"
    }, { status: 200 });
}
