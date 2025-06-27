export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return <div className="flex flex-wrap space-x-4">Olá, Bem Vindo</div>
}
