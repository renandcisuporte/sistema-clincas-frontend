export type ApiFecthOptions = { accessToken?: string } & RequestInit

export type ApiFecthResponse<T> = {
  data: T
  error?: string
}

export const apiFecth = async (
  endpoint: string,
  options: ApiFecthOptions
): Promise<ApiFecthResponse<any>> => {
  const { headers = {}, accessToken, ...restOptions } = options

  const authHeaders = {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json' // Ajuste se necessário,
  }

  // Faz a requisição utilizando o fetch nativo com a URL base e o token
  const response = await fetch(`${process.env.NEXTAUTH_API_URL}${endpoint}`, {
    ...restOptions,
    headers: authHeaders
  })

  // Verifica se a resposta é bem-sucedida
  if (!response.ok) {
    return { data: [], error: `Erro na requisição: ${response.statusText}` }
  }

  return response.json() // Ou response.text(), dependendo do formato da resposta
}
