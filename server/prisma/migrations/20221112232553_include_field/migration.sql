/*
  Warnings:

  - Added the required column `unitPrice` to the `Entrance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entrance` ADD COLUMN `unitPrice` INTEGER NOT NULL;
