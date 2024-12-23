"use server"

import { apiFecth, ApiResponse } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { dataToJson } from "../_lib/utils"
import { ServiceInProduct } from "../_types/services-in-products"

export async function saveService(
  _: any,
  formData: FormData,
): Promise<ApiResponse> {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    url: "/services",
    body: "",
  }

  const form = dataToJson(formData)

  const { id, ...restform } = form
  api.body = JSON.stringify({ ...restform })

  if (id) {
    api.url = `/services/${form?.id}`
    api.method = "PUT"
  }

  const { url, ...restApi } = api
  const result = await apiFecth(url, {
    ...restApi,
  })

  revalidateTag("services")

  return {
    ...result,
    errorMessage: result.errorMessage ?? "OK",
  }
}

export async function removeServiceInProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = Object.fromEntries(formData)

  const { id } = form
  await apiFecth(`/services/${id}`, {
    method: "DELETE",
    accessToken: session?.accessToken,
  })

  revalidateTag("services")

  return {
    data: null,
    errorMessage: "OK",
  }
}

export async function loadServicesInProducts(
  serviceId: string,
): Promise<ApiResponse<ServiceInProduct[]>> {
  const session = await getServerSession(authOptions)

  const result = await apiFecth(`/service/${serviceId}/product`, {
    accessToken: session?.accessToken,
    next: { tags: [`service-${serviceId}-product`] },
    cache: "force-cache",
  })

  return result
}
