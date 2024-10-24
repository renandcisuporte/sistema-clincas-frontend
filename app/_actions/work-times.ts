'use server'

import { apiFecth, ApiResponse } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

const isMatch = (key: string): boolean => isNaN(Number(key))
const formObject: Record<string, any> = {}

export async function saveWorkTime(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)

  for (let [key, value] of formData.entries()) {
    const keys = key.match(/[^[\]]+/g) as string[]
    keys.reduce((acc: Record<string, any>, curr: string, index: number) => {
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

  api.body = JSON.stringify(Object.values(restform), null, 2)

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

export async function saveWorkTimeRecommended(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)

  for (let [key, value] of formData.entries()) {
    const keys = key.match(/[^[\]]+/g) as string[]
    keys.reduce((acc: Record<string, any>, curr: string, index: number) => {
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
    url: `/clinics/${id}/works-recommended`,
    body: ''
  }

  api.body = JSON.stringify(Object.values(restform), null, 2)

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

export async function saveWorkTimeService(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)

  for (let [key, value] of formData.entries()) {
    const keys = key.match(/[^[\]]+/g) as string[]
    keys.reduce((acc: Record<string, any>, curr: string, index: number) => {
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
    url: `/clinics/${id}/works-service`,
    body: ''
  }

  api.body = JSON.stringify(Object.values(restform))

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi
  })

  revalidateTag('clinics-works')

  console.log(Object.values(restform))

  return {
    ...result,
    errorMessage: result.errorMessage ?? 'OK'
  }
}

export async function saveAverageTimeService(
  _: any,
  formData: FormData
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id, ...restform } = form

  const api = {
    url: `/clinics/${id}/average-service`,
    accessToken: session?.accessToken,
    method: 'PUT',
    body: ''
  }

  api.body = JSON.stringify(restform)

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
