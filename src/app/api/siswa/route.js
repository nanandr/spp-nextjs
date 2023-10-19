import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient;

export const GET = async (req) => {
    try {
        const siswa = await prisma.siswa.findMany();
        let no = 1;

        const data = siswa.map(item => {
            return {
                "No": no++,
                "NIS": item.nis,
                "Nama": item.nama,
                "Kelas": `${item.kelasId} RPL A`,
                "JK": item.jk,
                "Hp": item.hp,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({
            message: "Successfully fetched data",
            siswa: data
        });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" });
    }
}

export const POST = async (req) => {
    try {
        const { nama, nis, jk, kelas, angkatan, hp, diskon } = req.body
        
        const siswa = await prisma.siswa.create({
            data: {
                nama: "Syahrul Ady Purnama",
                nis: "21115732",
                jk: "Perempuan",
                kelasId: 1,
                angkatan: 2,
                hp: "0129309120",
                diskonId: 1,
            },
        });

        return NextResponse.json({ message: "Successfully created data", result: siswa });
    }
    catch(error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}