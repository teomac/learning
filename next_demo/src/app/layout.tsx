import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Auth App',
  description: 'Authentication app with Google OAuth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}