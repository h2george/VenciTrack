-- AlterTable
ALTER TABLE "Document" ADD COLUMN "deactivatedAt" DATETIME;

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "version" TEXT,
    "usage" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "channels" TEXT NOT NULL DEFAULT 'EMAIL',
    "frequency" TEXT NOT NULL DEFAULT 'WEEKLY',
    "antelationDays" INTEGER NOT NULL DEFAULT 30
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "gracePeriodDays" INTEGER NOT NULL DEFAULT 30,
    "requiresExpiry" BOOLEAN NOT NULL DEFAULT true,
    "targetType" TEXT NOT NULL DEFAULT 'BOTH',
    "isGlobal" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DocumentType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DocumentType" ("category", "createdAt", "description", "gracePeriodDays", "id", "isGlobal", "name", "updatedAt", "userId") SELECT "category", "createdAt", "description", "gracePeriodDays", "id", "isGlobal", "name", "updatedAt", "userId" FROM "DocumentType";
DROP TABLE "DocumentType";
ALTER TABLE "new_DocumentType" RENAME TO "DocumentType";
CREATE UNIQUE INDEX "DocumentType_name_key" ON "DocumentType"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");
