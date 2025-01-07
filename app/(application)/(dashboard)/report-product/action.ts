"use server"

import { apiFecth } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function generateReport(_state: any, formData: FormData) {
  const session = await getServerSession(authOptions)
  const api = {
    method: "POST",
    accessToken: session?.accessToken,
    body: JSON.stringify({ ...Object.fromEntries(formData.entries()) }),
  }

  const result = await apiFecth("/reports/product-pdf", {
    ...api,
  })

  return {
    url: `${result.data}?timestamp=${Date.now()}`,
  }
}
