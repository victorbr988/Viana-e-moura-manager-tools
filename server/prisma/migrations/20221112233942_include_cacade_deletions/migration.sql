-- DropForeignKey
ALTER TABLE `Entrance` DROP FOREIGN KEY `Entrance_supervisorName_fkey`;

-- DropForeignKey
ALTER TABLE `Entrance` DROP FOREIGN KEY `Entrance_toolName_fkey`;

-- DropForeignKey
ALTER TABLE `Exit` DROP FOREIGN KEY `Exit_enterpriseName_fkey`;

-- DropForeignKey
ALTER TABLE `Exit` DROP FOREIGN KEY `Exit_toolName_fkey`;

-- AddForeignKey
ALTER TABLE `Entrance` ADD CONSTRAINT `Entrance_toolName_fkey` FOREIGN KEY (`toolName`) REFERENCES `Tools`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrance` ADD CONSTRAINT `Entrance_supervisorName_fkey` FOREIGN KEY (`supervisorName`) REFERENCES `Supervisors`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exit` ADD CONSTRAINT `Exit_toolName_fkey` FOREIGN KEY (`toolName`) REFERENCES `Tools`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exit` ADD CONSTRAINT `Exit_enterpriseName_fkey` FOREIGN KEY (`enterpriseName`) REFERENCES `Enterprises`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
