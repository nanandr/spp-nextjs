import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { dateTimeFormat } from "../../../../../utils/format";

export const GET = async (req, context) => {
    try {
        const kelas = await prisma.kelas.findFirst({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully fetched data", kelas: {
            id: parseInt(kelas.id),
            namaKelas: kelas.namaKelas,
            createdAt: dateTimeFormat(kelas.createdAt),
            updatedAt: dateTimeFormat(kelas.updatedAt)
        }});
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const PUT = async (req, context) => {
    const body = await req.json();
    try {
        const { namaKelas } = body;

        const kelas = await prisma.kelas.update({
            where: { id: context.params.id },
            data: {
                namaKelas: namaKelas,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ message: "Successfully edited data", kelas: {
            id: parseInt(kelas.id),
            namaKelas: kelas.namaKelas,
            createdAt: dateTimeFormat(kelas.createdAt),
            updatedAt: dateTimeFormat(kelas.updatedAt)
        }});
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const DELETE = async (req, context) => {
    try {
        const kelas = await prisma.kelas.delete({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully deleted data" });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}