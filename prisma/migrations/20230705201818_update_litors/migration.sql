/*
  Warnings:

  - You are about to drop the column `quantidade` on the `litros` table. All the data in the column will be lost.
  - Added the required column `litros` to the `litros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `litros` DROP COLUMN `quantidade`,
    ADD COLUMN `litros` INTEGER NOT NULL;
