import { NextResponse } from "next/server";
import { dateTimeFormat } from "../../../../../utils/format";
import { prisma } from "../../../../../utils/prisma";

export const GET = async (req, context) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully fetched data", user: {
            id: parseInt(user.id),
            nama: user.nama,
            nip: user.nip,
            alamat: user.alamat,
            email: user.email,
            hp: user.hp,
            role: user.role,
            createdAt: dateTimeFormat(user.createdAt),
            updatedAt: dateTimeFormat(user.updatedAt)
        }});
    }
    catch (error) {
        console.error(error);
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