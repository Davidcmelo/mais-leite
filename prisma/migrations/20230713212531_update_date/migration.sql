/*
  Warnings:

  - You are about to drop the column `dataColeta` on the `litros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `litros` DROP COLUMN `dataColeta`,
    ADD COLUMN `data_coleta` DATETIME(3) NOT NULL DEFAULT (DATE_FORMAT(NOW(), '%Y-%m-%d'));
