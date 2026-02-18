const { Pool } = require('pg');
const crypto = require('crypto');

// Pre-calculated hashes to avoid 'bcryptjs' runtime dependency in minimal Alpine container
const HASHES = {
    ADMIN: '$2b$10$rOddTBJHDn6SoE9O5143GeC9BaBWXd9sS5o0vDMXHa12PkdMNPZbm', // VenciTrack2025!
    USER: '$2b$10$8S0FyKIRdXERPJw0LIM9eu55ygYgbdKSUblVvId3ZvpVIjIL2AR62'   // user123
};

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function seed() {
    console.log('🌱 Seeding database (Native SQL)...');
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Admin User
        await client.query(`
            INSERT INTO "User" ("id", "email", "name", "password", "role", "forcePasswordChange", "updatedAt")
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            ON CONFLICT ("email") DO UPDATE SET
            "password" = $4, "forcePasswordChange" = $6, "updatedAt" = NOW()
        `, [crypto.randomUUID(), 'vencitrack_admin@example.com', 'Administrador General', HASHES.ADMIN, 'ADMIN', true]);
        console.log('✅ Admin user seeded');

        // 2. Regular User
        await client.query(`
            INSERT INTO "User" ("id", "email", "name", "password", "role", "updatedAt")
            VALUES ($1, $2, $3, $4, $5, NOW())
            ON CONFLICT ("email") DO UPDATE SET
            "password" = $4, "updatedAt" = NOW()
        `, [crypto.randomUUID(), 'vencitrack_user@example.com', 'Juan Pérez', HASHES.USER, 'USER']);
        console.log('✅ Regular user seeded');

        // 3. Document Types
        const docTypes = [
            { name: 'SOAT', category: 'VEHICLE' },
            { name: 'Licencia de Conducir', category: 'PERSON' },
            { name: 'Seguro Vehicular', category: 'VEHICLE' },
            { name: 'Revisión Técnica', category: 'VEHICLE' },
            { name: 'Pasaporte', category: 'PERSON' },
            { name: 'Seguro de Salud', category: 'PERSON' },
            { name: 'DNI', category: 'PERSON' }
        ];

        for (const type of docTypes) {
            await client.query(`
                INSERT INTO "DocumentType" ("id", "name", "category", "targetType", "isGlobal", "updatedAt")
                VALUES ($1, $2, $3, 'BOTH', true, NOW())
                ON CONFLICT ("name") DO NOTHING
            `, [crypto.randomUUID(), type.name, type.category]);
        }
        console.log('✅ Document Types seeded');

        await client.query('COMMIT');
        console.log('🚀 Seeding finished successfully!');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
