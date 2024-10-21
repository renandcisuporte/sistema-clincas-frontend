import 'next-auth'

interface UserCommon {
  id: string
  email: string
  fullName: string
  coverImage: string
  admin: string
  roules: string[]
}

interface JWTCommon {
  clinicId: string
  accessToken: string
  refreshToken: string
}

declare module 'next-auth' {
  interface Session extends JWTCommon {
    user: UserCommon
  }

  interface JWT extends UserCommon, JWTCommon {}

  interface User extends UserCommon, JWTCommon {}
}
