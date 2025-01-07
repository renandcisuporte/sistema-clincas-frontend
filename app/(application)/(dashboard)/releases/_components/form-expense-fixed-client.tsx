"use client"

import { ButtonSubmit } from "@/app/_components/common/button-submit"
import * as CtxMenu from "@/app/_components/ui/context-menu"
import { Input } from "@/app/_components/ui/input"
import * as Table from "@/app/_components/ui/table"
import { mockMonths, month } from "@/app/_contants"
import { cn, maskPrice } from "@/app/_lib/utils"
import { Edit } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
  // @ts-ignore
  experimental_useFormStatus as useFormStatus,
} from "react-dom"
import { actionRelease } from "../[expenses]/action"

type Expenses = {
  id: string
  description: string
}

type Realeses = {
  [expenseId: string]: {
    [date: string]: { price: number }
  }
}

type Selected = {
  [key: string]: {
    selected: boolean
    priceValue: string
  }
}

export function FormExpenseFixedClient({
  expenses,
  realeses,
}: {
  expenses: Expenses[]
  realeses: Realeses[]
}) {
  const [selected, setSelected] = useState<Selected>({})

  const { pending } = useFormStatus()
  const [_, formAction] = useFormState(actionRelease, {})

  useEffect(() => {
    // Inicializar um objeto intermediário para acumular os valores de selected
    const updatedSelection: Selected = {}

    // Iterar pelos arrays e preencher o objeto intermediário
    expenses.forEach(({ id: _id }: any) => {
      mockMonths.forEach(({ id, date }: any) => {
        const key = `${_id}_${id}`
        const realese = realeses?.[_id]?.[date]
        const isTrue = realese && +realese.price > 0
        updatedSelection[key] = {
          selected: isTrue,
          priceValue: maskPrice(`${+realese.price}`),
        }
      })
    })

    // Atualizar o estado uma única vez com os valores acumulados
    setSelected(updatedSelection)
  }, [expenses, realeses])

  return (
    <form action={formAction}>
      <div className="mb-4 flex justify-center">
        <ButtonSubmit />
      </div>

      <Table.TableNotFlow className={cn(pending && "opacity-50")}>
        <Table.TableHeader className="sticky top-16 z-[100] font-bold">
          <Table.TableRow>
            {mockMonths.map(({ id, month: asMonth }: any, index) => {
              const monthAtualy = month === index
              return (
                <Table.TableHead
                  key={id}
                  className={cn(
                    "bg-default p-2 text-center uppercase text-white data-[atualy='true']:!bg-orange-200 data-[atualy='true']:!text-orange-600",
                  )}
                  data-atualy={`${monthAtualy}`}
                >
                  {asMonth}
                </Table.TableHead>
              )
            })}
          </Table.TableRow>
        </Table.TableHeader>
        <Table.TableBody>
          {expenses.map(({ id: _id, description }: any) => (
            <Fragment key={_id}>
              <Table.TableRow className="odd:bg-default/30 odd:text-default">
                <Table.TableCell
                  colSpan={12}
                  className="py-2 font-bold"
                  style={{ letterSpacing: "2px" }}
                >
                  {description}
                </Table.TableCell>
              </Table.TableRow>
              <Table.TableRow>
                {mockMonths.map(({ id, date }: any, index) => {
                  const key = `${_id}_${id}`
                  const monthAtualy = month === index

                  return (
                    <Table.TableCell
                      key={key}
                      data-atualy={`${monthAtualy}`}
                      className={cn(
                        "p-2 data-[atualy='true']:!bg-orange-200 [&>input]:data-[atualy='true']:!border-orange-600 [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-orange-600 [&>input]:data-[atualy='true']:placeholder:!text-orange-600",
                      )}
                    >
                      {selected && selected[key]?.selected ? (
                        <CtxMenu.ContextMenu>
                          <CtxMenu.ContextMenuTrigger className="flex h-[40px] w-24 items-center justify-end rounded-md border border-dashed p-3 text-sm">
                            {selected[key].priceValue}
                          </CtxMenu.ContextMenuTrigger>
                          <CtxMenu.ContextMenuContent className="w-14">
                            <CtxMenu.ContextMenuItem inset>
                              Editar
                              <CtxMenu.ContextMenuShortcut>
                                <Edit
                                  className="h-4 w-4 cursor-pointer"
                                  onClick={() =>
                                    setSelected((old) => ({
                                      ...old,
                                      [key]: {
                                        selected: false,
                                        priceValue: selected[key].priceValue,
                                      },
                                    }))
                                  }
                                />
                              </CtxMenu.ContextMenuShortcut>
                            </CtxMenu.ContextMenuItem>
                          </CtxMenu.ContextMenuContent>
                        </CtxMenu.ContextMenu>
                      ) : (
                        <Input
                          id={id}
                          type="tel"
                          placeholder="0,00"
                          className="min-w-20 text-right"
                          style={{ direction: "rtl" }}
                          name={`expenses[${_id}][${date}][price]`}
                          defaultValue={selected[key]?.priceValue}
                          onChange={(e) => {
                            e.currentTarget.value = maskPrice(
                              e.currentTarget.value,
                            )
                          }}
                        />
                      )}
                    </Table.TableCell>
                  )
                })}
              </Table.TableRow>
            </Fragment>
          ))}
        </Table.TableBody>
      </Table.TableNotFlow>
    </form>
  )
}
