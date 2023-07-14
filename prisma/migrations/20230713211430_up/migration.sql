/*
  Warnings:

  - The primary key for the `pagamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataColeta` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `fazendaId` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `fazendaNome` on the `pagamento` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `pagamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `litros` on the `pagamento` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `contaFinal` to the `pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fazenda` to the `pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pagamento` DROP FOREIGN KEY `pagamento_fazendaId_fkey`;

-- AlterTable
ALTER TABLE `pagamento` DROP PRIMARY KEY,
    DROP COLUMN `dataColeta`,
    DROP COLUMN `fazendaId`,
    DROP COLUMN `fazendaNome`,
    ADD COLUMN `contaFinal` DOUBLE NOT NULL,
    ADD COLUMN `fazenda` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `litros` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`id`);
