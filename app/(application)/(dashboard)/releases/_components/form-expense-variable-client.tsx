"use client"

import { ButtonSubmit } from "@/app/_components/common/button-submit"
import * as CtxMenu from "@/app/_components/ui/context-menu"
import { Input } from "@/app/_components/ui/input"
import { MultiSelect } from "@/app/_components/ui/multi-select"
import * as Table from "@/app/_components/ui/table"
import { mockMonths, month } from "@/app/_contants"
import { cn, maskPrice } from "@/app/_lib/utils"
import { Edit } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
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
  selected: boolean
  priceValue: string
}

export function FormExpenseVariableClient({
  expenses,
  realeses,
}: {
  expenses: Expenses[]
  realeses: Realeses[]
}) {
  const [selected, setSelected] = useState<{
    [key: string]: Selected
  }>({})

  const [selectedInput, setSelectedInput] = useState<string[]>([])

  const [_, formAction] = useFormState(actionRelease, {
    message: "OK",
  })

  useEffect(() => {
    // Inicializar um objeto intermediário para acumular os valores de selected
    const updatedSelection: { [key: string]: Selected } = {}

    // Iterar pelos arrays e preencher o objeto intermediário
    expenses
      .filter((item) => selectedInput.includes(item.id))
      .forEach(({ id: _id }: any) => {
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
  }, [expenses, realeses, selectedInput])

  return (
    <form action={formAction}>
      <div className="mb-4 flex justify-center space-x-4">
        <MultiSelect
          options={expenses.map((item) => ({
            value: item.id,
            label: item.description,
          }))}
          onValueChange={(value) => setSelectedInput(value)}
          defaultValue={selectedInput}
          placeholder="Selecione um tipo de gasto"
          variant="inverted"
          maxCount={5}
        />

        <ButtonSubmit />
      </div>
      {!selected.length && (
        <div className="text-center">
          <h3 className="text-xl">Nenhum lançamento feito!</h3>
          <small>
            Selecione um tipo de lançamento, e gerencie os gastos mensal
          </small>
        </div>
      )}
      {selectedInput.length > 0 && (
        <Table.TableNotFlow className="block">
          <Table.TableHeader className="sticky top-16 z-[1] font-bold">
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
            {expenses
              .filter((item) => selectedInput.includes(item.id))
              .map(({ id: _id, description }: any) => (
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
                          className={cn(
                            "p-2 data-[atualy='true']:!bg-orange-200 [&>input]:data-[atualy='true']:!border-orange-600 [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-orange-600 [&>input]:data-[atualy='true']:placeholder:!text-orange-600",
                          )}
                          data-atualy={`${monthAtualy}`}
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
                                            priceValue:
                                              selected[key].priceValue,
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
      )}
    </form>
  )
}
