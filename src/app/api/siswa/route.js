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
    // const { nama, nis, jk, kelas, angkatan, hp, diskon } = req.body
    // console.log(req.body)
    const siswa = await prisma.siswa.create({
        data: {
            nama: "Rafi I",
            nis: "21115352",
            jk: "LakiLaki",
            kelasId: 1,
            angkatan: 2,
            hp: "0812391273",
            diskonId: 1,
        },
    })

    return NextResponse.json({ message: 'Hello World', status: "success", result: siswa });
}