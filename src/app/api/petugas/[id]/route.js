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
            jk: item.jk,
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

export const PUT = async (req, context) => {
    const body = await req.json();
    try {
        const { nip, nama, alamat, jk, hp, email } = body;

        const user = await prisma.user.update({
            where: { id: context.params.id },
            data: {
                nip: nip,
                nama: nama,
                alamat: alamat,
                jk: jk,
                hp: hp,
                email: email,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ message: "Successfully edited data", user: {
            id: parseInt(user.id),
            nip: user.nip,
            nama: user.nama,
            alamat: user.alamat,
            jk: user.jk,
            hp: user.hp,
            email: user.email,
            createdAt: dateTimeFormat(user.createdAt),
            updatedAt: dateTimeFormat(user.updatedAt)
        }});
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

export const DELETE = async (req, context) => {
    try {
        const user = await prisma.user.delete({
            where: { id: context.params.id }
        });

        return NextResponse.json({ message: "Successfully deleted data" });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}