"use server"

import { apiFecth, ApiResponse } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { Product } from "../_types/products"

export async function saveProduct(
  _: any,
  formData: FormData,
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    url: "/products",
    body: "",
  }

  // const form = dataToJson(formData)
  const form = Object.fromEntries(formData)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/products/${form?.id}`
    api.method = "PUT"
  }

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi,
  })

  revalidateTag("products")

  return {
    ...result,
    errorMessage: result.errorMessage ?? "OK",
  }
}

export async function removeProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id } = form
  await apiFecth(`/products/${id}`, {
    method: "DELETE",
    accessToken: session?.accessToken,
  })

  revalidateTag("products")

  return {
    data: null,
    errorMessage: "OK",
  }
}

export async function loadProduct(args: any): Promise<ApiResponse<Product[]>> {
  const session = await getServerSession(authOptions)
  const { name = "", limit = 15, page = 1 } = args
  const searchParams = new URLSearchParams({
    name,
    limit,
    page,
    nameAsc: "true",
  })

  const result = await apiFecth(`/products?${searchParams.toString()}`, {
    accessToken: session?.accessToken,
    next: { tags: ["products"] },
    cache: "force-cache",
  })

  return result
}
