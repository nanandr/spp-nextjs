-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `jk` ENUM('LakiLaki', 'Perempuan') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(255) NULL,
    `role` ENUM('Staff', 'Admin') NOT NULL DEFAULT 'Staff',
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TahunAjar` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tahun` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `TahunAjar_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spp` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tahunAjarId` BIGINT UNSIGNED NOT NULL,
    `spp` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `namaKelas` VARCHAR(10) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NULL,
    `foto` VARCHAR(255) NULL,
    `alamat` TEXT NOT NULL,
    `jk` ENUM('LakiLaki', 'Perempuan') NOT NULL,
    `angkatan` BIGINT NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KelasSiswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `kelasId` BIGINT UNSIGNED NOT NULL,
    `tahunAjarId` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiskonSiswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `diskonId` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `sppId` BIGINT UNSIGNED NOT NULL,
    `tanggal` DATE NOT NULL,
    `totalBayar` BIGINT NOT NULL,
    `bulan` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskon` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `potongan` BIGINT NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `spp` ADD CONSTRAINT `spp_tahunAjarId_fkey` FOREIGN KEY (`tahunAjarId`) REFERENCES `TahunAjar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSiswa` ADD CONSTRAINT `KelasSiswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSiswa` ADD CONSTRAINT `KelasSiswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KelasSiswa` ADD CONSTRAINT `KelasSiswa_tahunAjarId_fkey` FOREIGN KEY (`tahunAjarId`) REFERENCES `TahunAjar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiskonSiswa` ADD CONSTRAINT `DiskonSiswa_diskonId_fkey` FOREIGN KEY (`diskonId`) REFERENCES `diskon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiskonSiswa` ADD CONSTRAINT `DiskonSiswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_sppId_fkey` FOREIGN KEY (`sppId`) REFERENCES `spp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
