'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { ChartsInterface } from '@/app/_types/chart'

type AnnualCapacityClientProps = {
  data: ChartsInterface
}

export function AnnualCapacityClient({ data }: AnnualCapacityClientProps) {
  return (
    <Card className="h-full flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-md">Capacidade Anual</CardTitle>
        <CardDescription>
          Total de procedimento/ocioso anual que podem ser realiziados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-row justify-between items-center [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div>strong]:uppercase [&>div>strong]:text-xs [&>div>span]:text-6xl [&>div>span]:font-bold p-6">
        <div className="text-default">
          <strong>capacidade de procedimento</strong>
          <span>{data.annualCapacity?.procedure}</span>
        </div>

        <div className="text-danger">
          <strong>espaço total ocioso</strong>
          <span>{data.annualCapacity?.idleProcedure}</span>
        </div>
      </CardContent>
    </Card>
  )
}
