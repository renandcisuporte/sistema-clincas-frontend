'use client'

import { cn } from '@/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav({ ...rest }) {
  const path = usePathname()
  const url = rest.href
  const active = path.startsWith(url)

  return (
    <Link
      className={cn(
        // 'before:absolute before:bottom-[0%] before:right-0 before:mb-0 before:-mr-2 before:rounded-full before:bg-[red] before:block before:w-4 before:h-4',
        'py-3 px-4 text-white bg-neutral-900 w-full relative',
        'bg-default hover:bg-neutral-100 hover:text-black',

        // active && bgDefault100 && `bg-[${bgDefault100}]/2`
        active && 'bg-neutral-100 text-black'
        // 'hover:bg-neutral-100 hover:text-black'
      )}
      href={url}
      {...rest}
    />
  )
}
