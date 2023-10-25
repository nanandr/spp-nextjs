import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
                    return null;
                }
                try {
                    await prisma.$connect();
                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    });
    
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    
                    console.log(`password is ${ isPasswordCorrect ? 'true' : 'false' }`);

                    if(isPasswordCorrect) {
                        return {
                            id: user.id,
                            nama: user.nama,
                            email: user.email,
                            token: 'exampletoken'
                        };
                    }
    
                    return null;
                }
                catch(err) {
                    console.error(err);
                }
                finally {
                    await prisma.$disconnect();
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };