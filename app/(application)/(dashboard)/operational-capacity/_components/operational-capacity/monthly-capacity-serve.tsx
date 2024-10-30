import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { MonthlyCapacityClient } from './monthly-capacity-client'

export async function MonthlyCapacityServer() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return <MonthlyCapacityClient data={data} />
}
