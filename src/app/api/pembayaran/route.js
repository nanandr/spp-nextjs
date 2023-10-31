import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat } from "../../../../utils/format";

export const GET = async (req) => { 
    try {
        const transaksi = await prisma.transaksi.findMany();
   
        const data = await Promise.all(transaksi.map(async (item) => {
            const siswa = await prisma.siswa.findMany({
                where: {
                    id: item.siswaId
                }
            });
            const petugas = await prisma.user.findMany({
                where: {
                    id: item.userId
                }
            })
            return {
                id: parseInt(item.id),
                namaSiswa: siswa[0].nama, 
                namaPetugas: petugas[0].nama, 
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