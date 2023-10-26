import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient;

export const GET = async (req) => {
    try {
        const petugas = await prisma.user.findMany({
            where: {
                role: 'Staff'
            }
        });

        let no = 1;

        const data = petugas.map(item => {
            return {
                "No": no++,
                "NIP": item.nip,
                "Nama Petugas": item.nama,
                "Alamat": item.alamat,
                "Email": item.email,
                "Hp": item.hp,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({
            message: "Successfully fetched data",
            petugas: data
        });
    }
    catch(error) {
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

// export const POST = async (req) => {

// }