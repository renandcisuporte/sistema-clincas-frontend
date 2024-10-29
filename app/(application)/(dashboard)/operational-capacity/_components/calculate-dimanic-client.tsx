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

type CalculateDimanicClientProps = {
  data: ChartsInterface
}

export function CalculateDimanicClient({ data }: CalculateDimanicClientProps) {
  const [week, setWeek] = useState(0)

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
    <Card>
      <CardHeader>
        <CardTitle>Capacidade Operacional Diario</CardTitle>
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
          <div>
            <strong>capacidade de procedimento por dia</strong>
            <span>
              {
                data.workHours.find((_, index) => index === week)
                  ?.dailyProcedure
              }
            </span>
          </div>

          <div>
            <strong>espaço total ocioso por dia</strong>
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
