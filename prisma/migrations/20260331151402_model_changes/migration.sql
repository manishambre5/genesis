-- AlterTable
ALTER TABLE "club" ALTER COLUMN "currentRentals" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "pastRentals" SET DEFAULT ARRAY[]::TEXT[];
