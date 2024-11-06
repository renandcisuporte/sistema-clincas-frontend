import { Toaster } from '@/app/_components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChildrenProps } from './_types/common'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clinicas'
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <SessionProvider> */}
        {children}
        <Toaster />
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
