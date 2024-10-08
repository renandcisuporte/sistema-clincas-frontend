'use client'

import { ButtonSubmit } from '@/app/components/common/button-submit'
import { InputLabel } from '@/app/components/common/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/components/ui/dialog'
import { apiFecth, ApiFecthResponse } from '@/app/lib/api'
import { Clinic } from '@/app/types/clinics'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

export function DialogPageClient({ open }: { open: boolean }) {
  const [clinic, setClinic] = React.useState<Clinic>()
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()

  const loadClinic = async (id: string): Promise<ApiFecthResponse<Clinic>> => {
    const result = await apiFecth(`/clinics/${id}`, {
      accessToken: session.data?.accessToken,
      next: { tags: [`clinic_${id}`] },
      cache: 'no-cache'
    })

    return result
  }

  const handleOpenChange = () => router.back()

  React.useEffect(() => {
    const id = params.get('id')
    if (id) {
      loadClinic(id).then((res) => {
        if (res.data) {
          setClinic(res.data)
        }
      })
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[767px]">
        <DialogHeader>
          <DialogTitle>Editar/Cadastrar</DialogTitle>
          <DialogDescription>
            Você poode editar ou cadastrar uma clinica no formulário abaixo.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-4">
          <InputLabel
            label="Titulo da Empresa"
            input={{
              type: 'text',
              value: clinic?.title
            }}
          />

          <InputLabel
            label="Nome Fantasia"
            input={{
              type: 'text',
              value: clinic?.fantasy
            }}
          />

          <InputLabel
            label="Nome Fantasia"
            input={{
              type: 'text',
              value: clinic?.fantasy
            }}
          />
        </form>
        <DialogFooter>
          <ButtonSubmit />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
