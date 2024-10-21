'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function LogOut() {
  return (
    <span onClick={() => signOut({ callbackUrl: '/login' })}>
      <LogOutIcon strokeWidth={2} className="cursor-pointer" />
      <span>Sair</span>
    </span>
  )
}
