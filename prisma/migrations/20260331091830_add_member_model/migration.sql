-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('regular', 'student', 'senior');

-- CreateTable
CREATE TABLE "club" (
    "memberID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "membershipStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "membershipExpires" TIMESTAMP(3) NOT NULL,
    "type" "MemberType" NOT NULL DEFAULT 'regular',
    "currentRentals" TEXT[],
    "pastRentals" TEXT[],

    CONSTRAINT "club_pkey" PRIMARY KEY ("memberID")
);

-- CreateIndex
CREATE UNIQUE INDEX "club_memberID_key" ON "club"("memberID");

-- CreateIndex
CREATE INDEX "club_memberID_firstName_lastName_idx" ON "club"("memberID", "firstName", "lastName");

-- CreateIndex
CREATE INDEX "club_currentRentals_idx" ON "club"("currentRentals");
