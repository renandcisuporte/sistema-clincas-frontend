"use client"

import { Button } from "@/app/_components/ui/button"
import { BookOpenCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
  // @ts-ignore
  experimental_useFormStatus as useFormStatus,
} from "react-dom"
import { generateReport } from "./action"

export function PageClient() {
  const [checked, setChecked] = useState("nameAsc")

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
      <div className="flex flex-row items-center space-x-4">
        <input type="hidden" name={checked} value="true" />
        <div className="flex items-center space-x-2">
          <input
            id="asc"
            type="radio"
            checked={checked === "nameAsc"}
            onChange={() => setChecked("nameAsc")}
          />
          <label htmlFor="asc">Nome Produto - A-Z</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="desc"
            type="radio"
            checked={checked === "nameDesc"}
            onChange={() => setChecked("nameDesc")}
          />
          <label htmlFor="desc">Nome Produto - Z-A</label>
        </div>
      </div>

      <div className="h-4" />

      <Button type="submit" size="sm" disabled={pending}>
        <BookOpenCheck className="mr-1 w-4" />
        Gerar Relatório
      </Button>
    </form>
  )
}
