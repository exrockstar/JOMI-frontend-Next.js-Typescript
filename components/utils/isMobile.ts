import { isServer } from './isServer'
import isTouchDevice from './isTouchDevice'

export const isMobile = () => {
  if (isServer) return false

  const isUserAgentMobile = /iPhone|iPad|iPod|Android/i.test(
    navigator.userAgent
  )
  return isUserAgentMobile || isTouchDevice()
}
