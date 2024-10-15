'use client'

import { saveWorkTime } from '@/app/actions/work-times'
import { ButtonSubmit } from '@/app/components/common/button-submit'
import { InputLabel } from '@/app/components/common/input'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import * as Dialog from '@/app/components/ui/dialog'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { weeks } from '@/app/contants'
import { useToast } from '@/app/hooks/use-toast'
import { Hours, WorkTime } from '@/app/types/work-times'
import { Ban, Minus, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalWorkTimesInterface {
  open: boolean
  input?: WorkTime[]
}

export function ModalWorkTimes({ open, input }: ModalWorkTimesInterface) {
  const { back } = useRouter()
  const { toast } = useToast()
  const [items, setItems] = useState<WorkTime[]>([])
  const params = useSearchParams()

  const [state, formAction] = useFormState(saveWorkTime, {})

  const handleAdd = useCallback(
    (args: WorkTime, index: number) => {
      const time: any = []
      const { times, open, week } = args
      const item = [...items]
      time.push({ description: times[0].description, time: times[0].time })
      time.push({ description: times[1].description, time: times[1].time })

      item[index] = { week, open, times: [...times, ...time] }
      setItems(item)
    },
    [items]
  )

  const handleRemove = useCallback(
    (index: number) => {
      const item = [...items]
      item[index].times.splice(0, 2)
      setItems([...item])
    },
    [items]
  )

  function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(':')
    return parseInt(hours) * 60 + parseInt(minutes)
  }

  const calculateTotalHours = useCallback(
    (times: Hours[], open: boolean): number => {
      if (open) return 0

      let openMinute = 0
      let closedMinute = 0
      let totalMinutes = 0
      times.forEach(({ description, time }: any) => {
        if (description === 'Abre à(s)') openMinute = timeToMinutes(time)
        if (description === 'Fecha à(s)') closedMinute = timeToMinutes(time)
        if (openMinute && closedMinute) {
          totalMinutes += closedMinute - openMinute
        }
      })

      // Converte o total de minutos em horas
      return totalMinutes / 60
    },
    []
  )

  useEffect(() => {
    if (!state?.errorMessage) return

    if (state?.errorMessage !== 'OK') {
      toast({ title: 'Atenção!', description: state?.errorMessage })
      return
    }
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    back()
  }, [state, back, toast])

  useEffect(() => {
    // Se weeks estiver definido, atualiza items para weeks
    if (weeks) setItems(weeks)

    if (input?.length) {
      const updatedItems = input.reduce(
        (acc, { open, times, week }) => {
          const key = acc.findIndex((item) => item.week === week)

          if (key !== -1) {
            // Atualiza o item existente
            acc[key] = { ...acc[key], open, times }
          } else {
            // Adiciona novo item
            acc.push({ week, open, times })
          }

          return acc
        },
        [...items]
      )
      // Atualiza o estado uma única vez
      setItems(updatedItems)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, weeks])

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="max-w-xl h-full max-h-[96%] !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form action={formAction} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Horário de Funcionamento</Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <input
              type="hidden"
              name="clinicId"
              defaultValue={params.get('id')!}
            />
            {items.map(({ week, open, times }, i) => (
              <div key={week}>
                <input
                  type="hidden"
                  name={`week[${i}][week]`}
                  defaultValue={week}
                />

                <h4 className="flex items-center space-x-2 justify-between">
                  <span className="font-semibold flex items-center space-x-2">
                    <span>{week}</span>
                    <Plus
                      className="w-4 cursor-pointer"
                      onClick={() => handleAdd({ week, open, times }, i)}
                    />
                  </span>
                  <small>
                    Total de horas: {calculateTotalHours(times, open)}
                  </small>
                </h4>
                <div className="flex space-x-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      name={`week[${i}][open]`}
                      checked={open}
                      value={'true'}
                      onClick={() => {
                        const item = [...items]
                        item[i].open = !item[i].open
                        setItems(item)
                      }}
                    />
                    <label
                      htmlFor="terms2"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fechado
                    </label>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap border-b border-b-neutral-300">
                  {times.map(({ description, time }, ii) => (
                    <div
                      key={ii}
                      className="flex flex-row flex-wrap w-1/2 space-x-4 p-2"
                    >
                      <input
                        type="hidden"
                        name={`week[${i}][times][${ii}][description]`}
                        defaultValue={description}
                      />

                      <InputLabel
                        label={description}
                        className="flex-1"
                        input={{
                          type: 'time',
                          defaultValue: time,
                          name: `week[${i}][times][${ii}][time]`,
                          onChange: (e) => {
                            const item = [...items]
                            item[i].times[ii].description = description
                            item[i].times[ii].time = e.target.value
                            setItems(item)
                          }
                        }}
                      />

                      {ii % 2 && ii > 1 ? (
                        <Minus
                          className="w-4 mt-7"
                          onClick={() => handleRemove(i)}
                        />
                      ) : (
                        <span className="w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Dialog.DialogClose asChild>
              <Button variant="ghost" type="button">
                <Ban className="w-4 mr-1" />
                Cancela
              </Button>
            </Dialog.DialogClose>
            <ButtonSubmit />
          </form>
        </ScrollArea>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
