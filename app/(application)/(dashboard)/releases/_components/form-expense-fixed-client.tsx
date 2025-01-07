"use client"

import { ButtonSubmit } from "@/app/_components/common/button-submit"
import { Input } from "@/app/_components/ui/input"
import * as Table from "@/app/_components/ui/table"
import { mockMonths, month } from "@/app/_contants"
import { cn, maskPrice } from "@/app/_lib/utils"
import { Fragment } from "react"
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

export function FormExpenseFixedClient({
  expenses,
  realeses,
}: {
  expenses: Expenses[]
  realeses: Realeses[]
}) {
  const { pending } = useFormStatus()
  const [_, formAction] = useFormState(actionRelease, {})

  if (pending)
    return (
      <div className="flex justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    )

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
                  let priceValue: string = "0,00"
                  let priceValueBool = false
                  const monthAtualy = month === index

                  const realese = realeses?.[_id]?.[date]
                  if (realese && +realese.price > 0) {
                    priceValueBool = true
                    priceValue = maskPrice(`${+realese.price}`)
                  }

                  return (
                    <Table.TableCell
                      key={`${_id}_${id}`}
                      className={cn(
                        "p-2 data-[atualy='true']:!bg-orange-200 [&>input]:data-[atualy='true']:!border-orange-600 [&>input]:data-[atualy='true']:!bg-transparent [&>input]:data-[atualy='true']:!text-orange-600 [&>input]:data-[atualy='true']:placeholder:!text-orange-600",
                      )}
                      data-atualy={`${monthAtualy}`}
                    >
                      <Input
                        id={id}
                        type="tel"
                        placeholder="0,00"
                        className="min-w-20 text-right"
                        name={`expenses[${_id}][${date}][price]`}
                        disabled={priceValueBool}
                        defaultValue={priceValue}
                        onFocus={(e) => {
                          e.currentTarget.value = ""
                        }}
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
    </form>
  )
}
