import { cn } from '@/app/_lib/utils'
import * as React from 'react'

import { Label } from '../ui/label'
import { Textarea, TextareaProps } from '../ui/textarea'

export interface TextLabelProps {
  label: string
  input: TextareaProps
  message?: string | undefined
}

export function TextareaLabel({
  input,
  label,
  message,
  className,
  ...rest
}: TextLabelProps & { className?: string }) {
  const uId = React.useId()
  const id = input.id ?? uId
  const restClass = input.className

  return (
    <div
      className={cn(
        'flex flex-col w-full space-y-1',
        className,
        message && 'text-red-800'
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        {...input}
        className={cn(
          restClass,
          message && 'border-red-800 outline-none focus-visible:ring-red-400'
        )}
        id={id}
      />
      <small aria-label="police">{message}</small>
    </div>
  )
}
