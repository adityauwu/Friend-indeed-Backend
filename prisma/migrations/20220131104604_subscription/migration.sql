-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
