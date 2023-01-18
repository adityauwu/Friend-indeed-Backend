-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "googleMeetUrl" TEXT DEFAULT 'https://meet.google.com/';

-- CreateTable
CREATE TABLE "ChatSubscription" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT true,
    "SubscribedOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatSubscription_patientId_therapistId_key" ON "ChatSubscription"("patientId", "therapistId");

-- AddForeignKey
ALTER TABLE "ChatSubscription" ADD CONSTRAINT "ChatSubscription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSubscription" ADD CONSTRAINT "ChatSubscription_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
