import { LogOut } from '@/app/components/common/button-others'
import { Nav } from '@/app/components/common/link'
import { cn } from '@/app/lib/utils'
import { ChildrenProps } from '@/app/types/common'
import Image from 'next/image'

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <main className="bg-neutral-100 h-full flex flex-col md:flex-row">
      <nav
        className={cn(
          'space-y-2 sticky top-0 left-0 h-16 py-4 flex items-center md:min-w-64 md:flex-col md:items-start md:h-screen bg-neutral-800',
          'bg-default'
        )}
      >
        <span className="h-20 -mb-6 -mt-4 relative w-full bg-neutral-100">
          <Image
            alt="Logo"
            src="/RUBRICA-SISTEMA.png"
            className="w-32 mx-auto"
            width={80}
            height={80}
            quality={100}
          />
        </span>
        <Nav href="/dashboard">Dashboard</Nav>
        <Nav href="/clinics">Clinicas</Nav>
        <Nav href="/rooms">Salas</Nav>
      </nav>
      <section className="flex-1 p-4 space-y-6">
        <div
          className={cn(
            'h-16 sticky top-0 left-0 shadow-lg p-4 -mt-4 -mx-4 justify-between flex border-neutral-900 bg-neutral-800',
            'border-default bg-default'
          )}
        >
          <section></section>
          <section>
            <LogOut />
          </section>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg">{children}</div>
      </section>
    </main>
  )
}
