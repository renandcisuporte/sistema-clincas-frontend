import { Chart } from '@/app/components/chart'
import { apiFecth } from '@/app/lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

export interface ChartsInterface {
  fantasy: string
  title: string
  workHours: {
    week: string
    workHours: number
  }[]
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  const { data } = await apiFecth(`/clinics/charts`, {
    accessToken: session?.accessToken,
    next: { tags: [`clinics_charts`] }
  })

  return (
    <div className="flex space-x-4 flex-wrap">
      {data?.map((item: ChartsInterface) => (
        <div className="w-1/4" key={item.fantasy}>
          <Chart
            fantasy={item.fantasy}
            title={item.title}
            workHours={item.workHours}
          />
        </div>
      ))}
    </div>
  )
}
