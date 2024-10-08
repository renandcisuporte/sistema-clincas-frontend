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
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_API_URL}/auth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })

        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user.data
        }

        // Return null if user data could not be retrieved
        const message = JSON.stringify({
          error: { ...user.response.data },
          code: user.response.status
        })

        throw new Error(message)
      }
    })
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('ESTOU AQUI')
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return true
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
} satisfies NextAuthOptions
