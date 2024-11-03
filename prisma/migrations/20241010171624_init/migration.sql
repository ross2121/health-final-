-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "patient_name" TEXT NOT NULL,
    "Disease_name" TEXT NOT NULL,
    "Postal_Pin" TEXT NOT NULL,
    "adminid" INTEGER NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
