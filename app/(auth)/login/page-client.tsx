'use client'

import { ButtonSubmit } from '@/app/_components/common/button-submit'
import { InputLabel } from '@/app/_components/common/input'
import { useToast } from '@/app/_hooks/use-toast'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

type PageClientProps = {
  action: (...args: any) => Promise<any>
}

export function PageClient({ action }: PageClientProps) {
  const { toast } = useToast()
  const [state, formAction] = useFormState(action, undefined)
  const router = useRouter()

  return (
    <form
      // action={formAction}
      onSubmit={async (event: any) => {
        try {
          const formData = new FormData(event.currentTarget)
          event.preventDefault()
          await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
          })
          router.push(`/dashboard`)
        } catch (error) {
          console.log('error', JSON.stringify(error, null, 2))
          toast({
            title: 'Atenção',
            description: 'Dados inválidos'
          })
        }
      }}
      className="w-full md:max-w-md p-6 bg-white rounded-lg space-y-6"
    >
      <Image
        src="/RUBRICA SISTEMA.png"
        alt="Logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      {/* {JSON.stringify(state)} */}
      <InputLabel
        label="Digite seu E-mail"
        input={{
          type: 'email',
          name: 'email'
        }}
        message={state?.errors?.email}
      />
      <InputLabel
        label="Digite sua Senha"
        input={{
          type: 'password',
          name: 'password'
        }}
        message={state?.errors?.password}
      />

      <ButtonSubmit />
    </form>
  )
}
