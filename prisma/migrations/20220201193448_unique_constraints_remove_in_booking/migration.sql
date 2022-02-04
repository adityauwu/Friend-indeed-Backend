/*
  Warnings:

  - You are about to drop the `TherapistPatients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TherapistPatients" DROP CONSTRAINT "TherapistPatients_patientId_fkey";

-- DropForeignKey
ALTER TABLE "TherapistPatients" DROP CONSTRAINT "TherapistPatients_therapistId_fkey";

-- DropIndex
DROP INDEX "Booking_patientId_therapistId_key";

-- DropTable
DROP TABLE "TherapistPatients";
