-- CreateTable
CREATE TABLE `litros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` DOUBLE NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fazendaId` INTEGER NOT NULL,

    UNIQUE INDEX `litros_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `litros` ADD CONSTRAINT `litros_fazendaId_fkey` FOREIGN KEY (`fazendaId`) REFERENCES `fazendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
