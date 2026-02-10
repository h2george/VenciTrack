import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [
            { id: 1, title: "Seguro Vehicular", expiry: "2026-05-01", status: "Active" },
            { id: 2, title: "Licencia de Conducir", expiry: "2026-08-15", status: "Warning" }
        ]
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ success: true, data: { id: Math.random(), ...body } });
}
