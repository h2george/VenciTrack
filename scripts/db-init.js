const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initialize() {
    console.log('🏁 Starting Database Initialization (Native)...');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const sqlPath = path.join(__dirname, '../prisma/init.sql');
        let sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('📡 Executing Schema SQL...');
        await pool.query(sql);
        console.log('✅ Schema synchronization complete.');

    } catch (error) {
        console.error('❌ Database Initialization Failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

initialize();