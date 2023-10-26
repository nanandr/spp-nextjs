import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dateTimeFormat } from "../../../../utils/format";
const prisma = new PrismaClient;

export const GET = async (req) => {
    try {
        const laporan = await prisma.detail.findMany();
        let no = 1;

        const data = laporan.map(item => {
            return {
                "No": no++,
                "Data dibuat": dateTimeFormat(item.createdAt),
                "Data diubah": dateTimeFormat(item.updatedAt)
            }
        });

        return NextResponse.json({
            message: "Successfully fetched data",
            laporan: data
        });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}

// export const POST = async (req) => {

// }