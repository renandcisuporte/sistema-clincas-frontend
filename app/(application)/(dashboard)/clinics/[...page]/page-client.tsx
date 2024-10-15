'use client'

import { saveClinic } from '@/app/actions/clinics'
import { ButtonSubmit } from '@/app/components/common/button-submit'
import { InputLabel } from '@/app/components/common/input'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { useToast } from '@/app/hooks/use-toast'
import { cn, maskDocument, maskPhone, maskZipCode } from '@/app/lib/utils'
import { Clinic } from '@/app/types/clinics'
import { Clock, Undo } from 'lucide-react'
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
    back()
  }, [back, state, toast])

  return (
    <form
      action={formAction}
      className="flex flex-col md:flex-row flex-wrap space-y-4"
    >
      <div className="w-full flex items-center justify-end">
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

        <Link
          href={{
            pathname: `/clinics/${input?.id}/update`,
            query: {
              modal: 'open',
              id: input?.id
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

        <ButtonSubmit size="sm" />
      </div>

      <input type="hidden" name="id" defaultValue={input?.id} />
      <InputLabel
        label="Titulo Empresarial"
        message={errors?.title}
        input={{
          type: 'text',
          name: 'title',
          defaultValue: input?.title
        }}
      />

      <InputLabel
        label="Nome Fantasia"
        message={errors?.fantasy}
        input={{
          type: 'text',
          name: 'fantasy',
          defaultValue: input?.fantasy
        }}
      />

      <InputLabel
        label="CNPJ"
        message={errors?.cnpj}
        className="md:basis-56"
        input={{
          type: 'text',
          name: 'cnpj',
          defaultValue: input?.cnpj,
          onChange: (e) => {
            e.target.value = maskDocument(e.target.value)
          }
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
          onChange: (e) => {
            e.target.value = maskPhone(e.target.value)
          }
        }}
      />

      <InputLabel
        label="Celular"
        className="md:basis-1/4 md:ml-4"
        message={errors?.mobilePhone}
        input={{
          type: 'text',
          name: 'mobilePhone',
          defaultValue: input?.mobilePhone,
          onChange: (e) => {
            e.target.value = maskPhone(e.target.value)
          }
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
          onChange: (e) => {
            e.target.value = maskZipCode(e.target.value)
          }
        }}
      />
    </form>
  )
}
