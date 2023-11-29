import { NextResponse } from "next/server"
import { prisma } from "../../../../utils/prisma"
import { dateTimeFormat, paginate } from "../../../../utils/format"

export const GET = async (req) => {
    const url = new URL(req.url)
    let page = url.searchParams.get("page")
    let search = url.searchParams.get("search")

    try {
        let whereCondition = {}

        if(search) {
            whereCondition.where = {
                OR: [{ namaKelas: { contains: search } }]
            }
        }

        const total = await prisma.kelas.count()
        const pagination = paginate(page, total)
        
        const kelas = await prisma.kelas.findMany({
            ...whereCondition,
            ...pagination
        })

        const data = kelas.map(item => {
            return {
                id: parseInt(item.id),
                namaKelas: item.namaKelas,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        })
        return NextResponse.json({ message: "Successfully fetched data", kelas: data, total: total })
    }
    catch(error) {
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
    }
}

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { namaKelas } = body

        const kelas = await prisma.kelas.create({
            data: {
                namaKelas: namaKelas,
            },
        })

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}