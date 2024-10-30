import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { AnnualCapacityClient } from './annual-capacity-client'

export async function AnnualCapacityServer() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return <AnnualCapacityClient data={data} />
}
