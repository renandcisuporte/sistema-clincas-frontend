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
  _formData: FormData
): Promise<any> {
  try {
    let url = null
    const formData = await schemaLogin.safeParseAsync({
      email: _formData.get('email'),
      password: _formData.get('password')
    })

    // if (!formData.success) {
    //   return {
    //     errors: formData.error.issues.reduce((prev, issue) => {
    //       return Object.assign(prev, { [`${issue.path}`]: `${issue.message}` })
    //     }, {})
    //   }
    // }

    const form = formData.data
    await signIn('credentials', {
      email: form?.email,
      password: form?.password,
      redirect: false,
      callbackUrl: '/dashboard'
    })
    // .then((resp) => {
    //   console.log('resp', JSON.stringify(resp?.url, null, 2))
    //   // return redirect(`${resp?.url}`)
    // })
    // .catch((error) => console.log('error', JSON.stringify(error, null, 2)))
  } catch (error) {
    console.log('asdf', error)
  }
}
