"use client"

import { Button } from "@/app/_components/ui/button"
import { BookOpenCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
  // @ts-ignore
  experimental_useFormStatus as useFormStatus,
} from "react-dom"
import { generateReport } from "./action"

export function PageClient() {
  const { push } = useRouter()

  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(generateReport, {})

  useEffect(() => {
    if (state.url) {
      window.open(state.url, "_blank", "noopener,noreferrer")
      return
    }
  }, [state, push])

  return (
    <form className="flex flex-col items-center py-4" action={formAction}>
      <Button type="submit" size="sm" disabled={pending}>
        <BookOpenCheck className="mr-1 w-4" />
        Gerar Relatório
      </Button>
    </form>
  )
}
