import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { take, dateTimeFormat } from "../../../../utils/format";

export const GET = async (req, res) => {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    try {
        const siswa = await prisma.siswa.findMany({
            skip: (page - 1) * take,
            take: take,
        });

        const data = siswa.map(item => {
            return {
                id: parseInt(item.id),
                nis: item.nis,
                alamat: item.alamat,
                nama: item.nama,
                kelas: `1 RPL A`,
                jk: item.jk,
                angkatan: parseInt(item.angkatan),
                hp: item.hp,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({ message: "Successfully fetched data", siswa: data });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const POST = async (req, res) => {
    const body = await req.json();
    try {
        const { nama, nis, jk, angkatan, alamat, hp } = body;

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

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}