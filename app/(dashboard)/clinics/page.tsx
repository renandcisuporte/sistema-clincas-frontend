import { Button } from '@/app/_components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import { apiFecth, ApiFecthResponse } from '@/app/_lib/api'
import { Clinic } from '@/app/_types/clinics'
import { SearchParamsProps } from '@/app/_types/common'
import { authOptions } from '@/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { DialogPageClient } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Clinicas - Clinicas'
}

const loadClinics = async (): Promise<ApiFecthResponse<Clinic[]>> => {
  const session = await getServerSession(authOptions)

  return await apiFecth(`/clinics`, {
    accessToken: session?.accessToken,
    next: { tags: ['clincics'] },
    cache: 'force-cache'
  })
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { modal } = searchParams
  const clinic = await loadClinics()

  return (
    <>
      <h1 className="text-2xl font-bold">Clinicas</h1>
      {clinic.error && <p>{clinic.error}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clinica</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Salas</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clinic.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="whitespace-nowrap w-[1%]">
                {item.fantasy}
              </TableCell>
              <TableCell>{item.phones as any}</TableCell>
              <TableCell>oi</TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                <Button size="sm" asChild>
                  <Link
                    href={{
                      query: {
                        id: item.id,
                        modal: true
                      }
                    }}
                  >
                    Editar
                  </Link>
                </Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Paginação</TableCell>
          </TableRow>
        </TableFooter> */}
        {modal && <DialogPageClient open={true} />}
      </Table>
    </>
  )
}
