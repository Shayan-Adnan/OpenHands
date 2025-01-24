-- CreateTable
CREATE TABLE `ProcessedRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `imageName` VARCHAR(191) NOT NULL,
    `documentName` VARCHAR(191) NOT NULL,
    `amountNeeded` INTEGER NOT NULL,
    `status` ENUM('Approved', 'Rejected') NOT NULL,
    `processedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProcessedRequests` ADD CONSTRAINT `ProcessedRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
