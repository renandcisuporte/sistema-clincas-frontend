'use server'

import { apiFecth, ApiResponse } from '@/app/lib/api'
import { Clinic } from '@/app/types/clinics'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export async function saveClinic(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: 'POST',
    url: '/clinics',
    body: ''
  }

  const form = Object.fromEntries(formData)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/clinics/${form?.id}`
    api.method = 'PUT'
  }

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi
  })

  revalidateTag('clinics')

  return {
    ...result,
    errorMessage: result.errorMessage ?? 'OK'
  }
}

export async function removeClinic(
  _state: any,
  formData: FormData
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id } = form
  await apiFecth(`/clinics/${id}`, {
    method: 'DELETE',
    accessToken: session?.accessToken
  })

  revalidateTag('clinics')

  return {
    data: null,
    errorMessage: 'OK'
  }
}

export async function findClinics(id: string): Promise<ApiResponse<Clinic>> {
  const session = await getServerSession(authOptions)

  return await apiFecth(`/clinics/${id}/works`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_${id}`] }
    // cache: 'force-cache'
  })
}

export async function loadClinics(args: any): Promise<ApiResponse<Clinic[]>> {
  const session = await getServerSession(authOptions)
  const { title = '', cnpj = '', limit = 15, page = 1 } = args
  const searchParams = new URLSearchParams({
    title,
    cnpj,
    limit,
    page
  })

  return await apiFecth(`/clinics?${searchParams.toString()}`, {
    accessToken: session?.accessToken,
    next: { tags: ['clinics'] }
    // cache: 'force-cache'
  })
}
