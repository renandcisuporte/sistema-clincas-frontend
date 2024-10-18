'use client'

import { cn } from '@/app/lib/utils'
import { ArrowDown, ArrowRight } from 'lucide-react'
import * as LinkNext from 'next/link'
import { usePathname } from 'next/navigation'
import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from 'react'

type Props = {
  children: React.ReactNode
  label?: string
  ['data-href']: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function LinkDropDown({ children, label, ...rest }: Props) {
  const [open, setOpen] = useState(false)

  const path = usePathname()
  const active = path.startsWith(rest['data-href'])

  const className = cn(active && '!bg-neutral-100 !text-black')

  const handleClick = useCallback(() => setOpen(!open), [open])

  return (
    <div {...rest} className={className}>
      <span onClick={handleClick}>
        {!open && <ArrowRight />}
        {open && <ArrowDown />}
        <span>{label ?? 'Administrativo'}</span>
      </span>
      <div data-open={open}>{children}</div>
    </div>
  )
}

export function Link({ ...rest }: Record<string, any>) {
  const path = usePathname()
  const url = rest.href.toString()
  const active = path.startsWith(url) || path.startsWith(rest['data-href'])

  const className = cn(active && '!bg-neutral-100 !text-black')

  return <LinkNext.default className={className} href={url} {...rest} />
}
