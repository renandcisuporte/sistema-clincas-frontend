import { loadProduct } from "@/app/_actions/products"
import { loadServicesInProducts } from "@/app/_actions/services-in-products"
import { InputLabel } from "@/app/_components/common/input"
import { Button, buttonVariants } from "@/app/_components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { cn, maskPrice } from "@/app/_lib/utils"
import { SearchParamsProps } from "@/app/_types/common"
import { Product } from "@/app/_types/products"
import { ServiceInProduct } from "@/app/_types/services-in-products"
import { Edit, Save, Search, Trash, Undo } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { ModalForm, TableListing } from "./page-client"

export const metadata: Metadata = {
  title: "Lista de Serviços - Clinicas",
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export default async function Page({
  params,
  searchParams,
}: SearchParamsProps) {
  const { modal, id, productName } = searchParams
  const { data } = await loadServicesInProducts(`${params?.serviceId}`)

  let products: ({ serviceId: string } & Product)[] = []
  if (productName) {
    const { data } = await loadProduct({ name: productName, limit: 50 })
    data?.map((item) =>
      products.push({ ...item, serviceId: String(params?.serviceId) }),
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">
        Procedimentos/Produtos{" "}
        <span className="text-sm font-normal text-gray-400">
          {data?.[0]?.serviceName}
        </span>
      </h1>
      <form className="flex flex-row flex-wrap space-x-4">
        <InputLabel
          classHelper="flex-1"
          type="text"
          name="productName"
          placeholder="Pesquisar produtos"
        />

        <Button type="submit" size="sm">
          <Search className="mr-1 w-4" />
          Pesquisar
        </Button>

        <Link
          href={{ pathname: "/services" }}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Undo className="mr-1 w-4" />
          Voltar
        </Link>

        {products.length > 0 && (
          <Button
            type="submit"
            form="form-add-product"
            className={cn(buttonVariants({ variant: "orange", size: "sm" }))}
          >
            <Save className="mr-1 w-4" />
            Adicionar
          </Button>
        )}
      </form>

      {products.length > 0 && <TableListing products={products} />}

      {!products.length && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span>Produto</span>
                <span className="ml-2 text-xs font-normal">
                  Total de cadastros: ({data?.length})
                </span>
              </TableHead>
              <TableHead className="text-center">Vl.Produto</TableHead>
              <TableHead className="text-center">QTDE (ml/unid)</TableHead>
              <TableHead className="text-center">Redimento</TableHead>
              <TableHead className="text-center">Vl.Aplicação</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: ServiceInProduct) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {maskPrice(item.productPrice)}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {item.productQuantity}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {item.rental}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {maskPrice(item.rentalPrice)}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <Link
                    href={{ query: { id: item.id, modal: "true" } }}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    <Edit className="mr-1 w-4" />
                    Editar
                  </Link>

                  <Link
                    href={{ query: { id: item.id, modal: "delete" } }}
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
        </Table>
      )}

      <ModalForm
        open={modal === "true"}
        data={data?.find((item) => item.id === id)}
      />

      {/* <ModalDelete
        open={modal === "delete"}
        data={data?.find((item) => item.id === id)}
      /> */}
    </div>
  )
}
