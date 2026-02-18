import { SignJWT, jwtVerify } from "jose";

// Lazy load secret to avoid build-time errors when env is missing
function getKey() {
    const secret = process.env["NEXTAUTH_SECRET"] || "build-time-secret-placeholder";
    if (!process.env["NEXTAUTH_SECRET"] && process.env.NODE_ENV === "production" && process.env["NEXT_PHASE"] !== "phase-production-build") {
        console.warn("⚠️ NEXTAUTH_SECRET is missing in production!");
    }
    return new TextEncoder().encode(secret);
}

export const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes (SEC-011)

/**
 * Encrypts a payload into a JWT token
 */
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(getKey());
}

/**
 * Decrypts and verifies a JWT token
 */
export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, getKey(), {
        algorithms: ["HS256"],
    });
    return payload;
}
