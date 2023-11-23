import { NextResponse } from "next/server"
import { prisma } from "../../../../utils/prisma"
import { dateTimeFormat, paginate } from "../../../../utils/format"

export const GET = async (req, res) => {
    const url = new URL(req.url)
    let page = url.searchParams.get("page")
    let search = url.searchParams.get("search")
    let tahunAjar = url.searchParams.get("tahun")

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
                kelas: {
                    include: { kelas: true, tahunAjar: true },
                    where: tahunAjar ? { tahunAjarId: tahunAjar } : undefined
                },
            },
        })

        const data = siswa.map(item => {
            return {
                id: parseInt(item.id),
                nis: item.nis,
                nisn: item.nisn,
                nama: item.nama,
                kelas: item.kelas.map(kelas => {
                    return {
                        tahunId: parseInt(kelas.tahunAjarId),
                        kelasId: parseInt(kelas.kelasId),
                        namaKelas: kelas.kelas.namaKelas,
                        tahunAjar: kelas.tahunAjar.tahun
                    }
                }),
                jk: item.jk,
                alamat: item.alamat,
                tempatLahir: item.tempatLahir,
                tanggalLahir: item.tanggalLahir,
                angkatan: parseInt(item.angkatan),
                hp: item.hp,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        })

        return NextResponse.json({ message: "Succesfully fetched data", siswa: data, total: total })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const body = await req.json()
    try {
        const { nama, nis, nisn, jk, angkatan, kelas, alamat, hp, tahunAjar, tempatLahir, tanggalLahir } = body

        const siswa = await prisma.siswa.create({
            data: {
                nama: nama,
                nis: nis,
                nisn: nisn,
                alamat: alamat,
                jk: jk,
                angkatan: angkatan,
                hp: hp,
                tempatLahir: tempatLahir,
                tanggalLahir: new Date(tanggalLahir),
            },
        })

        if (kelas && tahunAjar) {
            const createKelas = await prisma.kelasSiswa.create({
                data: {
                    siswaId: parseInt(siswa.id),
                    kelasId: kelas,
                    tahunAjarId: tahunAjar,
                }
            })
        }

        return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}