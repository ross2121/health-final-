/*
  Warnings:

  - You are about to drop the column `adminid` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `otpid` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_adminid_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "otpid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "adminid";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_otpid_fkey" FOREIGN KEY ("otpid") REFERENCES "Otp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
