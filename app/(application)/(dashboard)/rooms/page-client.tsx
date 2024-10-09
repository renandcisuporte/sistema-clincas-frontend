'use client'

import { removeClinic, saveClinic } from '@/app/actions/clinics'
import { ButtonSubmit } from '@/app/components/common/button-submit'
import { InputLabel } from '@/app/components/common/input'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/components/ui/dialog'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { useToast } from '@/app/hooks/use-toast'
import { Clinic } from '@/app/types/clinics'
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

export function ModalForm({ open, clinic }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveClinic, clinic)

  useEffect(() => {
    if (state?.message) {
      back()
      toast({
        title: 'Atenção!',
        description: state.message
      })
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={() => back()} modal={true}>
      <DialogContent className="sm:max-w-[767px] h-full max-h-[96%] !p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Editar/Cadastrar</DialogTitle>
              <DialogDescription>
                Você pode editar ou cadastrar uma clinica no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col md:flex-row flex-wrap space-y-4"
            >
              <input type="hidden" name="id" value={clinic?.id} />
              <InputLabel
                label="Titulo Empresarial"
                message={state?.errors?.title}
                input={{
                  type: 'text',
                  name: 'title',
                  defaultValue: clinic?.title
                }}
              />

              <InputLabel
                label="Nome Fantasia"
                message={state?.errors?.fantasy}
                input={{
                  type: 'text',
                  name: 'fantasy',
                  defaultValue: clinic?.fantasy
                }}
              />

              <InputLabel
                label="CNPJ"
                message={state?.errors?.cnpj}
                className="md:basis-48"
                input={{
                  type: 'text',
                  name: 'cnpj',
                  defaultValue: clinic?.cnpj
                }}
              />

              <InputLabel
                label="Inscrição Estadual"
                message={state?.errors?.ie}
                className="md:basis-40 md:ml-4"
                input={{
                  type: 'text',
                  name: 'ie',
                  defaultValue: clinic?.ie
                }}
              />

              <InputLabel
                label="Telefones"
                message={state?.errors?.phones}
                input={{
                  type: 'text',
                  name: 'phones',
                  defaultValue: clinic?.phones.join(', ')
                }}
              />

              <InputLabel
                label="Endereço"
                message={state?.errors?.address.address}
                className="md:basis-2/4 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[address]',
                  defaultValue: ''
                }}
              />

              <InputLabel
                label="Numero"
                message={state?.errors?.address.number}
                className="md:basis-1/5 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[number]',
                  defaultValue: ''
                }}
              />

              <InputLabel
                label="Referência"
                message={state?.errors?.address.reference}
                className="md:basis-2/3 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[reference]',
                  defaultValue: ''
                }}
              />

              <InputLabel
                label="Complemento"
                message={state?.errors?.address.component}
                className="md:basis-2/3 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[component]',
                  defaultValue: ''
                }}
              />

              <InputLabel
                label="Cidade"
                message={state?.errors?.address.city}
                className="md:basis-1/2 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[city]',
                  defaultValue: ''
                }}
              />

              <InputLabel
                label="UF"
                message={state?.errors?.address.city}
                className="md:basis-1/6 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address[city]',
                  defaultValue: ''
                }}
              />

              <ButtonSubmit />
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function ModalDelete({ open, clinic }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(removeClinic, clinic)

  useEffect(() => {
    if (state?.message) {
      back()
      toast({
        title: 'Atenção!',
        description: state.message
      })
    }
  }, [state])

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
              Cancela
            </Button>
          </DialogClose>
          <ButtonSubmit remove />
        </form>
      </DialogContent>
    </Dialog>
  )
}
