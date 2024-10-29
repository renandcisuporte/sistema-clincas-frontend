import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { CalculateDimanicClient } from './calculate-dimanic-client'

export async function Component() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return <CalculateDimanicClient data={data} />
}
