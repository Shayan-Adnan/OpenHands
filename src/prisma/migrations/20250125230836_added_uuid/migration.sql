/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `pendingrequests` DROP FOREIGN KEY `PendingRequests_userId_fkey`;

-- DropForeignKey
ALTER TABLE `processedrequests` DROP FOREIGN KEY `ProcessedRequests_userId_fkey`;

-- DropIndex
DROP INDEX `PendingRequests_userId_fkey` ON `pendingrequests`;

-- DropIndex
DROP INDEX `ProcessedRequests_userId_fkey` ON `processedrequests`;

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pendingrequests` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `processedrequests` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `PendingRequests` ADD CONSTRAINT `PendingRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcessedRequests` ADD CONSTRAINT `ProcessedRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
