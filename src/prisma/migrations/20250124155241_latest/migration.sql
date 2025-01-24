/*
  Warnings:

  - You are about to drop the `processedrequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `processedrequests` DROP FOREIGN KEY `ProcessedRequests_pendingRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `processedrequests` DROP FOREIGN KEY `ProcessedRequests_userId_fkey`;

-- DropTable
DROP TABLE `processedrequests`;
