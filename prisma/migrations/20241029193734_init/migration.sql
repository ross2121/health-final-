/*
  Warnings:

  - You are about to drop the column `userid` on the `Disease` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_userid_fkey";

-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "userid";
