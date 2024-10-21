import { findClinics } from '@/app/actions/clinics'
import { buttonVariants } from '@/app/components/ui/button'
import { cn } from '@/app/lib/utils'
import { SearchParamsProps } from '@/app/types/common'
import { authOptions } from '@/auth'
import { Clock } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ModalWorkTimes } from './_components/modal-worktimes'
import { ModalWorkTimesRecommended } from './_components/modal-worktimes-recommended'

export default async function Page({ searchParams }: SearchParamsProps) {
  const session = await getServerSession(authOptions)
  const { modal } = searchParams

  if (!session) return null
  const { clinicId } = session

  const { data } = await findClinics(clinicId)

  return (
    <div className="flex flex-col md:flex-row flex-wrap space-y-4">
      <div className="border-b border-neutral-300 w-full mb-4 flex flex-row items-center justify-between pb-4">
        <h2 className="text-xl">Clinica - {data?.title}</h2>
      </div>

      <Link
        href={{
          pathname: `/jobs-works`,
          query: {
            clinicId,
            modal: 'work_times'
          }
        }}
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'mr-4'
        )}
        type="button"
      >
        <Clock className="w-4 mr-1" />
        Horário de Funcionamento
      </Link>
      <Link
        href={{
          pathname: `/jobs-works`,
          query: {
            clinicId,
            modal: 'work_times_recommended'
          }
        }}
        className={cn(
          buttonVariants({ variant: 'destructive', size: 'lg' }),
          'mr-4'
        )}
        type="button"
      >
        <Clock className="w-4 mr-1" />
        Horário Recomendado
      </Link>

      {modal === 'work_times' && (
        <ModalWorkTimes open={modal === 'work_times'} input={data?.workTimes} />
      )}
      {modal === 'work_times_recommended' && (
        <ModalWorkTimesRecommended
          open={modal === 'work_times_recommended'}
          input={data?.workTimesRecommended}
        />
      )}
    </div>
  )
}
