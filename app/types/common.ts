export interface ChildrenProps {
  children: React.ReactNode
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ActionResponse {
  errors?: { [key: string]: string }
  message?: string
}
