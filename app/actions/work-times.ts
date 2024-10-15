'use server'

import { apiFecth, ApiResponse } from '@/app/lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function saveWorkTime(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)

  const formObject: Record<string, any> = {}
  const isMatch = (key: string): boolean => isNaN(Number(key))
  for (let [key, value] of formData.entries()) {
    // Extrai as chaves, ex: ["week", "0", "times", "0", "time"]
    const keys = key.match(/[^[\]]+/g) as string[]
    keys.reduce((acc: Record<string, any>, curr: string, index: number) => {
      // Se é o último item, definimos o valor
      acc[curr] = acc[curr] || (isMatch(keys[index + 1]) ? {} : [])

      let isLast = index === keys.length - 1
      if (isLast) acc[curr] = value

      return acc[curr]
    }, formObject)
  }

  const { id, ...restform } = formObject

  const api = {
    accessToken: session?.accessToken,
    method: 'PUT',
    url: `/clinics/${id}/works`,
    body: ''
  }

  api.body = JSON.stringify({ ...restform })

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi
  })

  revalidateTag('clinics-works')

  return {
    ...result,
    errorMessage: result.errorMessage ?? 'OK'
  }
}
