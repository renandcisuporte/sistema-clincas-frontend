'use server'

import { apiFecth, ApiFecthResponse } from '@/app/lib/api'
import { Clinic } from '@/app/types/clinics'
import { ActionResponse } from '@/app/types/common'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import * as z from 'zod'

const common = {
  fantasy: z.string().min(3, { message: 'Campo obrigatório!' }),
  title: z.string().min(3, { message: 'Campo obrigatório!' }),
  cnpj: z.string().min(3, { message: 'Campo obrigatório!' }),
  ie: z.string().min(3, { message: 'Campo obrigatório!' })
}

const schemaForm = z.object({
  id: z.string().optional(),
  ...common
})

const schemaDelete = z.object({
  id: z.string().uuid({ message: 'Error' })
})

export async function saveClinic(
  _state: any,
  formData: FormData
): Promise<ActionResponse> {
  const session = await getServerSession(authOptions)

  const form = await schemaForm.safeParseAsync({
    id: formData.get('id'),
    fantasy: formData.get('fantasy'),
    title: formData.get('title'),
    cnpj: formData.get('cnpj'),
    ie: formData.get('ie')
  })

  if (!form.success) {
    return {
      errors: form.error.issues.reduce((prev, issue) => {
        return Object.assign(prev, { [`${issue.path}`]: `${issue.message}` })
      }, {})
    }
  }
  const { cnpj, fantasy, ie, title, id } = form.data

  let method = 'POST'
  let uriFecth = '/clinics'
  if (id) {
    method = 'PUT'
    uriFecth = `/clinics/${id}`
  }

  await apiFecth(uriFecth, {
    method,
    accessToken: session?.accessToken,
    body: JSON.stringify({ cnpj, fantasy, ie, title })
  })

  revalidateTag('clinics')

  return {
    message: 'Dados salvos com sucesso!'
  }
}

export async function removeClinic(
  _state: any,
  formData: FormData
): Promise<ActionResponse> {
  const session = await getServerSession(authOptions)

  const form = await schemaDelete.safeParseAsync({
    id: formData.get('id')
  })

  if (!form.success) {
    return {
      errors: form.error.issues.reduce((prev, issue) => {
        return Object.assign(prev, { [`${issue.path}`]: `${issue.message}` })
      }, {})
    }
  }

  const { id } = form.data
  await apiFecth(`/clinics/${id}`, {
    method: 'DELETE',
    accessToken: session?.accessToken
  })

  revalidateTag('clinics')

  return {
    message: 'Dados removido com sucesso!'
  }
}

export async function loadClinics(): Promise<ApiFecthResponse<Clinic[]>> {
  const session = await getServerSession(authOptions)

  return await apiFecth(`/clinics`, {
    accessToken: session?.accessToken,
    next: { tags: ['clinics'] },
    cache: 'force-cache'
  })
}
