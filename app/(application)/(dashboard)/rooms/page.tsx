import { loadRooms } from '@/app/_actions/rooms'
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
import { SwitchRoom } from './_components/switch-room'
import { ModalDelete, ModalForm } from './page-client'

export const metadata: Metadata = {
  title: 'Lista de Salas - Clinicas'
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { room, limit = 15, page = 1, modal, id } = searchParams

  const result = await loadRooms({ room, limit, page })
  const { data, total, active, inative } = result

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
          classHelper="flex-1"
          type="text"
          name="room"
          placeholder="Pesquisar salas"
        />

        <Button type="submit" size="sm">
          <Search className="w-4 mr-1" />
          Pesquisar
        </Button>
        <Link
          href={{ query: { modal: 'true' } }}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          <Save className="w-4 mr-1" />
          Cadastrar
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Salas</span>
              <span className="ml-2 text-xs font-normal">
                Total de salas: ({total})
              </span>
              <span className="ml-2 text-xs font-normal">
                Ativas: ({active})
              </span>
              <span className="ml-2 text-xs font-normal">
                Inativas: ({inative})
              </span>
            </TableHead>
            <TableHead>Ativo/Inativo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.room}</TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                <SwitchRoom active={item.active === true} id={item.id!} />
              </TableCell>
              <TableCell className="whitespace-nowrap w-[1%] text-center space-x-1">
                <Link
                  href={{ query: { id: item.id, modal: 'true' } }}
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
            <TableCell colSpan={3}>
              <div className="flex flex-row space-x-4 flex-wrap justify-end items-center">
                <span>PAGINAÇÃO:</span>
                <Link
                  href={{
                    query: {
                      page: Number(page) - 1 === 0 ? 1 : Number(page) - 1,
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
                          : Number(page),
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
