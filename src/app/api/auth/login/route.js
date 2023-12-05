import { prisma } from "../../../../../utils/prisma"
import { NextResponse } from "next/server";
import { signJwtAccessToken } from "../../../../lib/jwt";
import bcrypt from 'bcrypt';

export const POST = async (req, res) => {
    const body = await req.json()
    try {
        const { email, password } = body
        
        if (!email) {
            throw new Error("Invalid Credentials")
        }

        const user = await prisma.user.findFirst({ where: { email: email } })

        if(!user) {
            throw new Error("Invalid Email")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(isPasswordCorrect) {
            const { id, password, ...parseUser } = user
            return NextResponse.json({ message: "Successfully logged in", user: {
                id: parseInt(id),
                ...parseUser,
                token: signJwtAccessToken({id: parseInt(id), ...parseUser}) 
            }})
        }
        throw new Error("Invalid Password")
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}