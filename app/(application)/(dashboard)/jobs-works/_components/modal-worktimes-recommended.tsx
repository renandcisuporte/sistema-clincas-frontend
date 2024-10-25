'use client'

import { saveWorkTimeRecommended } from '@/app/_actions/work-times'
import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { InputLabel } from '@/app/_components/common/input'
import { Button } from '@/app/_components/ui/button'
import { Checkbox } from '@/app/_components/ui/checkbox'
import * as Dialog from '@/app/_components/ui/dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { weeks } from '@/app/_contants'
import { useToast } from '@/app/_hooks/use-toast'
import {
  useHandleAdd,
  useHandleCalculateTotalHours,
  useHandleRemove
} from '@/app/_hooks/use-work-times'
import { WorkTime } from '@/app/_types/work-times'
import { Ban, Minus, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalWorkTimesRecommendedInterface {
  open: boolean
  input?: WorkTime[]
}

export function ModalWorkTimesRecommended({
  open,
  input
}: ModalWorkTimesRecommendedInterface) {
  const { back } = useRouter()
  const { toast } = useToast()
  const [items, setItems] = useState<WorkTime[]>([])
  const params = useSearchParams()

  const [state, formAction] = useFormState(saveWorkTimeRecommended, {})

  const handleAdd = useHandleAdd(items, setItems)

  const handleRemove = useHandleRemove(items, setItems)

  const calculateTotalHours = useHandleCalculateTotalHours()

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
    if (weeks.length > 0) setItems(weeks)

    if (input && input.length > 0) {
      const itemUpdate = [...input]

      weeks.map((item) => {
        const { open, times, week } = item
        const key = itemUpdate.findIndex((item) => item.week === week)
        if (key !== -1) itemUpdate[key] = { ...itemUpdate[key] }
        else itemUpdate.push({ week, open, times })
      })
      setItems(itemUpdate)
    }
  }, [input])

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="max-w-xl h-full max-h-[96%] !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form action={formAction} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Horário de Recomendado</Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <input
              name="id"
              type="hidden"
              defaultValue={params.get('clinicId')!}
            />
            {items.map(({ week, open, times }, i) => (
              <div key={week}>
                <input
                  type="hidden"
                  name={`[${i}][clinicId]`}
                  defaultValue={params.get('clinicId')!}
                />
                <input
                  type="hidden"
                  name={`[${i}][week]`}
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
                  <small className="font-bold text-default">
                    Total de horas: {calculateTotalHours(times, !open)}h
                  </small>
                </h4>
                <div className="flex space-x-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="hidden"
                      name={`[${i}][open]`}
                      defaultValue={open ? 'true' : 'false'}
                    />
                    <Checkbox
                      defaultChecked={!open}
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
                  {times?.map(({ description, time }, ii) => (
                    <div
                      key={ii}
                      className="flex flex-row flex-wrap w-1/2 space-x-4 p-2"
                    >
                      <input
                        type="hidden"
                        name={`[${i}][times][${ii}][description]`}
                        defaultValue={description}
                      />

                      <InputLabel
                        label={description}
                        className="flex-1"
                        input={{
                          type: 'time',
                          defaultValue: time,
                          name: `[${i}][times][${ii}][time]`,
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
                Cancelar
              </Button>
            </Dialog.DialogClose>
            <ButtonSubmit />
          </form>
        </ScrollArea>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
