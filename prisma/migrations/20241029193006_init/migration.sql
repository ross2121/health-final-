/*
  Warnings:

  - You are about to drop the column `Disease_name` on the `Disease` table. All the data in the column will be lost.
  - You are about to drop the column `Postal_Pin` on the `Disease` table. All the data in the column will be lost.
  - You are about to drop the column `patient_name` on the `Disease` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Disease` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Precaution` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Severe` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_email` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_email` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Disease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "Disease_name",
DROP COLUMN "Postal_Pin",
DROP COLUMN "patient_name",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Disease" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Precaution" TEXT NOT NULL,
ADD COLUMN     "Severe" TEXT NOT NULL,
ADD COLUMN     "admin_email" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "patient_email" TEXT NOT NULL,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
