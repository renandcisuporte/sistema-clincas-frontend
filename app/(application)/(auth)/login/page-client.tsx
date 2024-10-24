'use client'

import { InputLabel } from '@/app/_components/common/input'
import { Button } from '@/app/_components/ui/button'
import { useToast } from '@/app/_hooks/use-toast'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { z } from 'zod'

const schemaLogin = z.object({
  code: z
    .string({ message: 'Campo obrigatório!' })
    .min(7, { message: 'Digite o código da clínica' }),
  email: z
    .string({
      message: 'Campo obrigatório!'
    })
    .email({ message: 'E-mail inválido!' }),
  password: z
    .string({ message: 'Campo obrigatório!' })
    .min(6, { message: 'Requer 6 caracteres' })
    .max(12, { message: 'Requer máximo 12 caracteres' })
})

type LoginProps = z.infer<typeof schemaLogin>

export function PageClient() {
  const { refresh, push } = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState({} as any)
  const [formField, setFormField] = React.useState<LoginProps>({} as LoginProps)

  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    try {
      setLoading(true)
      const form = await schemaLogin.safeParseAsync({
        code: formField?.code,
        email: formField?.email,
        password: formField?.password
      })

      if (!form.success) {
        setLoading(false)
        const errors = form.error.issues.reduce((prev, issue) => {
          return Object.assign(prev, { [`${issue.path}`]: `${issue.message}` })
        }, {})
        setError(errors)
        return
      }

      const res = await signIn('credentials', {
        redirect: false,
        code: formField.code,
        email: formField.email,
        password: formField.password
      })

      if (res?.error) {
        throw new Error(res.error)
      }

      push('/dashboard')
    } catch (error: any) {
      console.log(error)
      setError({})
      setLoading(false)
      toast({
        title: 'Erro ao fazer login!',
        description: 'Verifique suas credenciais e tente novamente!'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:max-w-md p-6 bg-white rounded-lg space-y-6"
    >
      <Image
        src="/RUBRICA-SISTEMA.png"
        alt="Logo"
        width={255}
        height={170}
        className="mx-auto"
        quality="100"
      />

      <InputLabel
        label="Código Clínica"
        message={error?.code}
        input={{
          type: 'text',
          name: 'code',
          maxLength: 7,
          onChange: (event) => {
            event.target.value = String(event.target.value)
              .replace(/-/g, '')
              .replace(/(.{3})(?=.)/g, '$1-')
            const { name, value } = event.target
            setFormField((old) => ({ ...old, [name]: value }))
          }
        }}
      />
      <InputLabel
        label="Digite seu E-mail"
        message={error?.email}
        input={{
          type: 'email',
          name: 'email',
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target
            setFormField((old) => ({ ...old, [name]: value }))
          }
        }}
      />
      <InputLabel
        label="Digite sua Senha"
        message={error?.password}
        input={{
          type: 'password',
          name: 'password',
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target
            setFormField((old) => ({ ...old, [name]: value }))
          }
        }}
      />

      <Button size="full" disabled={loading}>
        {loading ? 'Fazendo Login' : 'Login'}
      </Button>
    </form>
  )
}
