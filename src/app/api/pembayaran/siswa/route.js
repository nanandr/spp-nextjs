import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { verifyJwt } from "@/lib/jwt"
import { prisma } from "../../../../../utils/prisma"

export const GET = async (req, res) => {
    const url = new URL(req.url)
    let tahunAjar = url.searchParams.get("tahun")
    try {
        const headersList = headers()
        const authorization = headersList.get('authorization')
        const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : null
        const user = verifyJwt(bearer)
        console.log(user)

        const pembayaran = await prisma.transaksi.findMany({
            where: {
                
            }
        })

        return NextResponse.json({ user: user })
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}