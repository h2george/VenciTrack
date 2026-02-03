/*
  Warnings:

  - You are about to drop the column `antelationDays` on the `UserPreference` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "channels" TEXT NOT NULL DEFAULT 'EMAIL',
    "frequency" TEXT NOT NULL DEFAULT 'IMMEDIATE',
    "anticipationDays" INTEGER NOT NULL DEFAULT 30,
    CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserPreference" ("channels", "frequency", "id", "userId") SELECT "channels", "frequency", "id", "userId" FROM "UserPreference";
DROP TABLE "UserPreference";
ALTER TABLE "new_UserPreference" RENAME TO "UserPreference";
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
