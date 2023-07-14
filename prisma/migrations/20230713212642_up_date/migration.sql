/*
  Warnings:

  - You are about to drop the column `data_coleta` on the `litros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `litros` DROP COLUMN `data_coleta`,
    ADD COLUMN `dataColeta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
