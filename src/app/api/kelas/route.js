import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient;

export const GET = async (req) => {
    try {
        const kelas = await prisma.kelas.findMany();
        let no = 1;

        const data = kelas.map(item => {
            return {
                "No": no++,
                "Nama kelas": item.namaKelas,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
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

// export const POST = async (req) => {

// }