import { cn } from '@/app/_lib/utils'
import * as React from 'react'

import { Label } from '../ui/label'
import { Textarea, TextareaProps } from '../ui/textarea'

export interface TextLabelProps extends TextareaProps {
  label: string
  classHelper?: string
  message?: string | undefined
}

export function TextareaLabel({
  label,
  message,
  classHelper,
  ...rest
}: TextLabelProps & { classHelper?: string }) {
  const uId = React.useId()
  const id = rest.id ?? uId
  const restClass = rest.className

  return (
    <div
      className={cn(
        'flex flex-col w-full space-y-1',
        classHelper,
        message && 'text-red-800'
      )}
    >
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        {...rest}
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
