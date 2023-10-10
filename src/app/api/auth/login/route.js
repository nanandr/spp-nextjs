const { NextResponse } = require("next/server")

export const POST = async (req) => {
    return NextResponse.json({message: "Successfully logged in"});
}