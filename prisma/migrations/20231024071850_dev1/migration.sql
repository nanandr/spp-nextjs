-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `role` ENUM('Staff', 'Admin') NOT NULL DEFAULT 'Staff',
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TahunAjar` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tahun` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

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
    `jk` ENUM('LakiLaki', 'Perempuan') NOT NULL,
    `angkatan` BIGINT NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelasSiswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `kelasId` BIGINT UNSIGNED NOT NULL,
    `tahunAjarId` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskonSiswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `diskonId` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spp_siswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `sppId` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswaId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `tanggal` DATE NOT NULL,
    `totalBayar` BIGINT NOT NULL,
    `bulan` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `details` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `transaksiId` BIGINT UNSIGNED NOT NULL,
    `sppId` BIGINT UNSIGNED NOT NULL,
    `jumlahBayar` BIGINT NOT NULL,
    `sisa` BIGINT NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
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
ALTER TABLE `spp` ADD CONSTRAINT `spp_tahunAjarId_fkey` FOREIGN KEY (`tahunAjarId`) REFERENCES `TahunAjar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelasSiswa` ADD CONSTRAINT `kelasSiswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelasSiswa` ADD CONSTRAINT `kelasSiswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelasSiswa` ADD CONSTRAINT `kelasSiswa_tahunAjarId_fkey` FOREIGN KEY (`tahunAjarId`) REFERENCES `TahunAjar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskonSiswa` ADD CONSTRAINT `diskonSiswa_diskonId_fkey` FOREIGN KEY (`diskonId`) REFERENCES `diskon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskonSiswa` ADD CONSTRAINT `diskonSiswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spp_siswa` ADD CONSTRAINT `spp_siswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spp_siswa` ADD CONSTRAINT `spp_siswa_sppId_fkey` FOREIGN KEY (`sppId`) REFERENCES `spp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `details` ADD CONSTRAINT `details_transaksiId_fkey` FOREIGN KEY (`transaksiId`) REFERENCES `transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `details` ADD CONSTRAINT `details_sppId_fkey` FOREIGN KEY (`sppId`) REFERENCES `spp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
