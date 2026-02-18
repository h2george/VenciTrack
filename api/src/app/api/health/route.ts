import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/health
 * Health check endpoint for Docker container monitoring
 * Validates database connectivity and service readiness
 */
export async function GET() {
    try {
        // Check database connectivity
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            service: "VenciTrack",
            database: "connected"
        }, { status: 200 });
    } catch (error) {
        console.error("Health check failed:", error);
        return NextResponse.json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            service: "VenciTrack",
            database: "disconnected",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 503 });
    }
}
