import { apiFecth } from "@/app/_lib/api"
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { FormExpensesClient } from "../_components/form-expenses-client"

type Props = {
  params: {
    expenses: string
  }
}

export default async function Page({ params }: Props) {
  const { expenses } = params

  const session = await getServerSession(authOptions)

  const [expense, realese] = await Promise.all([
    apiFecth(`/expenses/all?type=${expenses}&active=true&limit=1000`, {
      accessToken: session?.accessToken,
      next: { tags: ["expenses"] },
      cache: "no-cache",
    }),
    apiFecth(`/realeses/${expenses}`, {
      accessToken: session?.accessToken,
      next: { tags: ["realeses"] },
      cache: "no-cache",
    }),
  ])

  switch (expenses) {
    case "variable":
      return <>Var{JSON.stringify(expense)}</>
    case "fixed":
      return (
        <FormExpensesClient expenses={expense.data} realeses={realese.data} />
      )
    default:
      return <>Selecione os tipo um tipo de lançamento</>
  }
}
