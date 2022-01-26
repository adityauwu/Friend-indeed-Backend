/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "rating" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "onboarded" DROP NOT NULL,
ALTER COLUMN "onboarded" SET DEFAULT false,
ALTER COLUMN "consultationFee" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Therapist_email_key" ON "Therapist"("email");
