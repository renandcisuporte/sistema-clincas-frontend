"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
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
import { Service } from "./page"

export function PageClient({ data }: { data: Service[] }) {
  const [checked, setChecked] = useState("nameAsc")
  const [selected, setSelected] = useState<Service>()

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
        <input type="hidden" name="serviceId" defaultValue={selected?.id} />

        <Select
          onValueChange={(value) =>
            setSelected(data.find((item) => item.id === value))
          }
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione o procedimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Todos</SelectItem>
            {data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
