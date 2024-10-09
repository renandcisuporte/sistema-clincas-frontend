'use client'

import {
  // @ts-ignore
  experimental_useFormStatus as useFormStatus
} from 'react-dom'
import { Button, ButtonProps } from '../ui/button'

export function ButtonSubmit({
  remove,
  ...rest
}: ButtonProps & { remove?: boolean }) {
  const { pending } = useFormStatus()

  if (remove)
    return (
      <Button
        {...rest}
        type="submit"
        disabled={pending}
        variant="destructive"
        className="disabled:cursor-not-allowed"
      >
        {remove && pending ? 'Excluindo' : 'Excluir'}
      </Button>
    )

  return (
    <Button
      {...rest}
      type="submit"
      disabled={pending}
      className="disabled:cursor-not-allowed"
    >
      {pending ? 'Salvando Dados' : 'Salvar'}
    </Button>
  )
}
