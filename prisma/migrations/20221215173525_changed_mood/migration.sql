/*
  Warnings:

  - The primary key for the `Mood` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Mood` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Mood_pkey" PRIMARY KEY ("UserId");
