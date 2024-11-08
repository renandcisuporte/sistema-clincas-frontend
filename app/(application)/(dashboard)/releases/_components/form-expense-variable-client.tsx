"use client"

import { ButtonSubmit } from "@/app/_components/common/button-submit"
import { Input } from "@/app/_components/ui/input"
import { MultiSelect } from "@/app/_components/ui/multi-select"
import * as Table from "@/app/_components/ui/table"
import { mockMonths, month } from "@/app/_contants"
import { cn, maskPrice } from "@/app/_lib/utils"
import { Fragment, useState } from "react"
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

export function FormExpenseVariableClient({
  expenses,
  realeses,
}: {
  expenses: Expenses[]
  realeses: Realeses[]
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [_, formAction] = useFormState(actionRelease, {
    message: "OK",
  })

  console.log(selected)

  return (
    <form action={formAction}>
      <div className="mb-4 flex justify-center space-x-4">
        <MultiSelect
          options={expenses.map((item) => ({
            value: item.id,
            label: item.description,
          }))}
          onValueChange={(value) => setSelected(value)}
          defaultValue={selected}
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
            Selecione um tipo de lançamento, e gerencie os gastos menal
          </small>
        </div>
      )}
      {selected.length > 0 && (
        <Table.TableNotFlow className="block">
          <Table.TableHeader className="sticky top-16 z-[1] font-bold">
            <Table.TableRow>
              {mockMonths.map(({ id, month: asMonth }: any, index) => {
                const monthAtualy = month === index
                return (
                  <Table.TableHead
                    key={id}
                    className={cn(
                      "bg-default p-2 text-center text-white data-[atualy='true']:!bg-default/40 data-[atualy='true']:!text-default",
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
              .filter((item) => selected.includes(item.id))
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
                      let priceValue: string = "0,00"
                      let priceValueBool = false
                      const monthAtualy = month === index

                      const realese = realeses?.[_id]?.[date]
                      if (realese && +realese.price > 0) {
                        priceValueBool = true
                        priceValue = maskPrice(`${+realese.price * 100}`)
                      }

                      return (
                        <Table.TableCell
                          key={`${_id}_${id}`}
                          className={cn(
                            "p-2 data-[atualy='true']:!bg-default/10 [&>input]:data-[atualy='true']:!border-default [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-default [&>input]:data-[atualy='true']:placeholder:!text-default",
                          )}
                          data-atualy={`${monthAtualy}`}
                        >
                          <Input
                            id={id}
                            type="tel"
                            placeholder="0,00"
                            className="min-w-20 text-right"
                            name={`expenses[${_id}][${date}][price]`}
                            // readOnly={priceValueBool}
                            disabled={priceValueBool}
                            defaultValue={priceValue}
                            onChange={(e) => {
                              e.currentTarget.value = maskPrice(
                                e.currentTarget.value,
                              )
                            }}
                          />
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
