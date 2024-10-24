import { findClinics } from '@/app/_actions/clinics'
import { ModalWorkTimes } from '../_components/modal-worktimes'
import { ModalWorkTimesRecommended } from '../_components/modal-worktimes-recommended'
import { PageClient } from './page-client'

export type ParamsProps = {
  params: { page: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: ParamsProps) {
  const { page } = params
  const { modal } = searchParams

  const pathUri = page[page.length - 1]

  switch (pathUri) {
    case 'update':
      const { data } = await findClinics(params?.page[0])

      return (
        <>
          <PageClient input={data} />
          {modal === 'work_times' && (
            <ModalWorkTimes
              open={modal === 'work_times'}
              input={data?.workTimes}
            />
          )}
          {modal === 'work_times_recommended' && (
            <ModalWorkTimesRecommended
              open={modal === 'work_times_recommended'}
              input={data?.workTimesRecommended}
            />
          )}
        </>
      )
    case 'create':
      return <PageClient />
    default:
      return <div>Oops</div>
  }
}
