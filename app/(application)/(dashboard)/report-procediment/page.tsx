import { apiFecth } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { PageClient } from "./page-client"

export type Service = {
  id: string
  name: string
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  const result = await apiFecth(`/services?limit=1000`, {
    accessToken: session?.accessToken,
    next: { tags: ["services"] },
    cache: "force-cache",
  })

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Relatório de Procedimentos</h1>
      <PageClient data={result.data} />
    </div>
  )
}
