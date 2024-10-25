import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

import { ChartClient } from './chart-client'

export async function Chart() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return (
    <ChartClient
      title={data.title}
      fantasy={data.fantasy}
      workHours={data.workHours}
    />
  )
}
