import { loadClinics } from '@/app/_actions/clinics'
import { InputLabel } from '@/app/_components/common/input'
import { Button, buttonVariants } from '@/app/_components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import { cn } from '@/app/_lib/utils'
import { SearchParamsProps } from '@/app/_types/common'
import { Edit, Save, Search, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ModalDelete } from './_components/modal-delete'

export const metadata: Metadata = {
  title: 'Lista de Clinicas - Clinicas'
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { title, cnpj, limit = 15, page = 1, modal, id } = searchParams

  const clinic = await loadClinics({ title, cnpj, limit, page })

  return (
    <div className="flex flex-col space-y-4">
      {clinic.errorMessage && (
        <div className="p-6 bg-amber-100/50 rounded-lg text-amber-600 font-semibold">
          {clinic.errorMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold">Clinicas</h1>
      <form className="flex flex-row space-x-4 flex-wrap">
        <InputLabel
          label="Clinicas"
          className="flex-1"
          input={{
            type: 'text',
            name: 'title',
            placeholder: 'Pesquisa nome da clinica'
          }}
        />
        <InputLabel
          label="CNPJ"
          className="flex-1"
          input={{
            type: 'text',
            name: 'cnpj',
            placeholder: 'Pesquise pelo CNPJ'
          }}
        />
        <Button type="submit" className="mt-5" size="sm">
          <Search className="w-4 mr-1" />
          Pesquisar
        </Button>
        <Link
          href="/clinics/create"
          className={cn(
            'mt-5',
            buttonVariants({ variant: 'outline', size: 'sm' })
          )}
        >
          <Save className="w-4 mr-1" />
          Cadastrar
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clinica</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Salas</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clinic.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fantasy}</TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                {item.cnpj}
              </TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                0
              </TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                <Link
                  href={`/clinics/${item.id}/update`}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  <Edit className="w-4 mr-1" />
                  Editar
                </Link>

                <Link
                  href={{ query: { id: item.id, modal: 'delete' } }}
                  className={buttonVariants({
                    variant: 'destructive',
                    size: 'sm'
                  })}
                >
                  <Trash className="w-4 mr-1" />
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex flex-row space-x-4 flex-wrap justify-end items-center">
                <span>PAGINAÇÃO:</span>
                <Link
                  href={{
                    query: {
                      page: Number(page) - 1 == 0 ? 1 : Number(page) - 1,
                      limit,
                      title,
                      cnpj
                    }
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Anterior
                </Link>
                <span>{page}</span>
                <Link
                  href={{
                    query: {
                      page:
                        clinic.data?.length === Number(limit)
                          ? Number(page) + 1
                          : page,
                      limit,
                      title,
                      cnpj
                    }
                  }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Próxima
                </Link>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <ModalDelete
        open={modal === 'delete'}
        clinic={clinic.data?.find((item) => item.id === id)}
      />
    </div>
  )
}
