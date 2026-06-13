-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snapshotId" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "engagement" REAL,
    "durationSeconds" INTEGER NOT NULL,
    "isShort" BOOLEAN NOT NULL,
    "publishedDate" TEXT NOT NULL,
    CONSTRAINT "VideoSnapshot_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "CanalSnapshot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VideoSnapshot" ("comments", "durationSeconds", "engagement", "id", "isShort", "likes", "publishedDate", "snapshotId", "title", "videoId", "views") SELECT "comments", "durationSeconds", "engagement", "id", "isShort", "likes", "publishedDate", "snapshotId", "title", "videoId", "views" FROM "VideoSnapshot";
DROP TABLE "VideoSnapshot";
ALTER TABLE "new_VideoSnapshot" RENAME TO "VideoSnapshot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
