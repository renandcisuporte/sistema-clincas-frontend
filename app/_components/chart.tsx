'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/app/_components/ui/chart'

import { ChartsInterface } from '@/app/_types/chart'
import { Check, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { cn } from '../_lib/utils'

export const description = 'A bar chart with a label'

const chartConfig = {
  workTime: {
    label: 'Trabalhadas',
    color: 'hsl(var(--chart-2))'
  },
  workTimeRecommend: {
    label: 'Recomendadas',
    color: 'hsl(var(--chart-1))'
  },
  workTimeService: {
    label: 'Recomendadas',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export function Chart(props: ChartsInterface) {
  const { fantasy, workHours } = props

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('workTime')

  const total = React.useMemo(
    () => ({
      workTime: workHours.reduce((acc, curr) => acc + curr.workTime, 0),
      workTimeRecommend: workHours.reduce(
        (acc, curr) => acc + curr.workTimeRecommend,
        0
      ),
      workTimeService: workHours.reduce(
        (acc, curr) => acc + curr.workTimeService,
        0
      )
    }),
    [workHours]
  )

  const sumHours = total.workTimeRecommend - total.workTime
  const sumHoursPositive = sumHours <= -1 ? sumHours * -1 : sumHours

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-sm">{fantasy}</CardTitle>
          <CardDescription>
            <small>Total de horas trabalhadas/recomendadas semanalmente</small>
          </CardDescription>
        </div>
        <div className="flex">
          {['workTime', 'workTimeRecommend'].map((key) => {
            const chart = key as keyof typeof chartConfig

            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-4 sm:py-3"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground w-full">
                  {chartConfig[chart].label}
                </span>
                <span className="text-md font-bold leading-none sm:text-2xl w-full">
                  <span
                    className={cn(`w-4 h-4 inline-block mr-1`)}
                    style={{
                      backgroundColor: chartConfig[chart].color
                    }}
                  />
                  {total[key as keyof typeof total].toLocaleString()}hs
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={workHours}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  labelFormatter={(value) => `${value}h`}
                />
              }
            />
            <Bar dataKey="workTime" fill="var(--color-workTime)" radius={4} />
            <Bar
              dataKey="workTimeRecommend"
              fill="var(--color-workTimeRecommend)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {sumHours === 0 && (
            <>
              Jornada ideal <Check className="h-4 w-4" />
            </>
          )}
          {sumHours <= -1 && (
            <>
              Tempo de trabalho {sumHoursPositive}hs{' '}
              <TrendingDown className="h-4 w-4" />
            </>
          )}
          {sumHours > 0 && (
            <>
              Tempo ocioso {sumHoursPositive}hs{' '}
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {sumHours == 0 && (
            <>A empresa está trabalhando na capacidade operacional ideal.</>
          )}

          {sumHours <= -1 && (
            <>
              A empresa está trabalhando {Number(sumHours * -1)}hs a mais do que
              a capacidade operacional planejada.
            </>
          )}

          {sumHours > 0 && (
            <>A empresa tem {sumHours}hs disponivéis de trabalho na semana.</>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
