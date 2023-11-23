import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat } from "../../../../utils/format";

export const GET = async (req) => {
    const url = new URL(req.url)
    let siswa = url.searchParams.get("siswa")
    let tahunAjar = url.searchParams.get("tahun")

    try {
        let whereCondition = {}

        if (siswa) {
            whereCondition = {
                siswaId: siswa
            }
        }

        const transaksi = await prisma.transaksi.findMany({
            where: whereCondition,
            include: {
                spp: true
            }
        });

        const data = await Promise.all(transaksi.map(async (item) => {
            const siswa = await prisma.siswa.findFirst({
                where: { id: item.siswaId }
            });
            const spp = await prisma.spp.findFirst({
                where: tahunAjar
                    ? {
                        id: item.spp.id,
                        tahunAjarId: tahunAjar,
                    } : { id: item.spp.id }
            });
            const petugas = await prisma.user.findFirst({
                where: { id: item.userId }
            })
            if (spp) {
                return {
                    id: parseInt(item.id),
                    namaSiswa: siswa.nama,
                    namaPetugas: petugas.nama,
                    tanggalBayar: dateTimeFormat(item.tanggal),
                    totalBayar: parseInt(item.totalBayar),
                    bulan: item.bulan,
                    spp: spp,
                    createdAt: dateTimeFormat(item.createdAt),
                    updatedAt: dateTimeFormat(item.updatedAt)
                };
            }
            return null
        }));
        const filteredData = data.filter(item => item !== null);

        return NextResponse.json({ message: "Successfully fetched data", transaksi: filteredData });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { siswaId, userId, sppId, tanggal, totalBayar, totalBulan, bulan } = body

        let data = []
        for (let i = 0; i < totalBulan; i++) {
            data[i] = {
                siswaId: siswaId,
                userId: userId,
                sppId: sppId,
                tanggal: new Date(tanggal),
                totalBayar: totalBayar / totalBulan,
                bulan: bulan[i],
            }
        }

        const transaksi = await prisma.transaksi.createMany({
            data: data,
        })

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}