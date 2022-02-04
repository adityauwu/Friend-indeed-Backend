-- CreateTable
CREATE TABLE "TherapistPatients" (
    "id" TEXT NOT NULL,
    "therapistId" TEXT,
    "patientId" TEXT,

    CONSTRAINT "TherapistPatients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TherapistPatients" ADD CONSTRAINT "TherapistPatients_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapistPatients" ADD CONSTRAINT "TherapistPatients_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
