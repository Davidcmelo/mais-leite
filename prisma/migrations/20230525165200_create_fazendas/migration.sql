-- CreateTable
CREATE TABLE `Fazendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fazenda` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Fazendas_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
