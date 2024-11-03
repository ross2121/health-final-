/*
  Warnings:

  - Added the required column `Pincode` to the `Disease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disease" ADD COLUMN     "File" TEXT,
ADD COLUMN     "Pincode" TEXT NOT NULL;
