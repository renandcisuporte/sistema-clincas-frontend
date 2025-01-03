"use server"

import { apiFecth } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function generateReport(_state: any, _formData: FormData) {
  const session = await getServerSession(authOptions)
  const api = {
    accessToken: session?.accessToken,
    method: "POST",
    body: "",
  }

  const result = await apiFecth("/reports/procediment-in-product", {
    ...api,
  })

  return {
    url: result.data,
  }
}
