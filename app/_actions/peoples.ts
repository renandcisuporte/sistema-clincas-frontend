'use server'

import { apiFecth, ApiResponse } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { dataToJson } from '../_lib/utils'
import { People } from '../_types/peoples'

export async function savePeople(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: 'POST',
    url: '/peoples',
    body: ''
  }

  const form = dataToJson(formData)

  console.log('object', form)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/peoples/${form?.id}`
    api.method = 'PUT'
  }

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi
  })

  revalidateTag('rooms')

  return {
    ...result,
    errorMessage: result.errorMessage ?? 'OK'
  }
}

export async function removePeople(
  _state: any,
  formData: FormData
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id } = form
  await apiFecth(`/rooms/${id}`, {
    method: 'DELETE',
    accessToken: session?.accessToken
  })

  revalidateTag('rooms')

  return {
    data: null,
    errorMessage: 'OK'
  }
}

export async function activeInativePeople(id: string): Promise<void> {
  const session = await getServerSession(authOptions)

  await apiFecth(`/peoples/${id}/active-inative`, {
    accessToken: session?.accessToken,
    method: 'PUT',
    body: JSON.stringify({})
  })

  revalidateTag('peoples')
}

export async function loadPeoples(args: any): Promise<ApiResponse<People[]>> {
  const session = await getServerSession(authOptions)
  const { full_name = '', limit = 15, page = 1 } = args
  const searchParams = new URLSearchParams({
    full_name,
    limit,
    page
  })

  const result = await apiFecth(`/peoples?${searchParams.toString()}`, {
    accessToken: session?.accessToken,
    next: { tags: ['peoples'] },
    cache: 'force-cache'
  })

  return result
}
