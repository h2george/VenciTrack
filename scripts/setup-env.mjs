import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const generateHex = (bytes) => randomBytes(bytes).toString('hex');

async function setupEnv() {
    if (existsSync('.env.production')) {
        console.log('⚠️ .env.production already exists. Skipping generation.');
        return;
    }

    const APP_NAME = 'vencitrack';
    const DB_USER = `${APP_NAME}_admin`;
    const DB_PASSWORD = generateHex(16); // 32 characters hex
    const DB_NAME = `${APP_NAME}_db`;
    const DB_HOST = 'db';
    const DB_PORT = '5432';

    const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`;

    const envContent = `# VenciTrack - Production Environment Variables
# Generated on: ${new Date().toISOString()}

# Database Setup
POSTGRES_USER="${DB_USER}"
POSTGRES_PASSWORD="${DB_PASSWORD}"
POSTGRES_DB="${DB_NAME}"
POSTGRES_HOST="${DB_HOST}"
POSTGRES_PORT="${DB_PORT}"

DATABASE_URL="${DATABASE_URL}"

# SMTP Configuration (To be filled manually)
SMTP_HOST=""
SMTP_PORT=""
SMTP_SECURE="true"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""

# Security
NEXTAUTH_SECRET="${generateHex(32)}"
`;

    await writeFile('.env.production', envContent);
    console.log('✅ .env.production generated with secure credentials.');
}

setupEnv().catch(console.error);
