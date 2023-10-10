import { NextResponse } from "next/server"
import Prisma from "../../../../utils/prismaClient";

export const GET = async (req) => {
    try {
        let prisma = await Prisma.$connect(); //??
        return NextResponse.json({data: ""});
    }
    catch(error) { 
        return NextResponse.json({message: "Error fetching data"}).status(500);
    }
}

export const POST = async (req) => {
    return NextResponse.json({message: 'Hello World', status: "success"});
}