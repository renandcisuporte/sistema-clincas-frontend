import { Suspense } from 'react'
import { ChartLoading } from './_components/chart/chart-loading'
import { Chart } from './_components/chart/chart-server'
import { RoomLoading } from './_components/room/room-loading'
import { Room } from './_components/room/room-server'
import { Speciality } from './_components/speciality/speciality-server'

export default async function Page() {
  return (
    <div className="flex flex-row space-x-4 py-4">
      <div className="w-full mx-auto">
        <Suspense fallback={<ChartLoading />}>
          <Chart />
        </Suspense>
      </div>

      <div className="w-full max-w-64">
        <Suspense fallback={<RoomLoading />}>
          <Room />
        </Suspense>
      </div>
      <div className="w-full max-w-64">
        <Suspense fallback={<RoomLoading />}>
          <Speciality />
        </Suspense>
      </div>
    </div>
  )
}
