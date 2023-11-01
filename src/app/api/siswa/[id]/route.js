import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { dateTimeFormat } from "../../../../../utils/format";

export const GET = async (req, context) => {
    try{
        const siswa = await prisma.siswa.findFirst({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully fetched data", siswa: {
            id: parseInt(siswa.id),
            nama: siswa.nama,
            nis: siswa.nis,
            alamat: siswa.alamat,
            jk: siswa.jk,
            angkatan: parseInt(siswa.angkatan),
            hp: siswa.hp,
            createdAt: dateTimeFormat(siswa.createdAt),
            updatedAt: dateTimeFormat(siswa.updatedAt)
        }});
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const PUT = async (req, context) => {
    const body = await req.json();
    try {
        const { nama, nis, alamat, jk, angkatan, hp } = body;

        const siswa = await prisma.siswa.update({
            where: { id: context.params.id },
            data: {
                nama: nama,
                nis: nis,
                alamat: alamat,
                jk: jk,
                angkatan: angkatan,
                hp: hp,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ message: "Successfully edited data", siswa: {
            id: parseInt(siswa.id),
            nama: siswa.nama,
            nis: siswa.nis,
            jk: siswa.jk,
            alamat: alamat,
            angkatan: parseInt(siswa.angkatan),
            hp: siswa.hp,
            createdAt: dateTimeFormat(siswa.createdAt),
            updatedAt: dateTimeFormat(siswa.updatedAt)
        }});
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const DELETE = async (req, context) => {
    try {
        const siswa = await prisma.siswa.delete({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully deleted data" });
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}