import NextAuth from "next-auth";
import { prisma } from "../../../../../utils/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) {
                    console.log("invalid credentials");
                    return null;
                }
                try {
                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    });
    
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
                            role: user.role
                        }
                        console.log(`successfully logged in`, data);

                        return data;
                    }

                    console.log("invalid password");
    
                    return null;
                }
                catch(err) {
                    console.error(err);
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
        session: async ({ session }) => {
            console.log(session)
            
            const user = await prisma.user.findFirst({
                where: { email: session.user.email },
            });

            return {
                user: {
                    id: parseInt(user.id),
                    nama: user.nama,
                    email: user.email,
                    role: user.role
                },
                expires: session.expires
            }
        },
        jwt: async ({token}) => {
            
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };