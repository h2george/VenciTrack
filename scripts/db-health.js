const { Pool } = require('pg');

// Simple health check script for Docker HEALTHCHECK or manual verification
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
});

async function check() {
    try {
        const start = Date.now();
        const res = await pool.query('SELECT 1 as health');
        const duration = Date.now() - start;

        if (res.rows[0].health === 1) {
            console.log(`✅ Database connected in ${duration}ms`);

            // Optional: Check schema existence
            const schemaRes = await pool.query(`
                SELECT count(*) FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name IN ('User', 'DocumentType')
            `);

            if (parseInt(schemaRes.rows[0].count) >= 2) {
                console.log('✅ Critical tables found');
                process.exit(0);
            } else {
                console.error('❌ Critical tables MISSING');
                process.exit(1);
            }
        } else {
            console.error('❌ Unexpected query result');
            process.exit(1);
        }
    } catch (e) {
        console.error('❌ Health check failed:', e.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

check();
