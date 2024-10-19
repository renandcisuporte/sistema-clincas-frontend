import { LogOut } from '@/app/components/common/button-others'
import * as Nav from '@/app/components/common/link'
import { cn } from '@/app/lib/utils'
import { ChildrenProps } from '@/app/types/common'
import { Boxes, BriefcaseMedical, Gauge } from 'lucide-react'
import Image from 'next/image'

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <main className="bg-neutral-100 h-full flex flex-col md:flex-row">
      <div
        className={cn(
          'sticky top-0 left-0 h-16 flex items-center w-full md:max-w-64 md:flex-col md:items-start md:h-screen bg-neutral-800',
          'bg-default'
        )}
      >
        <span className="h-16 relative w-full bg-white border-white border-b-4">
          <Image
            alt="Logo"
            src="/RUBRICA-SISTEMA.png"
            className="w-32 mx-auto"
            width={120}
            height={120}
            quality={100}
          />
        </span>
        <nav
          className={cn(
            // nav
            'border-transparent divide-y divide-default mt-6 w-full md:max-w-64 md:h-screen',

            // nav > a
            '[&>a]:block [&>a]:h-16 [&>a]:text-white [&>a]:w-full [&>a]:relative [&>a]:items-center [&>a]:flex-wrap [&>a]:space-x-2 [&>a]:px-4 [&>a]:bg-default-dark hover:[&>a]:bg-neutral-100 hover:[&>a]:text-black',

            // nav > a > span
            '[&>a>span]:h-16 [&>a>span]:flex [&>a>span]:space-x-1 [&>a>span]:items-center',

            // nav > div
            '[&>div]:h-16 [&>div]:cursor-pointer [&>div]:text-white [&>div]:w-full [&>div]:relative [&>div]:items-center [&>div]:flex-col [&>div]:bg-default-dark hover:[&>div]:bg-neutral-100 hover:[&>div]:text-black',

            // nav > div > span
            '[&>div>span]:h-16 [&>div>span]:px-4 [&>div>span]:flex [&>div>span]:space-x-1 [&>div>span]:items-center',

            // nav > div > div
            '[&>div>div]:flex-1 [&>div>div]:-mt-[1px] [&>div>div]:pl-4 [&>div>div]:cursor-pointer [&>div>div]:min-h-16 [&>div>div]:items-center [&>div>div]:text-white [&>div>div]:w-full [&>div>div[data-open=false]]:hidden',

            // nav > div > div > a
            // '[&>div>div>a]:text-sm [&>div>div>a]:flex [&>div>div>a]:items-center [&>div>div>a]:px-4 [&>div>div>a]:h-16 [&>div>div]:w-full',

            // nav > div > div > a
            '[&>div>div>a]:text-sm [&>div>div>a]:block [&>div>div>a]:h-16 [&>div>div>a]:text-white [&>div>div>a]:w-full [&>div>div>a]:relative [&>div>div>a]:items-center [&>div>div>a]:flex-wrap [&>div>div>a]:space-x-2 [&>div>div>a]:px-4 [&>div>div>a]:bg-default-dark hover:[&>div>div>a]:bg-neutral-100 hover:[&>div>div>a]:text-black', // nav > a

            // nav > div > div > a > span
            '[&>div>div>a>span]:h-16 [&>div>div>a>span]:flex [&>div>div>a>span]:space-x-1 [&>div>div>a>span]:items-center' // nav > a > span
          )}
        >
          <Nav.Link href="/dashboard">
            <span>
              <Gauge />
              <span>Dashboard</span>
            </span>
          </Nav.Link>
          <Nav.Link href="/clinics">
            <span>
              <BriefcaseMedical />
              <span>Clinicas</span>
            </span>
          </Nav.Link>
          <Nav.LinkDropDown data-href="/operational-capacity">
            <Nav.Link href="/operational-capacity">
              <span>
                <Boxes className="w-6 h-6" />
                <span>Capacidade Operacional</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>
        </nav>
      </div>
      <section className="flex-1 p-4">
        <div
          className={cn(
            'h-16 sticky top-0 left-0 shadow-lg p-4 -mt-4 -mx-4 justify-between flex border-neutral-900 bg-neutral-800',
            'border-default bg-default z-50'
          )}
        >
          <section></section>
          <section>
            <LogOut />
          </section>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg mt-6">{children}</div>
      </section>
    </main>
  )
}
