"use server"

import { apiFecth, ApiResponse } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { Expense } from "../_types/expenses"

export async function saveExpense(
  _: any,
  formData: FormData,
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    url: "/expenses",
    body: "",
  }

  const form = Object.fromEntries(formData)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/expenses/${form?.id}`
    api.method = "PUT"
  }

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi,
  })

  revalidateTag("expenses")

  return {
    ...result,
    errorMessage: result.errorMessage ?? "OK",
  }
}

export async function removeExpense(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id } = form
  await apiFecth(`/expenses/${id}`, {
    method: "DELETE",
    accessToken: session?.accessToken,
  })

  revalidateTag("expenses")

  return {
    data: null,
    errorMessage: "OK",
  }
}

export async function activeInativeExpense(id: string): Promise<void> {
  const session = await getServerSession(authOptions)

  await apiFecth(`/expenses/${id}/active-inative`, {
    accessToken: session?.accessToken,
    method: "PUT",
    body: JSON.stringify({}),
  })

  revalidateTag("expenses")
}

export async function typesExpense(id: string): Promise<void> {
  const session = await getServerSession(authOptions)

  await apiFecth(`/expenses/${id}/types/active-inative`, {
    accessToken: session?.accessToken,
    method: "PUT",
    body: JSON.stringify({}),
  })

  revalidateTag("expenses")
}

export async function loadExpenses(args: any): Promise<ApiResponse<Expense[]>> {
  const session = await getServerSession(authOptions)
  const { description = "", active, type, limit = 15, page = 1 } = args
  const searchParams = new URLSearchParams({
    description,
    active,
    type,
    limit,
    page,
  })

  return await apiFecth(`/expenses?${searchParams.toString()}`, {
    accessToken: session?.accessToken,
    next: { tags: ["expenses"] },
    cache: "force-cache",
  })
}
