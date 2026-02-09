import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/shared/lib/auth-edge";

// Rutas protegidas que requieren sesión
const protectedRoutes = ["/dashboard", "/admin", "/documents", "/subjects", "/reminders", "/settings"];
// Rutas exclusivas de administrador (solo sub-rutas de /admin)
const adminRoutes = ["/admin/users", "/admin/documents", "/admin/integrations", "/admin/settings"];
// Rutas de autenticación que no deben ser visitadas si ya hay sesión
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
    const isAuthRoute = authRoutes.some(route => path === route);

    const cookie = request.cookies.get("session")?.value;
    let session = null;

    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (e) {
            session = null;
        }
    }

    // 1. Redirigir a login si intenta acceder a ruta protegida sin sesión
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // 2. Proteger rutas de admin
    if (isAdminRoute && session?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    // 3. Redirigir a dashboard si intenta acceder a login/register ya estando autenticado
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
}

// Configurar en qué rutas se debe ejecutar el middleware
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/login",
        "/register"
    ],
};
