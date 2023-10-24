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
                "Kelas": `1 RPL A`,
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
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const POST = async (req, res) => {
    const body = await req.json();
    try {
        const { nama, nis, jk, angkatan, hp } = body;

        const siswa = await prisma.siswa.create({
            data: {
                nama: nama,
                nis: nis,
                jk: jk,
                angkatan: angkatan,
                hp: hp,
            },
        });

        return NextResponse.json({ message: "Successfully created data"});
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}