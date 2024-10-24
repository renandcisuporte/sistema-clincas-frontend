'use client'

import { SessionProvider as AuthSessionProvider } from 'next-auth/react'
import { ChildrenProps } from '../_types/common'

export function SessionProvider({ children }: ChildrenProps) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>
}
