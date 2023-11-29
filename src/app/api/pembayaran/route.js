import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat, getDateRange } from "../../../../utils/format";

export const GET = async (req) => {
    const url = new URL(req.url)
    let siswa = url.searchParams.get("siswa")
    let range = url.searchParams.get("range")
    let tahunAjar = url.searchParams.get("tahun")
    let bulan = url.searchParams.get("bulan")

    try {
        let whereCondition = {}

        if (!tahunAjar) {
            const dataTahun = await prisma.tahunAjar.findMany()
            dataTahun.sort((a, b) => {
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

            tahunAjar = dataTahun[0].id
        }

        if (range) {
            const tahun = await prisma.tahunAjar.findFirst({ where: { id: tahunAjar } })
            const params = { range: range, tahun: tahun.tahun, bulan: bulan ? bulan : undefined }
            const dateRange = getDateRange(params)

            console.log({ tahun: tahun.tahun, bulan: bulan, params: params, range: dateRange, format: { gte: dateTimeFormat(dateRange.gte), lt: dateTimeFormat(dateRange.lt) } })

            whereCondition = {
                ...whereCondition,
                createdAt: { gte: dateRange.gte, lt: dateRange.lt }
            }

        }

        if (siswa) {
            whereCondition = {
                ...whereCondition,
                siswaId: siswa
            }
        }

        const transaksi = await prisma.transaksi.findMany({
            where: whereCondition,
            include: {
                spp: true,
                user: true,
                siswa: true,
            }
        })

        let filterTransaksi = transaksi

        if (tahunAjar) {
            filterTransaksi = transaksi.filter(item => {
                return item.spp.tahunAjarId == tahunAjar
            })
        }

        const data = filterTransaksi.map(item => {
            return {
                id: parseInt(item.id),
                namaSiswa: item.siswa.nama,
                namaPetugas: item.user.nama,
                tanggalBayar: dateTimeFormat(item.tanggal),
                totalBayar: parseInt(item.totalBayar),
                bulan: item.bulan,
                spp: {
                    id: parseInt(item.spp.id),
                    tahunAjarId: parseInt(item.spp.tahunAjarId),
                    spp: parseInt(item.spp.spp),
                },
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        })

        return NextResponse.json({ message: "Successfully fetched data", transaksi: data, total: filterTransaksi.length })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
    }
}

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { siswaId, userId, sppId, tanggal, totalBayar, totalBulan, bulan } = body

        let data = []
        for (let i = 0; i < totalBulan; i++) {
            data[i] = {
                siswaId: siswaId,
                userId: userId,
                sppId: sppId,
                tanggal: new Date(tanggal),
                totalBayar: totalBayar / totalBulan,
                bulan: bulan[i],
            }
        }

        const transaksi = await prisma.transaksi.createMany({
            data: data,
        })

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}