import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat } from "../../../../utils/format";

export const GET = async (req) => {
    try {
        const petugas = await prisma.user.findMany({
            where: {
                role: 'Staff'
            }
        });

        const data = petugas.map(item => {
            return {
                id: parseInt(item.id),
                nip: item.nip,
                nama: item.nama,
                alamat: item.alamat,
                jk: item.jk,
                email: item.email,
                hp: item.hp,
                role: item.role,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
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