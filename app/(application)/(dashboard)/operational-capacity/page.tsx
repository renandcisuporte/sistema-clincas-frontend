import { Chart } from '@/app/components/chart'
import { apiFecth } from '@/app/lib/api'
import { ChartsInterface } from '@/app/types/chart'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return (
    <div className="flex flex-col">
      {data?.map((item: ChartsInterface) => (
        <div className="p-4 w-full max-w-3xl mx-auto" key={item.fantasy}>
          <Chart
            title={item.title}
            fantasy={item.fantasy}
            workHours={item.workHours}
          />
        </div>
      ))}
    </div>
  )
}
