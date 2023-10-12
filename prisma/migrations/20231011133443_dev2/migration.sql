/*
  Warnings:

  - You are about to drop the column `diskonId` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `kelasId` on the `siswa` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `deletedAt` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `siswaId` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the `detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sppsiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `diskon_id` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas_id` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siswa_id` to the `transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `transaksi` table without a default value. This is not possible if the table is not empty.
  - Made the column `tanggal` on table `transaksi` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `detail` DROP FOREIGN KEY `Detail_sppId_fkey`;

-- DropForeignKey
ALTER TABLE `detail` DROP FOREIGN KEY `Detail_transaksiId_fkey`;

-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_diskonId_fkey`;

-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `sppsiswa` DROP FOREIGN KEY `SppSiswa_siswaId_fkey`;

-- DropForeignKey
ALTER TABLE `sppsiswa` DROP FOREIGN KEY `SppSiswa_sppId_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_siswaId_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_userId_fkey`;

-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `diskonId`,
    DROP COLUMN `kelasId`,
    ADD COLUMN `diskon_id` BIGINT UNSIGNED NOT NULL,
    ADD COLUMN `kelas_id` BIGINT UNSIGNED NOT NULL,
    MODIFY `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` TIMESTAMP NULL,
    MODIFY `deletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `transaksi` DROP COLUMN `siswaId`,
    DROP COLUMN `userId`,
    ADD COLUMN `siswa_id` BIGINT UNSIGNED NOT NULL,
    ADD COLUMN `user_id` BIGINT UNSIGNED NOT NULL,
    MODIFY `tanggal` DATE NOT NULL;

-- DropTable
DROP TABLE `detail`;

-- DropTable
DROP TABLE `sppsiswa`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NOT NULL,
    `role` ENUM('Staff', 'Admin') NOT NULL DEFAULT 'Staff',
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spp_siswa` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `siswa_id` BIGINT UNSIGNED NOT NULL,
    `spp_id` BIGINT UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `deletedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `details` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `transaksi_id` BIGINT UNSIGNED NOT NULL,
    `spp_id` BIGINT UNSIGNED NOT NULL,
    `jumlahBayar` BIGINT NOT NULL,
    `sisa` BIGINT NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_diskon_id_fkey` FOREIGN KEY (`diskon_id`) REFERENCES `diskon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spp_siswa` ADD CONSTRAINT `spp_siswa_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spp_siswa` ADD CONSTRAINT `spp_siswa_spp_id_fkey` FOREIGN KEY (`spp_id`) REFERENCES `spp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `details` ADD CONSTRAINT `details_transaksi_id_fkey` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `details` ADD CONSTRAINT `details_spp_id_fkey` FOREIGN KEY (`spp_id`) REFERENCES `spp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
