'use server'

import { apiFecth, ApiResponse } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { Room } from '../_types/rooms'

export async function saveRoom(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: 'POST',
    url: '/rooms',
    body: ''
  }

  const form = Object.fromEntries(formData)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/rooms/${form?.id}`
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

export async function removeRoom(
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

export async function activeInativeRoom(id: string): Promise<void> {
  const session = await getServerSession(authOptions)

  await apiFecth(`/rooms/${id}/active-inative`, {
    accessToken: session?.accessToken,
    method: 'PUT',
    body: JSON.stringify({})
  })

  revalidateTag('rooms')
}

export async function loadRooms(args: any): Promise<ApiResponse<Room[]>> {
  const session = await getServerSession(authOptions)
  const { room = '', limit = 15, page = 1 } = args
  const searchParams = new URLSearchParams({
    room,
    limit,
    page
  })

  return await apiFecth(`/rooms?${searchParams.toString()}`, {
    accessToken: session?.accessToken,
    next: { tags: ['rooms'] },
    cache: 'force-cache'
  })
}
