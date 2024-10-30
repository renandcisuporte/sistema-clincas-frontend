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

export async function Speciality() {
  const session = await getServerSession(authOptions)

  const people = await apiFecth(`/peoples/active-inative`, {
    accessToken: session?.accessToken,
    next: { tags: [`peopless_active_inative`] }
  })

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2.5 sm:py-3">
          <CardTitle className="text-md">Profissionais</CardTitle>
          <CardDescription>
            <small>Total de profissionais</small>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-0 h-28">
        <span className="font-extrabold text-7xl w-full text-center">
          {people.data?.active}
        </span>
      </CardContent>
    </Card>
  )
}
