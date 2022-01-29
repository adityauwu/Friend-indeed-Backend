/*
  Warnings:

  - A unique constraint covering the columns `[patientId,therapistId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feedback_patientId_therapistId_key" ON "Feedback"("patientId", "therapistId");
