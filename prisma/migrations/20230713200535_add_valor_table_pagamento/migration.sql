/*
  Warnings:

  - Added the required column `valor` to the `pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagamento` ADD COLUMN `valor` DOUBLE NOT NULL;
