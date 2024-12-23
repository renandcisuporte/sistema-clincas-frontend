"use server"

import { apiFecth } from "@/app/_lib/api"
import { dataToJson } from "@/app/_lib/utils"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"

export async function saveServiceInProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = dataToJson(formData)

  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    url: "/service/in/product",
    body: "",
  }

  const { services, ...restform } = form
  api.body = JSON.stringify({ ...services })

  const { url, ...restApi } = api
  await apiFecth(url, {
    ...restApi,
  })

  revalidateTag("products")
  revalidateTag("services")
  revalidateTag(`service-${services[0].serviceId}-product`)
  revalidatePath(`/services/${services[0].productId}`)

  return {
    errorMessage: "OK",
  }
}
