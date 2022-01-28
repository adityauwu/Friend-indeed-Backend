/*
  Warnings:

  - You are about to drop the `_CategoryToTherapistCategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTherapistCategories" DROP CONSTRAINT "_CategoryToTherapistCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTherapistCategories" DROP CONSTRAINT "_CategoryToTherapistCategories_B_fkey";

-- DropTable
DROP TABLE "_CategoryToTherapistCategories";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
