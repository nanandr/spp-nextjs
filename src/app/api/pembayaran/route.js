import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat } from "../../../../utils/format";

export const GET = async (req) => { 
    const url = new URL(req.url)
    let siswa = url.searchParams.get("siswa")

    try {
        const transaksi = await prisma.transaksi.findMany({
            where: {
                siswaId: siswa
            }
        });
   
        const data = await Promise.all(transaksi.map(async (item) => {
            const siswa = await prisma.siswa.findFirst({
                where: {
                    id: item.siswaId
                }
            });
            const petugas = await prisma.user.findFirst({
                where: {
                    id: item.userId
                }
            })
            return {
                id: parseInt(item.id),
                namaSiswa: siswa.nama, 
                namaPetugas: petugas.nama, 
                tanggalBayar: dateTimeFormat(item.tanggal),
                totalBayar: parseInt(item.totalBayar),
                bulan: item.bulan,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            };
        }));

        return NextResponse.json({ message: "Successfully fetched data", transaksi: data });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

// export const POST = async (req) => {

// }