"use client"

import { ButtonSubmit } from "@/app/_components/common/button-submit"
import { InputLabel } from "@/app/_components/common/input"
import { buttonVariants } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import { Input } from "@/app/_components/ui/input"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table"
import { useToast } from "@/app/_hooks/use-toast"
import { maskPrice } from "@/app/_lib/utils"
import { Product } from "@/app/_types/products"
import { ServiceInProduct } from "@/app/_types/services-in-products"
import { CircleX, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
} from "react-dom"
import { saveServiceInProduct } from "./action"

export interface ModalFormInterface {
  open: boolean
  data?: ServiceInProduct
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const [sum, setSum] = useState({} as any)
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveServiceInProduct, {})
  const { errors } = state

  const resolveSum = useCallback(
    (id: string, price: any, quantity: any) => {
      price = +price
      quantity = +quantity
      let rental = price / quantity
      if (quantity <= 0) rental = 0

      setSum((prev: any) => ({ ...prev, [`${id}`]: rental.toFixed(2) }))
    },
    [setSum],
  )

  useEffect(() => {
    if (state?.errorMessage !== "OK") return
    toast({ title: "Atenção!", description: "Salvo com sucesso!" })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-auto !p-0 sm:max-w-lg [&>button]:hidden"
        onEscapeKeyDown={() => back()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <ScrollArea className="h-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Editar/Cadastrar</DialogTitle>
              <DialogDescription>
                Você pode editar ou cadastrar serviço/produtos no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <Input
                type="hidden"
                name={`services[0][serviceId]`}
                defaultValue={data?.serviceId}
              />
              <Input
                type="hidden"
                name={`services[0][productId]`}
                defaultValue={data?.productId}
              />

              <InputLabel
                label="Redimento *"
                message={errors?.rental}
                type="text"
                name="services[0][rental]"
                classHelper="md:basis-24"
                defaultValue={data?.rental}
                onChange={(e) =>
                  resolveSum(
                    `${data?.id}`,
                    data?.productPrice,
                    e.currentTarget.value,
                  )
                }
              />

              <InputLabel
                readOnly
                label="Vl. Aplicação"
                classHelper="md:basis-32 ml-6"
                type="text"
                name="services[0][rentalPrice]"
                value={`${maskPrice(sum[`${data?.id}`] || data?.rentalPrice || 0)}`}
              />

              <div className="w-full text-center">
                <ButtonSubmit />
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function TableListing({
  products,
}: {
  products: ({ serviceId: string } & Product)[]
}) {
  const [sum, setSum] = useState<{ [x: string]: number }>({})
  const [handleInput, setHandleInput] = useState<{ [x: string]: boolean }>({})

  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveServiceInProduct, {})

  const resolveSum = useCallback(
    (id: string, price: any, quantity: any) => {
      price = +price
      quantity = +quantity
      let rental = price / quantity
      if (quantity <= 0) rental = 0

      setSum((prev: any) => ({ ...prev, [`${id}`]: rental.toFixed(2) }))
    },
    [setSum],
  )

  useEffect(() => {
    if (state?.errorMessage !== "OK") return
    toast({ title: "Atenção!", description: "Salvo com sucesso!" })
    back()
  }, [state, back, toast])

  return (
    <form action={formAction} id="form-add-product" method="POST">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>
              <span>Produto</span>
              <span className="ml-2 text-xs font-normal">
                Total de cadastros: ({products?.length})
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
          {products?.map((item, key) => {
            const checked = !handleInput[`${item.id}`]
            return (
              <TableRow key={item.id}>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <Input
                    type="hidden"
                    name={`services[${key}][serviceId]`}
                    value={item.serviceId}
                  />
                  <Input
                    type="checkbox"
                    name={`services[${key}][productId]`}
                    value={item.id}
                    onChange={(e) => {
                      let checked = e.currentTarget.checked

                      setHandleInput({
                        ...handleInput,
                        [`${item.id}`]: checked,
                      })
                    }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {maskPrice(item.price)}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  {item.quantity}
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <InputLabel
                    type="number"
                    disabled={checked}
                    defaultValue={0}
                    name={`services[${key}][rental]`}
                    onKeyUp={(e) =>
                      resolveSum(
                        `${item.id}`,
                        item.price,
                        e.currentTarget.value,
                      )
                    }
                  />
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <InputLabel
                    disabled={checked}
                    defaultValue={maskPrice(sum[`${item.id}`] || 0)}
                    name={`services[${key}][rentalPrice]`}
                    readOnly
                  />
                </TableCell>
                <TableCell className="w-[1%] space-x-1 whitespace-nowrap text-center">
                  <Link
                    href={{
                      pathname: "/products",
                      query: { id: item.id, modal: "true" },
                    }}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    <Edit className="mr-1 w-4" />
                    Editar
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </form>
  )
}
