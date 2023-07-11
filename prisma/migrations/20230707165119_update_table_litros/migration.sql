-- DropForeignKey
ALTER TABLE `litros` DROP FOREIGN KEY `litros_fazendaId_fkey`;

-- AddForeignKey
ALTER TABLE `litros` ADD CONSTRAINT `litros_fazendaId_fkey` FOREIGN KEY (`fazendaId`) REFERENCES `fazendas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
