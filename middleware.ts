export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/clinics',
    '/dashboard',
    '/operational-capacity',
    '/rooms',
    '/peoples'
  ]
}
