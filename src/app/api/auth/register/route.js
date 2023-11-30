import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient;

export const POST = async (req, res) => {
    const body = await req.json();
    try {
        const { nama, nip, alamat, jk, email, password, hp } = body;

        if (!nama || !nip || !alamat || !jk || !email || !password || !hp) {
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                nama: nama,
                nip: nip,
                alamat: alamat,
                jk: jk,
                email: email,
                password: hashedPassword,
                hp: hp,
                role: 'Admin',
            }
        });
        return NextResponse.json({ message: 'Successfully registered account' }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}