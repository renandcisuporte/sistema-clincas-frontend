import { findClinics } from '@/app/actions/clinics'
import { ModalWorkTimes } from '../_components/modal-worktimes'
import { PageClient } from './page-client'

export type ParamsProps = {
  params: { page: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: ParamsProps) {
  const { page } = params
  const { modal, id } = searchParams

  const pathUri = page[page.length - 1]

  switch (pathUri) {
    case 'update':
      const { data } = await findClinics(params?.page[0])

      return (
        <>
          <PageClient input={data} />
          {modal === 'open' && (
            <ModalWorkTimes open={modal === 'open'} input={data?.workTimes} />
          )}
        </>
      )
    case 'create':
      return <PageClient />
    default:
      return <div>Oops</div>
  }
}
