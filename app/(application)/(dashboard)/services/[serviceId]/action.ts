"use server"

import { apiFecth } from "@/app/_lib/api"
import { dataToJson } from "@/app/_lib/utils"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export async function saveServiceInProduct(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)

  const form = dataToJson(formData)

  console.log("form", form)

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

  revalidateTag(`service-${services[0].serviceId}-product`)
  revalidateTag("services")

  return {
    errorMessage: "OK",
  }
}
