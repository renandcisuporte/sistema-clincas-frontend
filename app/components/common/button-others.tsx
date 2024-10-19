'use client'

import { Power } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function LogOut() {
  return (
    <Power
      strokeWidth={4}
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="cursor-pointer text-white"
    />
  )
}
