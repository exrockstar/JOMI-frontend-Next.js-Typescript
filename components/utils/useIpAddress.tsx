import { IS_SERVER } from 'common/constants'
import { useEffect, useState } from 'react'

function cookies() {
  if (IS_SERVER) return {}
  return Object.fromEntries(
    document?.cookie?.split(/; */).map((c) => {
      const [key, ...v] = c.split('=')
      return [key, decodeURIComponent(v.join('='))]
    })
  )
}

/**
 * Custom hook to set the userIp on first render.
 * @returns `userIp` based on `publicIp` package
 */
export function useIpAddress(): string {
  const cookie = cookies() ?? {}
  const testIp = cookie['test_ip'] ?? ''
  const realIp = cookie['jomi-ip'] ?? ''
  const [ip, setIp] = useState(realIp)

  useEffect(() => {
    if (process.env.APP_ENV !== 'production' && testIp) {
      type Location = {
        ip: string
        country: string
        region: string
        city: string
      }
      const parsed = JSON.parse(testIp) as Location
      setIp(parsed.ip)
    }
  }, [])

  return ip
}
