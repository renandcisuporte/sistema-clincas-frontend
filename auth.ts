import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      credentials: {
        code: { label: 'Code', type: 'text', placeholder: '000-000' },
        email: { label: 'Username', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, _) {
        const res = await fetch(`${process.env.NEXTAUTH_API_URL}/auth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })

        const user = await res.json()
        if (res.ok && user) {
          return user.data
        }

        const message = JSON.stringify({
          error: { ...user.response.data },
          code: user.response.status
        })

        throw new Error(message)
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token && token.accessToken) {
        const isToken = String(token.accessToken).split('.')[1]
        const tokenDec = JSON.parse(Buffer.from(isToken, 'base64').toString())
        const dateNowInSeconds = Math.floor(new Date().getTime() / 1000)
        const tokenIsExpired = dateNowInSeconds > tokenDec.exp

        if (tokenIsExpired) {
          const result = await fetch(
            `${process.env.NEXTAUTH_API_URL}/auth/refresh-token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.refreshToken}`
              },
              body: JSON.stringify({})
            }
          )

          const resultUser = await result.json()

          if (result.ok && resultUser) {
            const { accessToken, ...rest } = resultUser.data
            token.accessToken = accessToken

            return { ...token, ...rest }
          }
        }

        return {
          clinicId: tokenDec.clinicId,
          ...token,
          user: {
            ...tokenDec.user
          }
        }
      }

      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.clinicId = token.clinicId as string
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.user = token.user as any

      return {
        ...session
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
} satisfies NextAuthOptions
