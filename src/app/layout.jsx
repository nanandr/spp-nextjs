import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Login from './login'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aplikasi SPP | SDQ Bina Mulya',
  description: 'SPP SDQ Bina Mulya',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  const protectedPath = ['siswa', 'petugas', 'kelas', 'tahunajar']

  const headersList = headers()
  const pathname = headersList.get('x-invoke-path')

  if (!session && pathname !== '/') {
    redirect('/')
  }

  if (session && session.user.role !== 'Admin' && protectedPath.includes(pathname.split('/')[1])) {
    redirect('/')
  }

  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>

      <body className={inter.className}>
        <Providers>{session ? children : <Login />}</Providers>
      </body>
    </html>
  )
}