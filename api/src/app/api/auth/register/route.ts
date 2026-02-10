import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        return NextResponse.json({ success: true, user: { id: 2, name: body.name, role: "USER" } });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 });
    }
}
