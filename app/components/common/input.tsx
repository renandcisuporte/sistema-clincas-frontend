import { cn } from '@/app/lib/utils'
import * as React from 'react'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'

export interface InputLabelProps {
  label: string
  input: InputProps
  message?: string | undefined
}

export function InputLabel({
  input,
  label,
  message,
  className,
  ...rest
}: InputLabelProps & { className?: string }) {
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
      <Input
        {...input}
        id={id}
        className={cn(
          restClass,
          message && 'border-red-800 outline-none focus-visible:ring-red-400'
        )}
      />
      <small aria-label="police">{message}</small>
    </div>
  )
}
