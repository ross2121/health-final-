/*
  Warnings:

  - You are about to drop the column `otpid` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_otpid_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "otpid";
