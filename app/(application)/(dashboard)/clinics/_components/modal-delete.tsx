'use client'

import { removeClinic } from '@/app/_actions/clinics'
import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/_components/ui/dialog'
import { useToast } from '@/app/_hooks/use-toast'
import { Clinic } from '@/app/_types/clinics'
import { Ban } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalFormInterface {
  open: boolean
  clinic?: Clinic
}

export function ModalDelete({ open, clinic }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(removeClinic, {})

  useEffect(() => {
    if (state?.errorMessage !== 'OK') return
    toast({ title: 'Atenção!', description: 'Excluido com sucesso!' })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} onOpenChange={() => back()} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir?
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="flex flex-col space-y-4 flex-wrap md:flex-row md:space-x-2 float-right justify-end"
        >
          <input type="hidden" name="id" value={clinic?.id} />
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              <Ban className="w-4 mr-1" />
              Cancelar
            </Button>
          </DialogClose>
          <ButtonSubmit remove />
        </form>
      </DialogContent>
    </Dialog>
  )
}
