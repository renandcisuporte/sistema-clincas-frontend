import { cn } from '@/app/_lib/utils'
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
  ...rest
}: InputLabelProps) {
  const uId = React.useId()
  const id = input.id ?? uId

  const restClass = input.className

  return (
    <div className="grid w-full items-center space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...input}
        className={cn(
          restClass,
          message && 'border-red-800 outline-none focus-visible:ring-red-400'
        )}
        id={id}
      />
      <small aria-label="police" className="text-red-800">
        {message}
      </small>
    </div>
  )
}
