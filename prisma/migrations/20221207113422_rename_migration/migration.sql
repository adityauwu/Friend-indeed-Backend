/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the `bubu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patiendId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `therapistId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_senderId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "receiverId",
ADD COLUMN     "patiendId" TEXT NOT NULL,
ADD COLUMN     "therapistId" TEXT NOT NULL;

-- DropTable
DROP TABLE "bubu";
