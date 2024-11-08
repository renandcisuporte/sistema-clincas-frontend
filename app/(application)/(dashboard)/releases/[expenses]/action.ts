"use server"

import { apiFecth } from "@/app/_lib/api"
import { dataToJson } from "@/app/_lib/utils"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export async function actionRelease(
  _state: any,
  formData: FormData,
): Promise<any> {
  const session = await getServerSession(authOptions)
  const form = dataToJson(formData)
  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    url: "/realeses",
    body: "",
  }

  const { expenses, ...restform } = form
  api.body = JSON.stringify({ ...expenses })

  const { url, ...restApi } = api
  await apiFecth(url, {
    ...restApi,
  })

  revalidateTag("expenses")
  revalidateTag("realeses")

  return {
    message: "OK",
  }
}
