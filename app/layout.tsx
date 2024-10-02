import { Toaster } from '@/app/_components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from './_components/session-provider'
import { ChildrenProps } from './_types/common'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clinicas'
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
