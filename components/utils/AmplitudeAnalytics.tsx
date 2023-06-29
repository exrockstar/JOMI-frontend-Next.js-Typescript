import { amplitudeInit } from "apis/amplitude"
import { useEffect } from "react"

function AmplitudeAnalytics() {
  useEffect(() => {
    amplitudeInit()
  }, [])
  return null
}

export default AmplitudeAnalytics