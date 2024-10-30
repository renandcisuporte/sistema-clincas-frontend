import { Suspense } from 'react'
import { AverageTime } from './_components/average-time'
import { ChartLoading } from './_components/chart/chart-loading'
import { Chart } from './_components/chart/chart-server'
import { AnnualCapacityServer } from './_components/operational-capacity/annual-capacity-serve'
import { DailyCapacityServer } from './_components/operational-capacity/daily-capacity-serve'
import { MonthlyCapacityServer } from './_components/operational-capacity/monthly-capacity-serve'
import { WeeklyCapacityServer } from './_components/operational-capacity/weekly-capacity-serve'
import { RoomLoading } from './_components/room/room-loading'
import { Room } from './_components/room/room-server'
import { Speciality } from './_components/speciality/speciality-server'

export default async function Page() {
  return (
    <div className="flex flex-row flex-wrap items-stretch">
      <div className="flex-1 mx-auto p-4">
        <Suspense fallback={<ChartLoading />}>
          <Chart />
        </Suspense>
      </div>
      <div className="max-w-lg flex flex-row flex-wrap">
        <div className="w-full p-4 ">
          <Suspense fallback={<>Carregando status...</>}>
            <AverageTime />
          </Suspense>
        </div>
        <div className="w-[50%] p-4">
          <Suspense fallback={<RoomLoading />}>
            <Room />
          </Suspense>
        </div>
        <div className="w-[50%] p-4">
          <Suspense fallback={<RoomLoading />}>
            <Speciality />
          </Suspense>
        </div>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <DailyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <WeeklyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <MonthlyCapacityServer />
        </Suspense>
      </div>
      <div className="w-[50%] p-4">
        <Suspense fallback={<>Carregando status...</>}>
          <AnnualCapacityServer />
        </Suspense>
      </div>
    </div>
  )
}
