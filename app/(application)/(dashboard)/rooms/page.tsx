import * as Clinics from '@/app/actions/clinics'
import { Button } from '@/app/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'
import { SearchParamsProps } from '@/app/types/common'
import { Metadata } from 'next'
import Link from 'next/link'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Salas - Clinicas'
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { modal, id } = searchParams
  const clinic = await Clinics.loadClinics()

  return (
    <>
      <h1 className="text-2xl font-bold">Clinicas</h1>
      {clinic.error && <p>{clinic.error}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clinica</TableHead>
            <TableHead>Salas</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clinic.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fantasy}</TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                oi
              </TableCell>
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
                <Button size="sm" variant="destructive" asChild>
                  <Link
                    href={{
                      query: {
                        id: item.id,
                        modal: 'delete'
                      }
                    }}
                  >
                    Excluir
                  </Link>
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
      </Table>

      <ModalForm
        open={modal === 'true'}
        clinic={clinic.data.find((item) => item.id === id)}
      />

      <ModalDelete
        open={modal === 'delete'}
        clinic={clinic.data.find((item) => item.id === id)}
      />
    </>
  )
}
