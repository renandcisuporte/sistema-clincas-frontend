'use client'

import { typesExpense } from '@/app/_actions/expenses'
import { Button } from '@/app/_components/ui/button'
import { cn } from '@/app/_lib/utils'
import { startTransition } from 'react'

type Props = {
  id: string
  type: string
}

export function TypeExpense({ id, type }: Props) {
  async function handleClick() {
    startTransition(async () => {
      await typesExpense(id)
    })
  }

  return (
    <Button
      size="sm"
      onClick={handleClick}
      className={cn(
        type === 'fixed' && 'bg-default/50 text-default hover:bg-default/50',
        type === 'variable' && 'bg-danger/50 text-danger hover:bg-danger/50'
      )}
    >
      {type === 'fixed' && 'Fixa'}
      {type === 'variable' && 'Variável'}
    </Button>
  )
}
