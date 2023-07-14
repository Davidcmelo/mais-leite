/*
  Warnings:

  - Added the required column `fazendaNome` to the `pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagamento` ADD COLUMN `fazendaNome` VARCHAR(191) NOT NULL;
