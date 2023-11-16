import { NextResponse } from "next/server"
import { dateTimeFormat } from "../../../../../../utils/format";
import { prisma } from "../../../../../../utils/prisma";

export const GET = async (req, context) => {
    try {
        const url = new URL(req.url);
        let tahun = url.searchParams.get("tahun");

        const tahunAjar = await prisma.tahunAjar.findFirst({
            where: {tahun: tahun}
        });
        
        const kelas = await prisma.kelas.findFirst({
            where: { id: context.params.id }
        });
        const siswa = await prisma.kelasSiswa.findMany({
            where: { kelasId: context.params.id, tahunAjarId: parseInt(tahunAjar.id) },
            include: {
                siswa: true,
                kelas: true,
                tahunAjar: true
            }
        });

        const data = siswa.map(item => {
            return {
                id: parseInt(item.id),
                siswa: {
                    id: parseInt(item.siswa.id),
                    nama: item.siswa.nama,
                    nis: item.siswa.nis,
                    //nisn
                    alamat: item.siswa.alamat,
                    nama: item.siswa.nama,
                    jk: item.siswa.jk,
                    angkatan: parseInt(item.siswa.angkatan),
                    hp: item.siswa.hp,
                    createdAt: dateTimeFormat(item.siswa.createdAt),
                    updatedAt: dateTimeFormat(item.siswa.updatedAt),
                },
                kelas: {
                    id: parseInt(item.kelas.id),
                    namaKelas: item.kelas.namaKelas
                },
                tahunAjar: {
                    id: parseInt(item.tahunAjar.id),
                    tahun: item.tahunAjar.tahun
                },
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({ message: "Successfully fetched data", kelas: {
            id: parseInt(kelas.id),
            namaKelas: kelas.namaKelas,
            createdAt: dateTimeFormat(kelas.createdAt),
            updatedAt: dateTimeFormat(kelas.updatedAt)
        }, kelasSiswa: data });
    }
    catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });        
    }
}

export const POST = (req, context) => {
    
}