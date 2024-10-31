'use client'

import { removeExpense, saveExpense } from '@/app/_actions/expenses'
import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { InputLabel } from '@/app/_components/common/input'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/_components/ui/dialog'
import { Label } from '@/app/_components/ui/label'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Switch } from '@/app/_components/ui/switch'
import { useToast } from '@/app/_hooks/use-toast'
import { Expense } from '@/app/_types/expenses'

import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalFormInterface {
  open: boolean
  data?: Expense
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const [type, setType] = useState<'fixed' | 'variable'>(data?.type ?? 'fixed')
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveExpense, {})
  const { errors } = state

  const handleClick = useCallback(() => {
    setType(type === 'fixed' ? 'variable' : 'fixed')
  }, [type])

  useEffect(() => {
    if (state?.errorMessage !== 'OK') return
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="sm:max-w-sm !p-0 [&>button]:hidden"
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
                Você pode editar ou cadastrar suas despesas no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col md:flex-row flex-wrap space-y-4"
            >
              <input type="hidden" name="id" defaultValue={data?.id} />
              <input type="hidden" name="type" defaultValue={type} />

              <InputLabel
                label="Descrição *"
                message={errors?.description}
                className="md:w-full"
                input={{
                  type: 'text',
                  name: 'description',
                  defaultValue: data?.description
                }}
              />

              <div className="flex flex-col w-full space-y-2">
                <Label htmlFor="type">Tipo de Gatos (Fixa/Variáveis)</Label>
                <div className="flex flex-row items-center space-x-2">
                  <Switch
                    defaultChecked={
                      (data?.type === 'fixed' || !data?.type) ?? true
                    }
                    onClick={handleClick}
                  />
                  {type === 'fixed' ? (
                    <span>Gastos Fixos</span>
                  ) : (
                    <span>Gastos Variaveis</span>
                  )}
                </div>
              </div>

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

export function ModalDelete({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(removeExpense, {})

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
          <input type="hidden" name="id" value={data?.id} />
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <ButtonSubmit remove />
        </form>
      </DialogContent>
    </Dialog>
  )
}
