import { PageClient } from '@/app/(application)/(auth)/login/page-client'
import { Icon } from '@/app/components/common/icon'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-svh flex flex-col items-center justify-center bg-[size:cover] bg-[image:url(/bg-login-mobile.jpg)] md:bg-[image:url(/bg-login.jpg)] px-6 md:px-0">
      <PageClient />
      <address className="text-white p-4 text-md absolute bottom-0 left-0 w-full flex items-center justify-between [&>aside]:flex [&>aside]:flex-row [&>aside]:items-center [&>aside]:space-x-2 [&>aside]:uppercase [&>aside]:leading-4 bg-default">
        <aside>
          <Icon.whatsapp className="w-8 h-8 fill-white" />
          <span>
            suporte:
            <br />
            16 99760-3861
          </span>
        </aside>
        <aside>
          <span>Tecnologia Desenvolvida por:</span>
          <Image
            alt="Data Control Informática LTDA"
            src="/rubrica.png?v=as"
            width={125}
            height={95}
            quality={100}
            className="w-28 h-auto"
          />
        </aside>
      </address>
    </div>
  )
}
