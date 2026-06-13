-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanalSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "totalViews" BIGINT NOT NULL,
    "videoCount" INTEGER NOT NULL,
    "engagementPromedio" REAL,
    "fetchedDate" TEXT NOT NULL
);
INSERT INTO "new_CanalSnapshot" ("channelId", "engagementPromedio", "fetchedDate", "id", "name", "subscriberCount", "totalViews", "videoCount") SELECT "channelId", "engagementPromedio", "fetchedDate", "id", "name", "subscriberCount", "totalViews", "videoCount" FROM "CanalSnapshot";
DROP TABLE "CanalSnapshot";
ALTER TABLE "new_CanalSnapshot" RENAME TO "CanalSnapshot";
CREATE INDEX "CanalSnapshot_channelId_fetchedDate_idx" ON "CanalSnapshot"("channelId", "fetchedDate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
