import { getCookies } from './getCookies'

export function getIpAddress() {
  const cookie = getCookies() ?? {}
  const ip = cookie['jomi-ip'] ?? ''
  return ip
}
