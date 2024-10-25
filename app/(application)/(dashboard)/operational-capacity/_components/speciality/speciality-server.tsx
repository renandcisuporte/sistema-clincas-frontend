import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'

export async function Speciality() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-sm">Profissionais</CardTitle>
          <CardDescription>
            <small>Total de profissionais</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between p-0">
        <div className="flex w-full flex-col px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:px-4 sm:py-3">
          <span className="font-extrabold text-7xl w-full">0</span>
        </div>
      </CardContent>
    </Card>
  )
}
