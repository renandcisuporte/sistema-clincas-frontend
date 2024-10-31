import { cn } from '@/app/_lib/utils'
import * as React from 'react'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel as SelectLabelOthers,
  SelectProps,
  SelectTrigger,
  SelectValue
} from '../ui/select'

export interface SelectLabelProps {
  label?: string
  select: SelectProps
  options: { label: string; value: string }[]
  message?: string | undefined
}

export function SelectLabel({
  select,
  label,
  message,
  className,
  ...rest
}: SelectLabelProps & { className?: string }) {
  const uId = React.useId()
  const id = select.id ?? uId
  const restClass = select.className

  return (
    <div
      className={cn(
        'flex flex-col w-full space-y-1',
        className,
        message && 'text-red-800'
      )}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabelOthers></SelectLabelOthers>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <small aria-label="police">{message}</small>
    </div>
  )
}
