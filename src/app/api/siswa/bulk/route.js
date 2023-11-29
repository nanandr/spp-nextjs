import { NextResponse } from "next/server"
import { prisma } from "../../../../../utils/prisma"

//EXAMPLE CODE DONT FORGET TO DELETE THIS
export const GET = async () => {
    try {
        const data = await prisma.siswa.findMany({
            include: {
                kelas: {
                    include: { kelas: true, tahunAjar: true }
                }
            }
        })

        console.log(data)
        console.log(data[0].kelas)
    }
    catch(err) {
        console.log(err)
    }
}

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { siswa, kelasId, tahunAjar } = body

        console.log({siswa: siswa, kelas: kelasId, tahunAjar: tahunAjar})

        let data = {}
        let kelasSiswa = {}

        await Promise.all(siswa.map(async (item, index) => {
            const { nama, nis, nisn, alamat, jk, angkatan, hp, tempatLahir, tanggalLahir } = item
            if(isNaN(Date.parse(tanggalLahir))) {
                console.log({nama: nama, tanggalLahir: tanggalLahir})
            }
            else {
                data = await prisma.siswa.upsert({
                    where: {nisn: nisn, nis: nis},
                    update: {nama: nama, alamat: alamat, jk: jk, angkatan: angkatan, hp: hp, tempatLahir: tempatLahir, tanggalLahir: new Date(tanggalLahir), updatedAt: new Date()},
                    create: {nama: nama, nis: nis, nisn: nisn, alamat: alamat, jk: jk, angkatan: angkatan, hp: hp, tempatLahir: tempatLahir, tanggalLahir: new Date(tanggalLahir)},
                })
            }

            if(kelasId) {
                kelasSiswa = await prisma.kelasSiswa.upsert({
                    where: { siswaId_tahunAjarId: { siswaId: parseInt(data.id), tahunAjarId: tahunAjar } },
                    update: { kelasId: kelasId, updatedAt: new Date() },
                    create: { siswaId: parseInt(data.id), kelasId: kelasId, tahunAjarId: tahunAjar }
                })
            }
        }))

        return NextResponse.json({message: "Successfully created data"}, {status: 201})
    }
    catch(error) {
        console.log(error)
        return NextResponse.json({message: "Error fetching data"}, {status: 500})
    }
}