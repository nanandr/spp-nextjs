import { getToken } from "next-auth/jwt"
import { verifyJwt } from "./lib/jwt"

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const decodedToken = () => {
        // if(!token) {
        //     const header = req.headers.get("authorization")
        //     const bearer = header && header.startsWith('Bearer ') ? header.slice(7, header.length) : null
        //     verifyJwt(bearer)
        // }
        return null
    }

    const isLogin = !!(token || decodedToken())

    console.log({pathname: req.nextUrl.pathname, token, isLogin: isLogin })
}

export const config = {
    // matcher: ['/((?!api|_next|.*\\..*).*)']
    matcher: ['/api/:page*']
}