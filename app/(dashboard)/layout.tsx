import { LogOut } from '@/app/_components/common/button-others'
import { Nav } from '@/app/_components/common/link'
import { ChildrenProps } from '../_types/common'

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <main className="bg-neutral-100 h-svh flex flex-col md:flex-row">
      <nav className="sticky top-0 left-0 h-16 bg-neutral-400 p-4 flex items-center md:min-w-64 md:flex-col md:items-start md:h-full space-y-2">
        <span className="h-16 -mb-6 bg-neutral-500" />
        <Nav href="/dashboard">Dashboard</Nav>
        <Nav href="/clinics">Clinicas</Nav>
        <Nav href="/ouuuu">Clinicas 2</Nav>
      </nav>
      <section className="flex-1 p-4 space-y-6">
        <div className="h-16 border-neutral-300 bg-neutral-500 shadow-lg p-4 -mt-4 -mx-4 justify-between flex">
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
