import { LogOut } from '@/app/_components/common/button-others'
import * as Nav from '@/app/_components/common/link'
import { cn } from '@/app/_lib/utils'
import { ChildrenProps } from '@/app/_types/common'
import { authOptions } from '@/auth'
import {
  Clock,
  Equal,
  EqualNot,
  Gauge,
  Hospital,
  Stethoscope,
  TrendingUp,
  User,
  UserPen,
  UsersRound
} from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function RootLayout({ children }: ChildrenProps) {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const { clinicId, user } = session

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
        {/* NAVIGATION */}
        <nav
          className={cn(
            // nav
            'border-transparent divide-y divide-default mt-6 w-full md:max-w-64 md:h-screen flex-1 overscroll-none overflow-y-auto',

            // nav > a
            '[&>a]:block [&>a]:h-16 [&>a]:text-white [&>a]:w-full [&>a]:relative [&>a]:items-center [&>a]:flex-wrap [&>a]:space-x-2 [&>a]:px-4 [&>a]:bg-default-dark hover:[&>a]:bg-neutral-100 hover:[&>a]:text-black',

            // nav > a > span
            '[&>a>span]:h-16 [&>a>span]:flex [&>a>span]:space-x-1 [&>a>span]:items-center',

            // nav > div
            '[&>div]:h-auto [&>div]:cursor-pointer [&>div]:text-white [&>div]:w-full [&>div]:relative [&>div]:items-center [&>div]:flex-col [&>div]:bg-default-dark hover:[&>div]:bg-neutral-100 hover:[&>div]:text-black',

            // nav > div > span
            '[&>div>span]:h-16 [&>div>span]:px-4 [&>div>span]:flex [&>div>span]:space-x-1 [&>div>span]:items-center',

            // nav > div > div
            '[&>div>div]:flex-1 [&>div>div]:-mt-[1px] [&>div>div]:border-l-[1em] [&>div>div]:border-l-default [&>div>div]:cursor-pointer [&>div>div]:min-h-16 [&>div>div]:items-center [&>div>div]:text-white [&>div>div]:w-full [&>div>div]:hidden [&>div>div[data-open=true]]:block',

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

          <Nav.LinkDropDown
            data-href={['/clinics', '/peoples', '/jobs-works', '/rooms']}
            label="Administrativo"
          >
            <Nav.Link href={`/clinics/${clinicId}/update`}>
              <span>
                <Hospital className="w-6 h-6" />
                <span>Dados da Clínica</span>
              </span>
            </Nav.Link>
            <Nav.Link href="/peoples">
              <span>
                <UsersRound className="w-6 h-6" />
                <span>Pessoas</span>
              </span>
            </Nav.Link>

            <Nav.Link href="/jobs-works">
              <span>
                <Clock className="w-6 h-6" />
                <span>Horários de Trabalho</span>
              </span>
            </Nav.Link>

            <Nav.Link href="/rooms">
              <span>
                <Stethoscope className="w-6 h-6" />
                <span>Espaços Terapeutico</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown data-href="#" label="Cadastros">
            <Nav.Link href="#">
              <span>
                <Equal className="w-6 h-6" />
                <span>Despesas Fixas</span>
              </span>
            </Nav.Link>
            <Nav.Link href="#">
              <span>
                <EqualNot className="w-6 h-6" />
                <span>Despesas Variáveis</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>

          <Nav.LinkDropDown data-href="/operational-capacity" label="Gráficos">
            <Nav.Link href="/operational-capacity">
              <span>
                <TrendingUp className="w-6 h-6" />
                <span>Capacidade Operacional</span>
              </span>
            </Nav.Link>
          </Nav.LinkDropDown>
        </nav>
        {/* END NAVIGATION */}
        <Image
          src="/rubrica.png"
          alt=""
          width="170"
          height="50"
          className="mx-auto m-4"
        />
      </div>
      <section className="flex-1 p-4">
        <div
          className={cn(
            'h-16 sticky top-0 left-0 shadow-lg  -mt-4 -mx-4 justify-between flex',
            'border-default bg-default z-50'
          )}
        >
          <aside className="flex-1 px-4"></aside>
          <aside
            className={cn(
              'min-w-36 bg-white h-16 flex space-x-1 flex-wrap items-center relative px-4 cursor-pointer',
              '[&>div]:hidden [&>div]:absolute [&>div]:top-[100%] [&>div]:bg-white [&>div]:w-56 [&>div]:p-4 [&>div]:shadow-lg [&>div]:right-0 [&>div]:flex-col [&>div]:hover:block',
              '[&>div>span]:flex [&>div>span]:space-x-1 [&>div>span]:my-4'
            )}
          >
            <User /> <span>Olá {user?.fullName?.split(' ')[0]}</span>
            <div>
              <span>
                <UserPen /> <span>Meus Dados</span>
              </span>
              <hr className="divide-y-0" />
              <LogOut />
            </div>
          </aside>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg mt-6">{children}</div>
      </section>
    </main>
  )
}
