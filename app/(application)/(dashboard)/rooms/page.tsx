import { loadRooms } from '@/app/actions/rooms'
import { InputLabel } from '@/app/components/common/input'
import { Button, buttonVariants } from '@/app/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'
import { cn } from '@/app/lib/utils'
import { SearchParamsProps } from '@/app/types/common'
import { Metadata } from 'next'
import Link from 'next/link'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Salas - Clinicas'
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { room, limit = 15, page = 1, modal, id } = searchParams

  const result = await loadRooms({ room, limit, page })
  const { data, total } = result

  return (
    <div className="flex flex-col space-y-4">
      {result.errorMessage && (
        <div className="p-6 bg-amber-100/50 rounded-lg text-amber-600 font-semibold">
          {result.errorMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold">Salas</h1>
      <form className="flex flex-row space-x-4 flex-wrap">
        <InputLabel
          label="Salas"
          className="flex-1"
          input={{
            type: 'text',
            name: 'title',
            placeholder: 'Pesquisa nome da clinica'
          }}
        />

        <Button type="submit" className="mt-5" size="sm">
          Pesquisar
        </Button>
        <Link
          href={{ query: { modal: 'true' } }}
          className={cn(
            'mt-5',
            buttonVariants({ variant: 'outline', size: 'sm' })
          )}
        >
          Cadastrar
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Salas</TableHead>
            <TableHead>Clinica</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.room}</TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                oi
              </TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                <Link
                  href={{ query: { id: item.id, modal: true } }}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  Editar
                </Link>

                <Link
                  href={{ query: { id: item.id, modal: 'delete' } }}
                  className={buttonVariants({
                    variant: 'destructive',
                    size: 'sm'
                  })}
                >
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <div className="flex flex-row space-x-4 flex-wrap justify-end items-center">
                <span>PÁGINAÇÃO:</span>
                <Link
                  href={{
                    query: {
                      page: Number(page) - 1 == 0 ? 1 : Number(page) - 1,
                      limit,
                      room
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
                        data?.length === Number(limit)
                          ? Number(page) + 1
                          : page,
                      limit,
                      room
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

      <ModalForm
        open={modal === 'true'}
        data={data?.find((item) => item.id === id)}
      />

      <ModalDelete
        open={modal === 'delete'}
        data={data?.find((item) => item.id === id)}
      />
    </div>
  )
}
