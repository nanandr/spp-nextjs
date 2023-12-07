import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { verifyJwt } from "@/lib/jwt"
import { prisma } from "../../../../../utils/prisma"
import { dateTimeFormat } from "../../../../../utils/format"

export const GET = async (req, res) => {
    const url = new URL(req.url)
    let tahun = url.searchParams.get("tahun")
    try {
        const headersList = headers()
        const authorization = headersList.get('authorization')
        const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : null
        const siswa = verifyJwt(bearer)
        console.log(siswa)

        const whereCondition = { where: { siswaId: siswa.id } }
        const total = await prisma.transaksi.count(whereCondition)

        const pembayaran = await prisma.transaksi.findMany({
            ...whereCondition,
            include: {
                spp: true,
                user: true,
                siswa: {
                    include: {
                        kelas: {
                            include: { kelas: true, tahunAjar: true },
                            where: { tahunAjarId: tahun }
                        }
                    }
                },
            }
        })

        let filterPembayaran = pembayaran

        if (tahun) {
            filterPembayaran = pembayaran.filter(item => {
                return item.spp.tahunAjarId == tahun
            })
        }

        const data = filterPembayaran.map(item => {
            return {
                id: parseInt(item.id),
                namaSiswa: item.siswa.nama,
                namaPetugas: item.user.nama,
                tanggalBayar: dateTimeFormat(item.tanggal),
                totalBayar: parseInt(item.totalBayar),
                bulan: item.bulan,
                spp: item.spp,
                kelas: item.siswa.kelas.map(kelas => {
                    return {
                        namaKelas: kelas.kelas.namaKelas,
                        tahunAjar: kelas.tahunAjar.tahun
                    }
                }),
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        })

        return NextResponse.json({ transaksi: data, user: siswa })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}