import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { dateTimeFormat, paginate } from "../../../../utils/format";

export const GET = async (req) => {
	const url = new URL(req.url)
	let page = url.searchParams.get("page")
	let search = url.searchParams.get("search")

	try {
		let whereCondition = {
			where: {
				role: 'Staff',
				OR: search ? [{ nama: {contains: search} }] : undefined
			}
		}

		const total = await prisma.user.count(whereCondition)
		const pagination = paginate(page, total)

		const petugas = await prisma.user.findMany({
			...whereCondition,
			...pagination
		});

		const data = petugas.map(item => {
			return {
				id: parseInt(item.id),
				nip: item.nip,
				nama: item.nama,
				alamat: item.alamat,
				jk: item.jk,
				email: item.email,
				hp: item.hp,
				role: item.role,
				createdAt: dateTimeFormat(item.createdAt),
				updatedAt: dateTimeFormat(item.updatedAt)
			}
		});

		return NextResponse.json({ message: "Successfully fetched data", petugas: data, total: total });
	}
	catch (error) {
		return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
	}
}

// export const POST = async (req) => {

// }