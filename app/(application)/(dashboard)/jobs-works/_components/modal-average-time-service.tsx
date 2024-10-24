'use client'

import { saveAverageTimeService } from '@/app/_actions/work-times'
import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { InputLabel } from '@/app/_components/common/input'
import { Button } from '@/app/_components/ui/button'
import * as Dialog from '@/app/_components/ui/dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { useToast } from '@/app/_hooks/use-toast'
import { Clinic } from '@/app/_types/clinics'
import { Ban } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalAverageTimesServiceInterface {
  open: boolean
  input?: Clinic
}

export function ModalAverageTimesService({
  open,
  input
}: ModalAverageTimesServiceInterface) {
  const { back } = useRouter()
  const { toast } = useToast()
  const params = useSearchParams()

  const [state, formAction] = useFormState(saveAverageTimeService, {})

  useEffect(() => {
    if (!state?.errorMessage) return

    if (state?.errorMessage !== 'OK') {
      toast({ title: 'Atenção!', description: state?.errorMessage })
      return
    }
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    back()
  }, [state, back, toast])

  return (
    <Dialog.Dialog open={open} onOpenChange={() => back()} modal={true}>
      <Dialog.DialogContent
        className="max-w-xl !p-0"
        aria-describedby={undefined}
      >
        <ScrollArea className="h-full">
          <form action={formAction} className="space-y-4 p-6">
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>
                Tempo médio de atendimento
              </Dialog.DialogTitle>
            </Dialog.DialogHeader>
            <input
              type="hidden"
              name="id"
              defaultValue={params.get('clinicId')!}
            />
            <InputLabel
              label={'Tempo de Atendimento'}
              className="flex-1"
              input={{
                type: 'time',
                name: 'time',
                defaultValue: input?.averageService
              }}
            />

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
