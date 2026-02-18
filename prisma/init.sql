-- VenciTrack Initial Schema (PostgreSQL)
-- Generated to replace Prisma and reduce container footprint

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT DEFAULT 'USER' NOT NULL,
    "plan" TEXT DEFAULT 'FREE' NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE' NOT NULL,
    "emailVerified" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "forcePasswordChange" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "token" TEXT UNIQUE NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "DocumentType" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "gracePeriodDays" INTEGER DEFAULT 30 NOT NULL,
    "requiresExpiry" BOOLEAN DEFAULT TRUE NOT NULL,
    "targetType" TEXT DEFAULT 'BOTH' NOT NULL,
    "isGlobal" BOOLEAN DEFAULT TRUE NOT NULL,
    "userId" TEXT REFERENCES "User"("id"),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Subject" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Vehicle" (
    "id" TEXT PRIMARY KEY,
    "plate" TEXT UNIQUE NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "version" TEXT,
    "usage" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Document" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "documentTypeId" TEXT NOT NULL REFERENCES "DocumentType"("id"),
    "subjectId" TEXT NOT NULL REFERENCES "Subject"("id"),
    "expiryDate" TIMESTAMP NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE' NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deactivatedAt" TIMESTAMP,
    "alias" TEXT
);

CREATE TABLE IF NOT EXISTS "Reminder" (
    "id" TEXT PRIMARY KEY,
    "documentId" TEXT NOT NULL REFERENCES "Document"("id") ON DELETE CASCADE,
    "sentAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "channel" TEXT NOT NULL,
    "status" TEXT DEFAULT 'SENT' NOT NULL,
    "message" TEXT,
    "metadata" TEXT
);

CREATE TABLE IF NOT EXISTS "SecureToken" (
    "id" TEXT PRIMARY KEY,
    "token" TEXT UNIQUE NOT NULL,
    "documentId" TEXT NOT NULL REFERENCES "Document"("id") ON DELETE CASCADE,
    "expiresAt" TIMESTAMP NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "usedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT PRIMARY KEY,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" TEXT,
    "userId" TEXT REFERENCES "User"("id"),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserPreference" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "channels" TEXT DEFAULT 'EMAIL' NOT NULL,
    "frequency" TEXT DEFAULT 'IMMEDIATE' NOT NULL,
    "anticipationDays" INTEGER DEFAULT 30 NOT NULL
);

CREATE TABLE IF NOT EXISTS "SystemConfig" (
    "id" TEXT PRIMARY KEY,
    "key" TEXT UNIQUE NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
