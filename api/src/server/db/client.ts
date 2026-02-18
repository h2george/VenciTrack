import { Pool, PoolConfig } from 'pg';

/**
 * Native PostgreSQL Pool Configuration
 * Replaces Prisma for maximum performance and minimal container footprint.
 */
const poolConfig: PoolConfig = {
    connectionString: process.env['DATABASE_URL'],
    // Optimization for microservices
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const poolSingleton = () => {
    if (!process.env['DATABASE_URL']) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error("[DB] CRITICAL: DATABASE_URL is not defined in production environment.");
        }
        console.warn("[DB] No DATABASE_URL found. Returning dummy pool for build phase.");
        return {
            query: async () => ({ rows: [] }),
            connect: async () => ({
                query: async () => ({ rows: [] }),
                release: () => { }
            }),
            on: () => { },
            end: async () => { }
        } as any;
    }
    return new Pool(poolConfig);
};

declare global {
    var dbPool: any;
}

export const db = (globalThis as any).dbPool ?? poolSingleton();

if (process.env.NODE_ENV !== "production") {
    (globalThis as any).dbPool = db;
}

/**
 * Basic query wrapper for transition
 */
export const query = (text: string, params?: any[]) => db.query(text, params);
