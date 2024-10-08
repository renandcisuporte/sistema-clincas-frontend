'use client'

import {
  // @ts-ignore
  experimental_useFormStatus as useFormStatus
} from 'react-dom'
import { Button } from '../ui/button'

export function ButtonSubmit() {
  const { pending } = useFormStatus()

  return (
    <Button size="full" disabled={pending}>
      {pending ? 'Salvando Dados' : 'Salvar'}
    </Button>
  )
}
