import { Toaster } from '@/app/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from './components/session-provider'
import './globals.css'
import { ChildrenProps } from './types/common'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clinicas'
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
