'use client'

import { removeRoom, saveRoom } from '@/app/actions/rooms'
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
import { Room } from '@/app/types/rooms'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalFormInterface {
  open: boolean
  data?: Room
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const [input, setInput] = useState({} as Room)

  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveRoom, {})
  const { errors } = state

  useEffect(() => {
    if (data?.id) setInput({ ...data })
  }, [data])

  useEffect(() => {
    if (state?.errorMessage !== 'OK') return
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="sm:max-w-[767px] h-full max-h-[96%] !p-0 [&>button]:hidden"
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
                Você pode editar ou cadastrar uma sala no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col md:flex-row flex-wrap space-y-4"
            >
              <input type="hidden" name="id" value={input?.id} />
              <InputLabel
                label="Titulo Empresarial"
                message={errors?.room}
                input={{
                  type: 'text',
                  name: 'room',
                  defaultValue: input?.room
                }}
              />

              {/* <InputLabel
                label="Nome Fantasia"
                message={errors?.fantasy}
                input={{
                  type: 'text',
                  name: 'fantasy',
                  defaultValue: input?.fantasy
                }}
              /> */}

              {/* <InputLabel
                label="CNPJ"
                message={errors?.cnpj}
                className="md:basis-56"
                input={{
                  type: 'text',
                  name: 'cnpj',
                  defaultValue: state?.cnpj,
                  value: input?.cnpj,
                  onChange: (e) =>
                    setInput((prev) => ({
                      ...prev,
                      cnpj: maskDocument(e.target.value)
                    }))
                }}
              />

              <InputLabel
                label="Inscrição Estadual"
                message={errors?.ie}
                className="md:basis-56 md:ml-4"
                input={{
                  type: 'text',
                  name: 'ie',
                  defaultValue: input?.ie
                }}
              />

              <InputLabel
                label="Telefone"
                className="md:basis-1/4 md:ml-4"
                message={errors?.phone}
                input={{
                  type: 'text',
                  name: 'phone',
                  defaultValue: input?.phone,
                  value: input?.phone,
                  onChange: (e) =>
                    setInput((prev) => ({
                      ...prev,
                      phone: maskPhone(e.target.value)
                    }))
                }}
              />

              <InputLabel
                label="Celular"
                className="md:basis-1/4 md:mr-4"
                message={errors?.mobilePhone}
                input={{
                  type: 'text',
                  name: 'mobilePhone',
                  defaultValue: input?.mobilePhone,
                  value: input?.mobilePhone,
                  onChange: (e) =>
                    setInput((prev) => ({
                      ...prev,
                      mobilePhone: maskPhone(e.target.value)
                    }))
                }}
              />

              <InputLabel
                label="Endereço"
                message={errors?.address}
                className="md:basis-2/4 md:mr-4"
                input={{
                  type: 'text',
                  name: 'address',
                  defaultValue: input?.address
                }}
              />

              <InputLabel
                label="Numero"
                message={errors?.number}
                className="md:basis-1/5 md:mr-4"
                input={{
                  type: 'text',
                  name: 'number',
                  defaultValue: input?.number
                }}
              />

              <InputLabel
                label="Referência"
                message={errors?.reference}
                className="md:basis-2/3 md:mr-4"
                input={{
                  type: 'text',
                  name: 'reference',
                  defaultValue: input?.reference
                }}
              />

              <InputLabel
                label="Complemento"
                message={errors?.complement}
                className="md:basis-2/3 md:mr-4"
                input={{
                  type: 'text',
                  name: 'complement',
                  defaultValue: input?.complement
                }}
              />

              <InputLabel
                label="Cidade"
                message={errors?.city}
                className="md:basis-1/2 md:mr-4"
                input={{
                  type: 'text',
                  name: 'city',
                  defaultValue: input?.city
                }}
              />

              <InputLabel
                label="UF"
                message={errors?.state}
                className="md:basis-1/6 md:mr-4"
                input={{
                  type: 'text',
                  name: 'state',
                  defaultValue: input?.state
                }}
              />

              <InputLabel
                label="CEP"
                message={errors?.zipCode}
                className="md:basis-1/6 md:mr-4"
                input={{
                  type: 'text',
                  name: 'zipCode',
                  defaultValue: input?.zipCode,
                  value: input?.zipCode,
                  onChange: (e) =>
                    setInput((prev) => ({
                      ...prev,
                      zipCode: maskZipCode(e.target.value)
                    }))
                }}
              /> */}

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

  const [state, formAction] = useFormState(removeRoom, {})

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
              Cancela
            </Button>
          </DialogClose>
          <ButtonSubmit remove />
        </form>
      </DialogContent>
    </Dialog>
  )
}
