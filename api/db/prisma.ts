// No top-level db import to avoid loading pg during build

const isBuild = process.env['NEXT_PHASE'] === 'phase-production-build' || (process.env['NODE_ENV'] === 'production' && !process.env['DATABASE_URL']);

if (isBuild) {
    console.warn("[Bridge] Build phase detected. Using dummy DB bridge.");
}

class TableBridge {
    constructor(private tableName: string) { }

    async findUnique({ where }: any) {
        if (isBuild) return { id: 'dummy', createdAt: new Date(), updatedAt: new Date() };
        const { db } = require("./client");
        try {
            const keys = Object.keys(where);
            const values = Object.values(where);
            const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
            const query = `SELECT * FROM "${tableName}" WHERE "${keys[0]}" = $1 LIMIT 1`;
            const res = await db.query(query, values);
            return res.rows[0] || null;
        } catch (e) {
            return null;
        }
    }

    async findFirst({ where }: any) {
        return this.findUnique({ where });
    }

    async findMany({ where, orderBy }: any = {}) {
        if (isBuild) return [{ id: 'dummy', createdAt: new Date(), updatedAt: new Date() }];
        const { db } = require("./client");
        try {
            const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
            let query = `SELECT * FROM "${tableName}"`;
            const params: any[] = [];

            if (where) {
                const keys = Object.keys(where);
                query += ` WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ')}`;
                params.push(...Object.values(where));
            }

            if (orderBy) {
                const keys = Object.keys(orderBy);
                const field = String(keys[0]);
                const dir = (orderBy as any)[field];
                if (field && dir) {
                    query += ` ORDER BY "${field}" ${dir.toUpperCase()}`;
                }
            }

            const res = await db.query(query, params);
            return res.rows;
        } catch (e) {
            return [];
        }
    }

    async create({ data }: any) {
        const { db } = require("./client");
        const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
        // Filter out nested relations (objects like { create: ... })
        const keys = Object.keys(data).filter(k => typeof data[k] !== 'object' || data[k] instanceof Date || data[k] === null);
        const values = keys.map(k => data[k]);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        const query = `INSERT INTO "${tableName}" (${keys.map(k => `"${k}"`).join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async update({ where, data }: any) {
        const { db } = require("./client");
        const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
        const whereKeys = Object.keys(where);
        const whereValues = Object.values(where);
        // Filter out nested relations
        const dataKeys = Object.keys(data).filter(k => typeof data[k] !== 'object' || data[k] instanceof Date || data[k] === null);
        const dataValues = dataKeys.map(k => data[k]);

        // If no data to update, just return the existing record
        if (dataKeys.length === 0) {
            const query = `SELECT * FROM "${tableName}" WHERE ${whereKeys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ')} LIMIT 1`;
            const res = await db.query(query, whereValues);
            return res.rows[0];
        }

        const setClause = dataKeys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
        const whereClause = whereKeys.map((k, i) => `"${k}" = $${i + 1 + dataKeys.length}`).join(' AND ');

        const query = `UPDATE "${tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`;
        const res = await db.query(query, [...dataValues, ...whereValues]);
        return res.rows[0];
    }

    async delete({ where }: any) {
        const { db } = require("./client");
        const keys = Object.keys(where);
        const values = Object.values(where);
        const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
        const query = `DELETE FROM "${tableName}" WHERE "${keys[0]}" = $1 RETURNING *`;
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async upsert({ where, update, create }: any) {
        const existing = await this.findUnique({ where });
        if (existing) {
            return this.update({ where, data: update });
        } else {
            return this.create({ data: create });
        }
    }

    async count({ where }: any = {}) {
        const { db } = require("./client");
        const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
        let query = `SELECT COUNT(*) FROM "${tableName}"`;
        const params: any[] = [];

        if (where) {
            const keys = Object.keys(where);
            query += ` WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ')}`;
            params.push(...Object.values(where));
        }

        const res = await db.query(query, params);
        return parseInt(res.rows[0].count);
    }
}

/**
 * Proxy-based bridge to emulate Prisma's structure for existing models.
 */
export const prisma = new Proxy({} as any, {
    get(_target, prop) {
        if (typeof prop !== 'string') return undefined;
        const propStr = prop;

        // Build-phase safe-guard
        if (isBuild) {
            const dummy: any = () => Promise.resolve([{ id: 'dummy', createdAt: new Date() }]);
            dummy.findUnique = () => Promise.resolve({ id: 'dummy', createdAt: new Date() });
            dummy.findFirst = () => Promise.resolve({ id: 'dummy', createdAt: new Date() });
            dummy.findMany = () => Promise.resolve([{ id: 'dummy', createdAt: new Date() }]);
            dummy.count = () => Promise.resolve(1);
            dummy.create = () => Promise.resolve({ id: 'dummy' });
            dummy.update = () => Promise.resolve({ id: 'dummy' });
            dummy.upsert = () => Promise.resolve({ id: 'dummy' });
            dummy.delete = () => Promise.resolve({ id: 'dummy' });
            return dummy;
        }

        // Standard Prisma utility methods
        if (propStr === '$queryRaw') {
            return async (strings: TemplateStringsArray, ...values: any[]) => {
                const { db } = require("./client");
                const query = strings.reduce((acc, str, i) => acc + str + (values[i] !== undefined ? `$${i + 1}` : ''), '');
                const res = await db.query(query, values);
                return res.rows;
            };
        }

        if (propStr === '$transaction') {
            return async (callback: any) => {
                const { db } = require("./client");
                const client = await db.connect();
                try {
                    await client.query('BEGIN');
                    const result = await callback(prisma); // Simplified transaction
                    await client.query('COMMIT');
                    return result;
                } catch (e) {
                    await client.query('ROLLBACK');
                    throw e;
                } finally {
                    client.release();
                }
            };
        }

        if (prop === '$disconnect' || prop === '$connect') {
            return async () => { };
        }

        // Dynamic model bridges
        return new TableBridge(prop);
    }
});
