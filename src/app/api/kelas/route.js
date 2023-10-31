import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat } from "../../../../utils/format";

export const GET = async (req) => {
    try {
        const kelas = await prisma.kelas.findMany({
            take: 5,
        });

        const data = kelas.map(item => {
            return {
                id: parseInt(item.id),
                namaKelas: item.namaKelas,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({
            message: "Successfully fetched data",
            kelas: data
        });
    }
    catch(error) {
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const POST = async (req) => {
    const body = await req.json();
    try {
        const { namaKelas } = body;

        const kelas = await prisma.kelas.create({
            data: {
                namaKelas: namaKelas,
            },
        });

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}