import { PageClient } from '@/app/(auth)/login/page-client'
import { loginAction } from '@/app/_actions/login'

export default async function Home() {
  return (
    <div className="h-svh flex flex-col items-center justify-center bg-[size:cover] bg-[image:url(/bg-login-mobile.jpg)] md:bg-[image:url(/bg-login.jpg)] px-6 md:px-0">
      <PageClient action={loginAction} />
    </div>
  )
}
