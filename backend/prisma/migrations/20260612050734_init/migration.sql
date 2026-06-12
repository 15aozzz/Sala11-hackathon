-- CreateTable
CREATE TABLE "CanalSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subscriberCount" INTEGER NOT NULL,
    "totalViews" BIGINT NOT NULL,
    "videoCount" INTEGER NOT NULL,
    "engagementPromedio" REAL NOT NULL,
    "fetchedDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VideoSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snapshotId" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "engagement" REAL NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "isShort" BOOLEAN NOT NULL,
    "publishedDate" TEXT NOT NULL,
    CONSTRAINT "VideoSnapshot_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "CanalSnapshot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CanalSnapshot_channelId_fetchedDate_idx" ON "CanalSnapshot"("channelId", "fetchedDate");
