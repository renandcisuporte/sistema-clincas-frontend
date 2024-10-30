import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { WeeklyCapacityClient } from './weekly-capacity-client'

export async function WeeklyCapacityServer() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return <WeeklyCapacityClient data={data} />
}
