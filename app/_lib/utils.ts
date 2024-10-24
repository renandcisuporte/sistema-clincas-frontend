import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskDocument(str: string): string {
  let doc = str.replace(/\D/g, '')
  if (doc.length <= 11) {
    return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4')
  }

  return doc.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/,
    '$1.$2.$3/$4-$5'
  )
}

export function maskPhone(str: string): string {
  let phone = str.replace(/\D/g, '')

  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return phone.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}

export function maskZipCode(str: string): string {
  let zipCode = str.replace(/\D/g, '')
  return zipCode.replace(/(\d{5})(\d{3})$/, '$1-$2')
}

const handleObjectValue = (
  obj: { [key: string]: any },
  path: string[],
  value: string
) => {
  path.reduce((acc, key, index) => {
    acc[key] = index === path.length - 1 ? value : acc[key] ?? {}
    return acc[key]
  }, obj)
}

export function handleTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(':')
  return parseInt(hours) * 60 + parseInt(minutes)
}

export function handleCalculateToHours(
  times: Record<string, any>[],
  open: boolean
): number {
  if (open) return 0

  let openMinute = 0
  let closedMinute = 0
  let totalMinutes = 0
  times.forEach(({ description, time }: any) => {
    if (description === 'Abre à(s)') openMinute = handleTimeToMinutes(time)
    if (description === 'Fecha à(s)') closedMinute = handleTimeToMinutes(time)
    if (openMinute && closedMinute) {
      totalMinutes += closedMinute - openMinute
    }
  })

  // Converte o total de minutos em horas
  return totalMinutes / 60
}

export const handleError = (
  errors: {
    path: string[]
    message: string
  }[]
) => {
  return errors.reduce((prev: { [key: string]: any }, issue: any) => {
    handleObjectValue(prev, issue.path, issue.message)
    return prev
  }, {})
}
