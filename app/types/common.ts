export interface ChildrenProps {
  children: React.ReactNode
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ActionResponse<T = any> {
  data?: T[]
  errorMessage?: string
  fields?: {
    [key: string]: string
  }
}
