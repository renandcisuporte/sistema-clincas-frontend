import { loadServices } from "@/app/_actions/services"
import { InputLabel } from "@/app/_components/common/input"
import { Button, buttonVariants } from "@/app/_components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { cn } from "@/app/_lib/utils"
import { SearchParamsProps } from "@/app/_types/common"
import { Edit, PackageSearch, Save, Search, Trash } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { ModalDelete, ModalForm } from "./page-client"

export const metadata: Metadata = {
  title: "Lista de Procedimentos - Clinicas",
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { name = "", limit = 15, page = 1, modal, id } = searchParams

  const result = await loadServices({ name, limit, page })
  const { data, total } = result

  return (
    <div className="flex flex-col space-y-4">
      {result.errorMessage && (
        <div className="rounded-lg bg-amber-100/50 p-6 font-semibold text-amber-600">
          {result.errorMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold">Procedimentos</h1>
      <form className="flex flex-row flex-wrap space-x-4" method="GET">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="name"
          placeholder="Pesquisar procedimentos..."
        />

        <Button type="submit" size="sm">
          <Search className="mr-1 w-4" />
          Pesquisar
        </Button>
        <Link
          href={{ query: { modal: "true" } }}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Save className="mr-1 w-4" />
          Cadastrar
        </Link>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Procedimentos</span>
              <span className="ml-2 text-xs font-normal">
                Total de cadastros: ({total})
              </span>
            </TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                <Link
                  href={{
                    pathname: `/services/${item.id}`,
                    query: { name, limit, page },
                  }}
                  className={buttonVariants({
                    variant: "default-10",
                    size: "sm",
                  })}
                >
                  <PackageSearch className="mr-1 w-4" />
                  Produtos ({item.total || 0})
                </Link>

                <Link
                  href={{
                    query: { id: item.id, modal: "true", name, limit, page },
                  }}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <Edit className="mr-1 w-4" />
                  Editar
                </Link>

                <Link
                  href={{
                    query: { id: item.id, modal: "delete", name, limit, page },
                  }}
                  className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                  })}
                >
                  <Trash className="mr-1 w-4" />
                  Excluir
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <div className="flex flex-row flex-wrap items-center justify-end space-x-4">
                <span>PAGINAÇÃO:</span>
                <Link
                  href={{
                    query: {
                      name,
                      limit,
                      page: Number(page) - 1 === 0 ? 1 : Number(page) - 1,
                    },
                  }}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Anterior
                </Link>
                <span>{page}</span>
                <Link
                  href={{
                    query: {
                      name,
                      limit,
                      page:
                        data?.length === Number(limit)
                          ? Number(page) + 1
                          : Number(page),
                    },
                  }}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Próxima
                </Link>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <ModalForm
        open={modal === "true"}
        data={data?.find((item) => item.id === id)}
      />

      <ModalDelete
        open={modal === "delete"}
        data={data?.find((item) => item.id === id)}
      />
    </div>
  )
}
