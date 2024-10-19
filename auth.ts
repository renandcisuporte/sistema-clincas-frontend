import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      credentials: {
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
      if (token.accessToken) {
        const isToken = String(token.accessToken).split('.')[1]
        const tokenDec = JSON.parse(Buffer.from(isToken, 'base64').toString())

        const dateNowInSeconds = Math.floor(new Date().getTime() / 1000)
        const tokenIsNotExpired = dateNowInSeconds < tokenDec.exp
        if (tokenIsNotExpired) return { ...token, ...user }
      }

      const uri = `${process.env.NEXTAUTH_API_URL}/auth/refresh-token`
      const result = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.refreshToken}`
        }
      })

      const resultUser = await result.json()
      if (result.ok) {
        const { accessToken, refreshToken, ...rest } = resultUser.data
        token.accessToken = accessToken
        token.refreshToken = refreshToken

        return { ...token, ...rest }
      }

      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
} satisfies NextAuthOptions
