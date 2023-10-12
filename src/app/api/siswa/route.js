import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient

export const GET = async (req) => {
    try {
        const siswa = await prisma.siswa.findMany();
        let no = 1;

        const data = siswa.map(item => {
            return {
                No: no++,
                NIS: item.nis,
                Nama: item.nama,
                Kelas: `${item.kelasId} RPL A`,
                JK: item.jk,
                Hp: item.hp,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({
            siswa: data,
        });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" });
    }
}

export const POST = async (req) => {
    return NextResponse.json({ message: 'Hello World', status: "success" });
}