import { IS_SERVER } from 'common/constants'

export function getCookies() {
  if (IS_SERVER) return {}
  return Object.fromEntries(
    document?.cookie?.split(/; */).map((c) => {
      const [key, ...v] = c.split('=')
      return [key, decodeURIComponent(v.join('='))]
    })
  )
}
