'use client'

import { saveClinic } from '@/app/_actions/clinics'
import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { InputLabel } from '@/app/_components/common/input'
import { Button, buttonVariants } from '@/app/_components/ui/button'
import { useToast } from '@/app/_hooks/use-toast'
import { cn, maskDocument, maskPhone, maskZipCode } from '@/app/_lib/utils'
import { Clinic } from '@/app/_types/clinics'
import { Clock, Undo, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

export type ParamsProps = {
  input?: Clinic | undefined
}

export function PageClient({ input }: ParamsProps) {
  const { back } = useRouter()
  const { toast } = useToast()
  const [state, formAction] = useFormState(saveClinic, {})
  const { errors } = state

  useEffect(() => {
    if (state?.errorMessage !== 'OK') return
    toast({ title: 'Atenção!', description: 'Salvo com sucesso!' })
    // back()
  }, [back, state, toast])

  return (
    <form
      action={formAction}
      className="flex flex-col md:flex-row flex-wrap space-y-4"
    >
      <div className="border-b border-neutral-300 w-full mb-4 flex flex-row items-center justify-between pb-4">
        <h2 className="text-xl">Clinica - {input?.title}</h2>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            className="mr-4"
            onClick={() => back()}
            type="button"
          >
            <Undo className="w-4 mr-1" />
            Voltar
          </Button>

          {false && (
            <>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'work_times'
                  }
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4'
                )}
                type="button"
              >
                <Clock className="w-4 mr-1" />
                Horário de Funcionamento
              </Link>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'work_times_recommended'
                  }
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4'
                )}
                type="button"
              >
                <Clock className="w-4 mr-1" />
                Horário Recomendado
              </Link>
            </>
          )}

          <ButtonSubmit size="sm" />
        </div>
      </div>

      <input type="hidden" name="id" defaultValue={input?.id} />
      <InputLabel
        label="Titulo Empresarial"
        message={errors?.title}
        type="text"
        name="title"
        defaultValue={input?.title}
      />

      <InputLabel
        label="Nome Fantasia"
        message={errors?.fantasy}
        type="text"
        name="fantasy"
        defaultValue={input?.fantasy}
      />

      <InputLabel
        label="CNPJ"
        message={errors?.cnpj}
        classHelper="md:basis-56"
        type="text"
        name="cnpj"
        defaultValue={input?.cnpj}
        onChange={(e) => {
          e.target.value = maskDocument(e.target.value)
        }}
      />

      <InputLabel
        label="Inscrição Estadual"
        message={errors?.ie}
        classHelper="md:basis-56 md:ml-4"
        type="text"
        name="ie"
        defaultValue={input?.ie}
      />

      <InputLabel
        label="Telefone"
        classHelper="md:basis-1/4 md:ml-4"
        message={errors?.phone}
        type="text"
        name="phone"
        defaultValue={input?.phone}
        onChange={(e) => {
          e.target.value = maskPhone(e.target.value)
        }}
      />

      <InputLabel
        label="Celular"
        classHelper="md:basis-1/4 md:ml-4"
        message={errors?.mobilePhone}
        type="text"
        name="mobilePhone"
        defaultValue={input?.mobilePhone}
        onChange={(e) => {
          e.target.value = maskPhone(e.target.value)
        }}
      />

      <InputLabel
        label="Endereço"
        message={errors?.address}
        classHelper="md:basis-2/4 md:mr-4"
        type="text"
        name="address"
        defaultValue={input?.address}
      />

      <InputLabel
        label="Numero"
        message={errors?.number}
        classHelper="md:basis-1/5 md:mr-4"
        type="text"
        name="number"
        defaultValue={input?.number}
      />

      <InputLabel
        label="Referência"
        message={errors?.reference}
        classHelper="md:basis-2/3 md:mr-4"
        type="text"
        name="reference"
        defaultValue={input?.reference}
      />

      <InputLabel
        label="Complemento"
        message={errors?.complement}
        classHelper="md:basis-2/3 md:mr-4"
        type="text"
        name="complement"
        defaultValue={input?.complement}
      />

      <InputLabel
        label="Cidade"
        message={errors?.city}
        classHelper="md:basis-1/2 md:mr-4"
        type="text"
        name="city"
        defaultValue={input?.city}
      />

      <InputLabel
        label="UF"
        message={errors?.state}
        classHelper="md:basis-1/6 md:mr-4"
        type="text"
        name="state"
        defaultValue={input?.state}
      />

      <InputLabel
        label="CEP"
        message={errors?.zipCode}
        classHelper="md:basis-1/6 md:mr-4"
        type="text"
        name="zipCode"
        defaultValue={input?.zipCode}
        onChange={(e) => {
          e.target.value = maskZipCode(e.target.value)
        }}
      />

      <div className="border-b border-neutral-300 w-full mb-4 flex flex-row items-center justify-between mt-6 pb-4">
        <h2 className="text-xl">Usuários/Clinica - {input?.title}</h2>
        <div className="flex items-center justify-end">
          {input?.id && (
            <>
              <Link
                href={{
                  pathname: `/clinics/${input?.id}/update`,
                  query: {
                    modal: 'clinics_users'
                  }
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'mr-4'
                )}
                type="button"
              >
                <Users className="w-4 mr-1" />
                Cadastrar Usuários/Clinica
              </Link>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
