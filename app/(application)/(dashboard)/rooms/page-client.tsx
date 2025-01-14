"use client"

import { removeRoom, saveRoom } from "@/app/_actions/rooms"
import { ButtonSubmit } from "@/app/_components/common/button-submit"
import { InputLabel } from "@/app/_components/common/input"
import { TextareaLabel } from "@/app/_components/common/textarea"
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
import { Room } from "@/app/_types/rooms"
import { CircleX } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  // @ts-ignore
  experimental_useFormState as useFormState,
} from "react-dom"

export interface ModalFormInterface {
  open: boolean
  data?: Room
}

export function ModalForm({ open, data }: ModalFormInterface) {
  const { back } = useRouter()
  const { toast } = useToast()

  const [state, formAction] = useFormState(saveRoom, {})
  const { errors } = state

  useEffect(() => {
    if (state?.errorMessage !== "OK") return
    toast({ title: "Atenção!", description: "Salvo com sucesso!" })
    back()
  }, [state, back, toast])

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="!p-0 sm:max-w-[767px] [&>button]:hidden"
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
                Você pode editar ou cadastrar uma sala no formulário abaixo.
              </DialogDescription>
            </DialogHeader>
            <form
              action={formAction}
              className="flex flex-col flex-wrap space-y-4 md:flex-row"
            >
              <input type="hidden" name="id" defaultValue={data?.id} />
              <InputLabel
                label="Cód *"
                classHelper="md:basis-24"
                message={errors?.code}
                type="text"
                name="code"
                defaultValue={data?.code}
              />

              <InputLabel
                label="Sala *"
                message={errors?.room}
                classHelper="md:basis-80 md:ml-4"
                type="text"
                name="room"
                defaultValue={data?.room}
              />

              {/* <InputLabel
                label="Tempo de Atendimento"
                className="md:basis-40 md:ml-4"
                message={errors?.averageService}
                input={{
                  type: 'time',
                  name: 'averageService',
                  defaultValue: data?.averageService
                }}
              /> */}

              <TextareaLabel
                label="Descrição"
                message={errors?.description}
                name="description"
                defaultValue={data?.description}
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

  const [state, formAction] = useFormState(removeRoom, {})

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
          <input type="hidden" name="id" value={data?.id} />
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
