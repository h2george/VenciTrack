import { prisma } from "@/server/db/prisma";

/**
 * Gets a configuration value from the database with an optional environment variable fallback.
 * This allows the UI to override environment variables.
 */
export async function getConfigValue(key: string, defaultValue?: string): Promise<string> {
    try {
        const config = await prisma.systemConfig.findUnique({
            where: { key }
        });

        if (config?.value) {
            return config.value;
        }
    } catch (err) {
        console.error(`Error fetching config key ${key}:`, err);
    }

    return defaultValue || "";
}

/**
 * Gets all SMTP configuration for Nodemailer
 */
export async function getSMTPConfig() {
    return {
        host: await getConfigValue("SMTP_HOST"),
        port: parseInt(await getConfigValue("SMTP_PORT") || "465"),
        secure: (await getConfigValue("SMTP_SECURE", "true")) === "true",
        auth: {
            user: await getConfigValue("SMTP_USER"),
            pass: await getConfigValue("SMTP_PASS"),
        },
        from: await getConfigValue("SMTP_FROM")
    };
}
