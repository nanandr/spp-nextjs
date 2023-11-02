import { NextResponse } from "next/server"
import { dateTimeFormat } from "../../../../utils/format";
import { prisma } from "../../../../utils/prisma";

export const GET = async (req) => {
    try {
        const tahun = await prisma.tahunAjar.findMany();
        const data = tahun.map(item => {
            return {
                id: parseInt(item.id),
                tahun: item.tahun,
                createdAt: dateTimeFormat(item.createdAt),
                updatedAt: dateTimeFormat(item.updatedAt)
            }
        });

        data.sort((a, b) => {
            const tahunA = parseInt(a.tahun.split("/")[0], 10);
            const tahunB = parseInt(b.tahun.split("/")[0], 10);

            if (tahunA > tahunB) {
                return -1;
              } else if (tahunA < tahunB) {
                return 1;
              } else {
                return 0;
              }
        });

        return NextResponse.json({ message: "Successfully fetched data", tahun: data });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}