'use client'

import { Power } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function LogOut() {
  return (
    <Power
      onClick={() => signOut({ callbackUrl: '/dashboard' })}
      className="cursor-pointer"
    />
  )
}
