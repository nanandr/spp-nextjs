import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json()
    try {
        const { siswa, kelasId, tahunAjar } = body
        await Promise.all(siswa.map(async (item, index) => {
            const { nama, nis, nisn, alamat, jk, angkatan, hp, tempatLahir, tanggalLahir } = item
            const data = await prisma.siswa.upsert({
                where: {nisn: nisn, nis: nis},
                update: {nama: nama, alamat: alamat, jk: jk, angkatan: angkatan, hp: hp, tempatLahir: tempatLahir, tanggalLahir: tanggalLahir, updatedAt: new Date()},
                create: {nama: nama, nis: nis, nisn: nisn, alamat: alamat, jk: jk, angkatan: angkatan, hp: hp, tempatLahir: tempatLahir, tanggalLahir: tanggalLahir},
            })

            if(kelasId) {
                const kelasSiswa = await prisma.kelasSiswa.upsert({
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