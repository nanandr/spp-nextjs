import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient;

export const GET = async (req) => { 
    (BigInt.prototype).toJSON = function () {
        return this.toString();
    };
    try {
        const transaksi = await prisma.transaksi.findMany();
   
        let no = 1;

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
                "No": no++,
                "Nama Siswa": siswa[0].nama, 
                "Nama Petugas": petugas[0].nama, 
                "Tanggal Bayar": dateTimeFormat(item.tanggal),
                "Total Bayar": item.totalBayar,
                "Bulan": item.bulan,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
            };
        }));

        return NextResponse.json({
            message: "Successfully fetched data",
            transaksi: data
        });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

// export const POST = async (req) => {

// }