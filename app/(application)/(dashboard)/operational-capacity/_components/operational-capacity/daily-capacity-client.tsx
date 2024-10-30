'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { weeks } from '@/app/_contants'
import { ChartsInterface } from '@/app/_types/chart'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useState } from 'react'

type DailyCapacityClientProps = {
  data: ChartsInterface
}

export function DailyCapacityClient({ data }: DailyCapacityClientProps) {
  const date = new Date()
  const [week, setWeek] = useState(date.getDay())

  const handleWeek = useCallback(
    (type: 'prev' | 'next') =>
      setWeek((old) => {
        if (type === 'next' && old < 6) {
          return old + 1
        } else if (type === 'prev' && old > 0) {
          return old - 1
        }
        return old // Retorna o valor atual se estiver fora dos limites
      }),
    []
  )

  return (
    <Card className="h-full flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-md">Capacidade Diária</CardTitle>
        <CardDescription>
          Este gráfico mostra o total que a empresa {data.fantasy} pode
          realiziar de procedimento esteticos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <ChevronLeft
            className="border p-2 rounded-md w-8 h-8 cursor-pointer"
            onClick={() => handleWeek('prev')}
          />
          <span className="font-bold border p-2 rounded-md">
            {weeks.find((_, index) => index === week)?.week}
          </span>
          <ChevronRight
            className="border p-2 rounded-md w-8 h-8 cursor-pointer"
            onClick={() => handleWeek('next')}
          />
        </div>
        <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div>strong]:uppercase [&>div>strong]:text-xs [&>div>span]:text-6xl [&>div>span]:font-bold space-x-4">
          <div className="text-default">
            <strong>capacidade de procedimento</strong>
            <span>
              {
                data.workHours.find((_, index) => index === week)
                  ?.dailyProcedure
              }
            </span>
          </div>

          <div className="text-danger">
            <strong>espaço total ocioso</strong>
            <span>
              {
                data.workHours.find((_, index) => index === week)
                  ?.dailyIdleProcedure
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
