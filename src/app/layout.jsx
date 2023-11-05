import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from './login';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aplikasi SPP | SDQ Bina Mulya',
  description: 'SPP SDQ Bina Mulya',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      
      <body className={inter.className}>
        <Providers>{session ? children : <Login/>}</Providers>
      </body>
    </html>
  )
}