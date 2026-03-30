-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('available', 'reserved', 'borrowed', 'damaged', 'withdrawn');

-- CreateTable
CREATE TABLE "shelf" (
    "bookID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "edition" TEXT,
    "genre" TEXT NOT NULL,
    "totalCopies" INTEGER NOT NULL DEFAULT 0,
    "availableCopies" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'available',
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("bookID")
);

-- CreateIndex
CREATE UNIQUE INDEX "shelf_bookID_key" ON "shelf"("bookID");

-- CreateIndex
CREATE UNIQUE INDEX "shelf_userID_key" ON "shelf"("userID");

-- CreateIndex
CREATE INDEX "shelf_userID_title_idx" ON "shelf"("userID", "title");

-- CreateIndex
CREATE INDEX "shelf_dateAdded_idx" ON "shelf"("dateAdded");
