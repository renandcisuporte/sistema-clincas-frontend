'use client'

import { removePeople, savePeople } from '@/app/_actions/peoples'
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
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { useToast } from '@/app/_hooks/use-toast'
import { maskDocument, maskPhone, maskZipCode } from '@/app/_lib/utils'
import { People, Phone } from '@/app/_types/peoples'
import { CircleX, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export interface ModalFormInterface {
  open: boolean
  data?: People
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const [phones, setPhones] = useState<Phone[]>([
    { phone: '', description: '' }
  ])

  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(savePeople, {})
  const { errors } = state

  useEffect(() => {
    if (!data?.phones.length) return setPhones([{ phone: '', description: '' }])
    const itemUpdate = [...data.phones]
    setPhones(itemUpdate)
  }, [data?.phones])

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
                Você pode editar ou cadastrar pessoas no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col md:flex-row flex-wrap space-y-4"
            >
              <input type="hidden" name="id" defaultValue={data?.id} />
              <InputLabel
                label="Nome Completo *"
                message={errors?.fullName}
                input={{
                  type: 'text',
                  name: 'fullName',
                  defaultValue: data?.fullName
                }}
              />

              <InputLabel
                label="E-mail"
                message={errors?.email}
                className="md:basis-72"
                input={{
                  name: 'email',
                  defaultValue: data?.email
                }}
              />

              <InputLabel
                label="CPF"
                message={errors?.document}
                className="md:basis-48 md:ml-4"
                input={{
                  type: 'text',
                  name: 'document',
                  defaultValue: data?.document,
                  onChange: (e) => {
                    e.currentTarget.value = maskDocument(e.currentTarget.value)
                  }
                }}
              />

              <InputLabel
                label="Data Nascimento"
                className="md:basis-40 md:ml-4"
                message={errors?.brithDate}
                input={{
                  type: 'date',
                  name: 'dateOfBirth',
                  defaultValue: `${data?.dateOfBirth}`
                }}
              />

              <div className="flex flex-col w-full space-y-4">
                <hr className="mt-4 flex-1" />
                <DialogTitle className="flex flex-row items-center">
                  <span>Editar/Telefones</span>
                  <Plus
                    className="ml-2 cursor-pointer w-4 h-4"
                    onClick={() =>
                      setPhones((old) => [
                        ...old,
                        { phone: '', description: '' }
                      ])
                    }
                  />
                </DialogTitle>
                {phones.map((phone, index) => (
                  <div key={phone.phone} className="flex flex-row flex-wrap">
                    <InputLabel
                      label="Telefone"
                      className="md:basis-56"
                      input={{
                        name: `phones[${index}][phone]`,
                        defaultValue: phone?.phone,
                        onChange: (e) => {
                          e.currentTarget.value = maskPhone(
                            e.currentTarget.value
                          )
                        }
                      }}
                    />
                    <InputLabel
                      label="Descrição"
                      className="md:flex-1 md:ml-4"
                      input={{
                        name: `phones[${index}][description]`,
                        defaultValue: phone?.description
                      }}
                    />
                    <Trash
                      className="mt-8 ml-4 w-4 h-4 cursor-pointer"
                      onClick={() => {
                        setPhones(phones.filter((_, i) => i !== index))
                      }}
                    />
                  </div>
                ))}
                <hr className="my-4 flex-1" />
              </div>

              <InputLabel
                label="Endereço"
                message={errors?.address}
                className="md:basis-96"
                input={{
                  name: 'address',
                  defaultValue: data?.address
                }}
              />

              <InputLabel
                label="Nr."
                message={errors?.number}
                className="md:basis-20 md:ml-4"
                input={{
                  name: 'number',
                  defaultValue: data?.number
                }}
              />

              <InputLabel
                label="Bairro"
                message={errors?.neighborhood}
                className="md:basis-64"
                input={{
                  name: 'neighborhood',
                  defaultValue: data?.neighborhood
                }}
              />

              <InputLabel
                label="Cidade"
                message={errors?.city}
                className="md:basis-64 md:ml-4"
                input={{
                  name: 'city',
                  defaultValue: data?.city
                }}
              />

              <InputLabel
                label="UF"
                message={errors?.state}
                className="md:basis-20 md:ml-4"
                input={{
                  name: 'state',
                  defaultValue: data?.state
                }}
              />

              <InputLabel
                label="CEP"
                message={errors?.zipCode}
                className="md:basis-44"
                input={{
                  name: 'zipCode',
                  defaultValue: data?.zipCode,
                  onChange: (e) => {
                    e.currentTarget.value = maskZipCode(e.currentTarget.value)
                  }
                }}
              />

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

  const [state, formAction] = useFormState(removePeople, {})

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
