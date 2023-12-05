import NextAuth from "next-auth"
import { prisma } from "../../../../../utils/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            session: {
                strategy: 'jwt'
            },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) {
                    console.log("invalid credentials")
                    return null
                }
                try {
                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    })
    
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    
                    if(isPasswordCorrect) {
                        const data = {
                            id: parseInt(user.id),
                            nama: user.nama,
                            nip: user.nip,
                            alamat: user.alamat,
                            email: user.email,
                            hp: user.hp,
                            role: user.role,
                            // token: credentials.csrfToken || undefined its a csrf instead of jwt
                        }

                        return data
                    }

                    console.log("invalid password")
    
                    return null
                }
                catch(err) {
                    console.error(err)
                }
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: 'auth/signout'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        //some points:
        //getToken({ req, raw: true }) will return raw token, based on session cookie/bearer
        //should middleware return json error or redirect(only for web) ?
        //cant access api/auth/signin from postman, (need csrf token from api/auth/csrf, pass to api/auth/credentials? it works but complicated and still cant get token) 
        //jwt callback params
        //  user = data from authorize(credentials), but only works once when first signin, after that undefined
        //session callback
        //  ppl mentioned session({token}) => { ... session.token = token.accessToken; return session }
        //  maybe modify token object through jwt callback
        session: async ({ session }) => {
            const user = await prisma.user.findFirst({
                where: { email: session.user.email },
            })

            return {
                user: {
                    id: parseInt(user.id),
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                    // token: token.accessToken
                },
                expires: session.expires
            }
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }