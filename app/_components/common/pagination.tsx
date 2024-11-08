import Link from "next/link"
import { buttonVariants } from "../ui/button"

type Props = {
  [x: string]: string | number
}

export function Pagination({ limit, total, page, ...rest }: Props) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-end space-x-4">
      <span>PAGINAÇÃO:</span>
      <Link
        href={{
          query: {
            page: +page - 1 === 0 ? 1 : +page - 1,
            limit,
            ...rest,
          },
        }}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Anterior
      </Link>
      <span>{page}</span>
      <Link
        href={{
          query: {
            page: +total === +limit ? +page + 1 : +page,
            limit,
            ...rest,
          },
        }}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Próxima
      </Link>
    </div>
  )
}
