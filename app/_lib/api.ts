export type ApiToken = { accessToken?: string } & RequestInit

export type ApiResponse<D = any, T = any> = {
  data?: D
  total?: T
  errorMessage?: string
  errors?: { [key: string]: string }
  [key: string]: unknown | any
}

export async function apiFecth(
  path: string,
  options: ApiToken
): Promise<ApiResponse> {
  const { headers = {}, accessToken, ...restOptions } = options

  const authHeaders = {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json' // Ajuste se necessário,
  }
  // Faz a requisição utilizando o fetch nativo com a URL base e o token
  const response = await fetch(`${process.env.NEXTAUTH_API_URL}${path}`, {
    ...restOptions,
    headers: authHeaders
  })
  // Verifica se a resposta é bem-sucedida
  if (!response.ok) {
    const { errorMessage, fields } = await response.json()
    return {
      errorMessage,
      errors: { ...fields }
    }
  }

  if (response.status === 204) {
    return { data: [] }
  }

  // Ou response.text(), dependendo do formato da resposta
  return await response.json()
}
