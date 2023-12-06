import { prisma } from "../../../../../../utils/prisma"
import { NextResponse } from "next/server";
import { signJwtAccessToken } from "../../../../../lib/jwt";
import bcrypt from 'bcrypt';

export const POST = async (req, res) => {
    const url = new URL(req.url)
    let tahunAjar = url.searchParams.get("tahun")
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    const body = await req.json()
    try {
        const { nis, password } = body

        if (!nis) {
            throw new Error("Invalid Credentials")
        }

        const user = await prisma.siswa.findFirst({
            where: { nis: nis },
            include: {
                kelas: {
                    include: { kelas: true, tahunAjar: true },
                    where: tahunAjar ? { tahunAjarId: tahunAjar } : undefined
                },
            },
        })

        if (!user) {
            throw new Error("Invalid NIS")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            const { id, password, kelas, ...parseUser } = user
            return NextResponse.json({
                message: "Successfully logged in", user: {
                    id: parseInt(id),
                    kelas: kelas.map(kelas => {
                        return {
                            tahunId: parseInt(kelas.tahunAjarId),
                            kelasId: parseInt(kelas.kelasId),
                            namaKelas: kelas.kelas.namaKelas,
                            tahunAjar: kelas.tahunAjar.tahun
                        }
                    }),
                    ...parseUser,
                    token: signJwtAccessToken({ id: parseInt(id), ...parseUser })
                }
            })
        }
        throw new Error("Invalid Password")
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}