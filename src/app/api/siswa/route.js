import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { take, dateTimeFormat } from "../../../../utils/format";

export const GET = async (req, res) => {
    const url = new URL(req.url);
    let page = url.searchParams.get("page");
    if(!page) {
        page = 1;
    }
    try {
        const siswa = await prisma.siswa.findMany({
            skip: (page - 1) * take,
            take: take,
            include: {
                kelas: true
            }
        });

        const data = await Promise.all(siswa.map(async (item) => {
            let kelasSiswa = await Promise.all(item.kelas.map(async (kelas) => {
                const dataKelas = await prisma.kelas.findFirst({ where: { id: kelas.kelasId } });
                const dataTahun = await prisma.tahunAjar.findFirst({ where: { id: kelas.tahunAjarId } });

                return { tahunId: parseInt(dataTahun.id), namaKelas: dataKelas.namaKelas, tahunAjar: dataTahun.tahun };
            }));

            return {
                id: parseInt(item.id),
                nis: item.nis,
                alamat: item.alamat,
                nama: item.nama,
                kelas: kelasSiswa,
                jk: item.jk,
                angkatan: parseInt(item.angkatan),
                hp: item.hp,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        }));

        const total = await prisma.siswa.count();

        return NextResponse.json({ message: "Successfully fetched data", siswa: data, total: total });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const POST = async (req, res) => {
    const body = await req.json();
    try {
        const { nama, nis, jk, angkatan, kelas, alamat, hp, tahunAjar } = body;

        const siswa = await prisma.siswa.create({
            data: {
                nama: nama,
                nis: nis,
                alamat: alamat,
                jk: jk,
                angkatan: angkatan,
                hp: hp,
            },
        });
        // const siswaId = siswa.id;

        // const createKelas = await prisma.kelasSiswa.create({
        //     data: {
        //         siswaId: siswaId,
        //         kelasId: kelas,
        //         tahunAjarId: tahunAjar,
        //     }
        // }) 

        return NextResponse.json({ message: "Successfully created data", id: siswa.id }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}