import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskPrice(value: any): string {
  // Remove qualquer caractere que não seja número ou vírgula
  value = String(value).replace(/\D/g, "")
  // Converte o value para centavos e adiciona o símbolo de moeda R$
  value = (parseFloat(value) / 100).toFixed(2).toString()
  // Formata o value para o formato Real (R$ 0.000,00)
  value = value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return `${value}`
}

export function maskDocument(str: string): string {
  let doc = str.replace(/\D/g, "")
  if (doc.length <= 11) {
    return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
  }

  return doc.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/,
    "$1.$2.$3/$4-$5",
  )
}

export function maskPhone(str: string): string {
  let phone = str.replace(/\D/g, "")

  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
  }

  return phone.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
}

export function maskZipCode(str: string): string {
  let zipCode = str.replace(/\D/g, "")
  return zipCode.replace(/(\d{5})(\d{3})$/, "$1-$2")
}

export function handleObjectValue(
  obj: { [key: string]: any },
  path: string[],
  value: string,
) {
  path.reduce((acc, key, index) => {
    acc[key] = index === path.length - 1 ? value : (acc[key] ?? {})
    return acc[key]
  }, obj)
}

export function handleTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":")
  return parseInt(hours) * 60 + parseInt(minutes)
}

export function handleCalculateToHours(
  times: Record<string, any>[],
  open: boolean,
): number {
  if (open) return 0

  let openMinute = 0
  let closedMinute = 0
  let totalMinutes = 0
  times.forEach(({ description, time }: any) => {
    if (description === "Abre à(s)") openMinute = handleTimeToMinutes(time)
    if (description === "Fecha à(s)") closedMinute = handleTimeToMinutes(time)
    if (openMinute && closedMinute) {
      totalMinutes += closedMinute - openMinute
    }
  })

  // Converte o total de minutos em horas
  return totalMinutes / 60
}

export function handleError(
  errors: {
    path: string[]
    message: string
  }[],
) {
  return errors.reduce((prev: { [key: string]: any }, issue: any) => {
    handleObjectValue(prev, issue.path, issue.message)
    return prev
  }, {})
}

/**
 *
 * @param data Converte um objeto com chaves aninhadas em um objeto com chaves simples
 * @returns
 */
export function dataToJson(data: FormData): Record<string, any> {
  return Array.from(data).reduce((object: Record<string, any>, pair) => {
    let keys = pair[0].replace(/\]/g, "").split("[")
    let key = keys[0]
    let value = pair[1]

    if (keys.length > 1) {
      let i: number, x: string, segment: any
      let last = value
      let type = isNaN(Number(keys[1])) ? {} : []

      value = segment = object[key] || type

      for (i = 1; i < keys.length; i++) {
        x = keys[i]

        if (i === keys.length - 1) {
          if (Array.isArray(segment)) {
            segment.push(last)
          } else {
            segment[x] = last
          }
        } else if (segment[x] === undefined) {
          segment[x] = isNaN(Number(keys[i + 1])) ? {} : []
        }

        segment = segment[x]
      }
    }

    object[key] = value

    return object
  }, {})
}
