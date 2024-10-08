'use server'

import { signIn } from 'next-auth/react'

import { z } from 'zod'

const schemaLogin = z.object({
  email: z
    .string({ invalid_type_error: 'Campo obrigatório!' })
    .email({ message: 'E-mail inválido!' }),
  password: z
    .string({ invalid_type_error: 'Campo obrigatório!' })
    .min(6, { message: 'Requer 6 caracteres' })
    .max(12, { message: 'Requer máximo 12 caracteres' })
})

export async function loginAction(
  _state: any,
  formData: FormData
): Promise<any> {
  const form = await schemaLogin.safeParseAsync({
    email: formData.get('email'),
    password: formData.get('password')
  })

  // if (!form.success) {
  //   return {
  //     errors: form.error.issues.reduce((prev, issue) => {
  //       return Object.assign(prev, { [`${issue.path}`]: `${issue.message}` })
  //     }, {})
  //   }
  // }

  await signIn('credentials', {
    email: form?.data?.email,
    password: form?.data?.password,
    callbackUrl: '/dashboard',
    redirect: false
  })
}
