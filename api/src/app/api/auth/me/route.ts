import { NextResponse } from "next/server";

export async function GET() {
    // Mock session check
    return NextResponse.json({ success: true, data: { id: 1, name: "Admin", role: "ADMIN" } });
}
