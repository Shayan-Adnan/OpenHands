-- DropIndex
DROP INDEX `PendingRequests_email_key` ON `pendingrequests`;

-- CreateTable
CREATE TABLE `ProcessedRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('Approved', 'Rejected') NOT NULL,
    `processedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pendingRequestId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `ProcessedRequests_id_key`(`id`),
    UNIQUE INDEX `ProcessedRequests_pendingRequestId_key`(`pendingRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProcessedRequests` ADD CONSTRAINT `ProcessedRequests_pendingRequestId_fkey` FOREIGN KEY (`pendingRequestId`) REFERENCES `PendingRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcessedRequests` ADD CONSTRAINT `ProcessedRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
