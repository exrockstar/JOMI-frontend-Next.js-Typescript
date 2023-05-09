import { IS_SERVER } from './constants'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Removes null or undefined or empty string properties form the object
 * @param obj
 * @returns T
 */
export function cleanObj<T>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      return v !== null && v !== '' && typeof v !== 'undefined'
    })
  ) as Partial<T>
}

export function cookieToObj() {
  if (IS_SERVER) return {}
  return Object.fromEntries(
    document.cookie.split(/; */).map((c) => {
      const [key, ...v] = c.split('=')
      return [key, decodeURIComponent(v.join('='))]
    })
  )
}

export function cleanParenthesis(text: string): string {
  return text.replace(/\(/g, '%28').replace(/\)/g, '%29')
}

export function removeDuplicates(array: any[]) {
  return [...new Set(array)]
}

export const removeTypeNameFromGQLResult = (result: Record<string, any>) => {
  return JSON.parse(
    JSON.stringify(result, (key, value) => {
      if (key === '__typename') return
      return value
    })
  )
}
