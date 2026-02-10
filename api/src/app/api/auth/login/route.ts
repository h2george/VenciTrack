import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Placeholder for actual login logic using api/services/auth
        // const user = await authService.login(body.email, body.password);

        // Mock response for refactoring phase
        if (body.email === "admin@vencitrack.com" && body.password === "admin") {
            return NextResponse.json({
                success: true,
                user: { id: 1, name: "Admin", role: "ADMIN", forcePasswordChange: false }
            });
        }

        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
