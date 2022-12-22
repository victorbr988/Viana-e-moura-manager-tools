/*
  Warnings:

  - Added the required column `userId` to the `Entrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Exit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entrance` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Exit` ADD COLUMN `userId` VARCHAR(191) NOT NULL;
