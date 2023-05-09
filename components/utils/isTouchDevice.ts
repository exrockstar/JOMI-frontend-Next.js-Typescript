import { isServer } from './isServer'

const isTouchDevice = () => {
  if (isServer) return false
  //@ts-ignore
  const hasMsTouchPoints = navigator.msMaxTouchPoints > 0
  return (
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || hasMsTouchPoints
  )
}

export default isTouchDevice
