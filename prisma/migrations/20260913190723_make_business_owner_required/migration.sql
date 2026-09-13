/*
  Warnings:

  - Made the column `ownerId` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_ownerId_fkey";

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "ownerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
