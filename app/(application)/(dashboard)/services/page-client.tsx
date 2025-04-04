"use client"

import { removeService, saveService } from "@/app/_actions/services"
import { ButtonSubmit } from "@/app/_components/common/button-submit"
import { InputLabel } from "@/app/_components/common/input"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { useToast } from "@/app/_hooks/use-toast"
import { Service } from "@/app/_types/services"
import { CircleX } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
} from "react-dom"

export interface ModalFormInterface {
  open: boolean
  data?: Service
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveService, {})
  const { errors } = state

  useEffect(() => {
    if (state?.errorMessage !== "OK") return
    toast({ title: "Atenção!", description: "Salvo com sucesso!" })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="h-auto !p-0 sm:max-w-sm [&>button]:hidden"
        onEscapeKeyDown={() => back()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <ScrollArea className="h-full">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Editar/Cadastrar</DialogTitle>
              <DialogDescription>
                Você pode editar ou cadastrar procedimentos no formulário
                abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" name="id" defaultValue={data?.id} />
              <InputLabel
                label="Procedimento *"
                message={errors?.name}
                type="text"
                name="name"
                defaultValue={data?.name}
              />

              <div className="w-full text-center">
                <ButtonSubmit />
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function ModalDelete({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(removeService, {})

  useEffect(() => {
    if (state?.errorMessage !== "OK") return
    toast({ title: "Atenção!", description: "Excluido com sucesso!" })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} onOpenChange={() => back()} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir?
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="float-right flex flex-col flex-wrap justify-end space-y-4 md:flex-row md:space-x-2"
        >
          <input type="hidden" name="id" defaultValue={data?.id} />
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <ButtonSubmit remove />
        </form>
      </DialogContent>
    </Dialog>
  )
}
