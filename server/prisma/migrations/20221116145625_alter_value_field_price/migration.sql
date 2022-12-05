/*
  Warnings:

  - You are about to alter the column `unitPrice` on the `Entrance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Entrance` MODIFY `unitPrice` DOUBLE NOT NULL;
