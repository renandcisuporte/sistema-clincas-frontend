import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { DailyCapacityClient } from './daily-capacity-client'

export async function DailyCapacityServer() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return <DailyCapacityClient data={data} />
}
