import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { connectToDatabase } from "../../../../../utils/serverHelper";

export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json();
        if(!name || !email || !password) return NextResponse.json({message: "Invalid Data", status: 422});
        const hashedPassword = bcrypt.hash(password, 10);
        await connectToDatabase();
        const newUser = await Prisma.UserScalarFieldEnum({data: {email, name, hashedPassword}});
        return NextResponse.json({message: 'Successfully registered account', status: 200});
    }
    catch (error) {
        console.log(error);
        throw new Error("Unable to connect to create new user");
    }
    finally {
        Prisma.$disconnect();
    }
}