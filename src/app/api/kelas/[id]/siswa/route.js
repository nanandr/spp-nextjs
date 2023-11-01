import { NextResponse } from "next/server"

export const GET = (req, context) => {
    return NextResponse.json({ message: "Hello World" });
}

export const POST = (req, context) => {
    
}