import { cn } from '@/app/_lib/utils'
import * as React from 'react'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'

export interface InputLabelProps extends InputProps {
  label?: string
  message?: string | undefined
  classHelper?: string
}

export function InputLabel({
  label,
  message,
  classHelper,
  ...rest
}: InputLabelProps & {}) {
  const uId = React.useId()
  const id = rest.id ?? uId
  const restClass = rest.className ?? ''

  return (
    <div
      className={cn(
        'flex flex-col w-full space-y-1',
        classHelper,
        message && 'text-red-800'
      )}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
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
