import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      fullName: string
    }
    accessToken: string
    refreshToken: string
  }
}
