import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { encrypt, decrypt, SESSION_DURATION } from "./auth-edge";

export { encrypt, decrypt, SESSION_DURATION };

/**
 * Hashes a password using bcrypt
 */
export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Verifies a password against a hash
 */
export async function verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

/**
 * Gets the current session from cookies
 */
export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    try {
        return await decrypt(session);
    } catch (error) {
        return null;
    }
}

/**
 * Updates or creates a session cookie
 */
export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + SESSION_DURATION);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
