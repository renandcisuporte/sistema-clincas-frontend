'use client'

import { cn } from '@/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav({ ...rest }) {
  const path = usePathname()
  const url = rest.href
  const active = path == url

  return (
    <Link
      className={cn(
        '-ml-4 py-3 px-4 border-l-8 border-neutral-800 bg-neutral-300 rounded-e-sm w-full',
        active && 'bg-neutral-500'
      )}
      href={url}
      {...rest}
    />
  )
}
