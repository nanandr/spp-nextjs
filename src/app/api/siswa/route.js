import { NextResponse } from "next/server"
import { prisma } from "../../../../utils/prisma"
import { dateTimeFormat, paginate } from "../../../../utils/format"

export const GET = async (req, res) => {
    const url = new URL(req.url)
    let page = url.searchParams.get("page")
    let search = url.searchParams.get("search") ?? ''

    try {
        let whereCondition = {}

        if (search) {
            whereCondition.OR = [
                { nis: search },
                { nisn: search },
            ]
        }
        const total = await prisma.siswa.count({
            where: whereCondition,
        })

        const pagination = paginate(page, total)

        const siswa = await prisma.siswa.findMany({
            where: whereCondition,
            skip: pagination.skip,
            take: pagination.take,
            include: {
                kelas: true
            }
        })

        const data = await Promise.all(siswa.map(async (item) => {
            let kelasSiswa = await Promise.all(item.kelas.map(async (kelas) => {
                const dataKelas = await prisma.kelas.findFirst({ where: { id: kelas.kelasId } })
                const dataTahun = await prisma.tahunAjar.findFirst({ where: { id: kelas.tahunAjarId } })

                return { tahunId: parseInt(dataTahun.id), kelasId: parseInt(dataKelas.id), namaKelas: dataKelas.namaKelas, tahunAjar: dataTahun.tahun }
            }))

            return {
                id: parseInt(item.id),
                nis: item.nis,
                nisn: item.nisn,
                alamat: item.alamat,
                nama: item.nama,
                kelas: kelasSiswa,
                jk: item.jk,
                angkatan: parseInt(item.angkatan),
                hp: item.hp,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        }))

        return NextResponse.json({ message: "Successfully fetched data", siswa: data, total: total })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const body = await req.json()
    try {
        const { nama, nis, nisn, jk, angkatan, kelas, alamat, hp, tahunAjar } = body

        const siswa = await prisma.siswa.create({
            data: {
                nama: nama,
                nis: nis,
                nisn: nisn,
                alamat: alamat,
                jk: jk,
                angkatan: angkatan,
                hp: hp,
            },
        })

        const createKelas = await prisma.kelasSiswa.create({
            data: {
                siswaId: parseInt(siswa.id),
                kelasId: kelas,
                tahunAjarId: tahunAjar,
            }
        })

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}