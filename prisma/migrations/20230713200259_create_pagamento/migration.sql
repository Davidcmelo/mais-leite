-- CreateTable
CREATE TABLE `pagamento` (
    `id` VARCHAR(191) NOT NULL,
    `fazendaId` INTEGER NOT NULL,
    `litros` INTEGER NOT NULL,
    `dataColeta` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pagamento` ADD CONSTRAINT `pagamento_fazendaId_fkey` FOREIGN KEY (`fazendaId`) REFERENCES `fazendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
