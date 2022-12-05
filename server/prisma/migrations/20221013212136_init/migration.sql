-- CreateTable
CREATE TABLE `Tools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tools_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supervisors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Supervisors_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enterprises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Enterprises_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `toolName` VARCHAR(191) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL,
    `supervisorName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `requester` VARCHAR(191) NOT NULL,
    `toolName` VARCHAR(191) NOT NULL,
    `requestAt` DATETIME(3) NOT NULL,
    `responseAt` DATETIME(3) NOT NULL,
    `enterpriseName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `subAccount` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Entrance` ADD CONSTRAINT `Entrance_toolName_fkey` FOREIGN KEY (`toolName`) REFERENCES `Tools`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrance` ADD CONSTRAINT `Entrance_supervisorName_fkey` FOREIGN KEY (`supervisorName`) REFERENCES `Supervisors`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exit` ADD CONSTRAINT `Exit_toolName_fkey` FOREIGN KEY (`toolName`) REFERENCES `Tools`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exit` ADD CONSTRAINT `Exit_enterpriseName_fkey` FOREIGN KEY (`enterpriseName`) REFERENCES `Enterprises`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
