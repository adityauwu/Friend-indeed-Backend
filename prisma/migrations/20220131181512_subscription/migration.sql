/*
  Warnings:

  - A unique constraint covering the columns `[patientId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[therapistId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId,therapistId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_patientId_key" ON "Booking"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_therapistId_key" ON "Booking"("therapistId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_patientId_therapistId_key" ON "Booking"("patientId", "therapistId");
