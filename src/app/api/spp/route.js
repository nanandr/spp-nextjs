import { NextResponse } from "next/server"
import { prisma } from "../../../../utils/prisma"
import { dateTimeFormat, paginate } from "../../../../utils/format"

export const GET = async (req, res) => {
  const url = new URL(req.url)
  let page = url.searchParams.get("page")
  let tahunAjar = url.searchParams.get("tahunAjar") ?? ''

  try {
    let whereCondition = {}

    if (tahunAjar) {
      whereCondition =
        { tahunAjarId: tahunAjar }
    }
    const total = await prisma.spp.count({
      where: whereCondition,
    })

    const pagination = paginate(page, total)

    const spp = await prisma.spp.findMany({
      where: whereCondition,
      skip: pagination.skip,
      take: pagination.take,
    })

    const data = spp.map(item => {
      return {
        id: parseInt(item.id),
        tahunAjarId: parseInt(item.tahunAjarId),
        spp: parseInt(item.spp),
        createdAt: dateTimeFormat(item.createdAt),
        updatedAt: dateTimeFormat(item.updatedAt)
      }
    })

    return NextResponse.json({ message: "Successfully fetched data", spp: data, total: total })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 })
  }
}

// export const POST = async (req, res) => {
//     const body = await req.json()
//     try {
//         const { nama, nis, nisn, jk, angkatan, kelas, alamat, hp, tahunAjar } = body

//         const siswa = await prisma.siswa.create({
//             data: {
//                 nama: nama,
//                 nis: nis,
//                 nisn: nisn,
//                 alamat: alamat,
//                 jk: jk,
//                 angkatan: angkatan,
//                 hp: hp,
//             },
//         })

//         const createKelas = await prisma.kelasSiswa.create({
//             data: {
//                 siswaId: parseInt(siswa.id),
//                 kelasId: kelas,
//                 tahunAjarId: tahunAjar,
//             }
//         })

//         return NextResponse.json({ message: "Successfully created data" }, { status: 201 })
//     }
//     catch (error) {
//         return NextResponse.json({ message: error }, { status: 500 })
//     }
// }