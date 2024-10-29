import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { apiFecth } from '@/app/_lib/api'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

export async function Room() {
  const session = await getServerSession(authOptions)

  const rooms = await apiFecth(`/rooms`, {
    accessToken: session?.accessToken,
    next: { tags: [`rooms_charts`] }
  })

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-sm">Salas</CardTitle>
          <CardDescription>
            <small>Total de salas atualmente</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between p-0 h-28">
        {[
          { active: 'Ativas', bg: '--chart-2' },
          { inative: 'Inativas', bg: '--chart-1' }
        ].map((item) => {
          const key = Object.keys(item)[0]
          const value = Object.values(item)[0]
          return (
            <div
              key={key}
              className="flex w-[50%] flex-col px-3 py-2 text-center even:border-l data-[active=true]:bg-muted/50 sm:px-4 sm:py-3"
            >
              <span className="text-xs text-muted-foreground w-full">
                {value}
              </span>
              <span
                className="font-extrabold text-7xl w-full"
                style={{
                  color: `hsl(var(${item.bg}))`
                }}
              >
                {rooms[key]}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
