/*
  Warnings:

  - You are about to drop the column `requestAt` on the `Exit` table. All the data in the column will be lost.
  - Added the required column `requestedAt` to the `Exit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exit` DROP COLUMN `requestAt`,
    ADD COLUMN `requestedAt` DATETIME(3) NOT NULL;
