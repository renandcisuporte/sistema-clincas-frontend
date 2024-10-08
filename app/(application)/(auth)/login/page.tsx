import { PageClient } from '@/app/(application)/(auth)/login/page-client'

export default function Home() {
  return (
    <div className="h-svh flex flex-col items-center justify-center bg-[size:cover] bg-[image:url(/bg-login-mobile.jpg)] md:bg-[image:url(/bg-login.jpg)] px-6 md:px-0">
      <PageClient />
    </div>
  )
}
