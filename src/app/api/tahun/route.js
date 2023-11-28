import { NextResponse } from "next/server"
import { dateTimeFormat, paginate, takeTahun } from "../../../../utils/format"
import { prisma } from "../../../../utils/prisma"

export const GET = async (req) => {
    const url = new URL(req.url)
    let page = url.searchParams.get("page")

    try {
        const tahun = await prisma.tahunAjar.findMany({
            include: {
                spp: true
            }
        })
        const data = tahun.map(item => {
            return {
                id: parseInt(item.id),
                tahun: item.tahun,
                spp: item.spp.map(spp => {
                    return {
                        spp: parseInt(spp.spp)
                    }
                }),
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        })

        data.sort((a, b) => {
            const tahunA = parseInt(a.tahun.split("/")[0], 10)
            const tahunB = parseInt(b.tahun.split("/")[0], 10)

            if (tahunA > tahunB) {
                return -1
              } else if (tahunA < tahunB) {
                return 1
              } else {
                return 0
              }
        })

        const total = await prisma.tahunAjar.count()
        const pagination = paginate(page, total, url.searchParams.get('take') ? url.searchParams.get('take') : takeTahun, 'array')

        return NextResponse.json({ message: "Successfully fetched data", tahun: data.slice(pagination.start, pagination.end), total: total })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
    }
}

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { tahun, spp } = body

        const tahunAjar = await prisma.tahunAjar.create({
            data: { tahun: tahun },
        })

        const dataSpp = await prisma.spp.create({
            data: {
                tahunAjarId: tahunAjar.id,
                spp: spp
            }
        })

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}