import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

const useGoogleAnalyticsHelpers = () => {
  const [referredFrom] = useLocalStorage<string>('referrer', null)
  const [referrerPath] = useLocalStorage<string>('referrerPath', null)
  const [anon_link_id] = useLocalStorage<string>('anon_link_id', null)

  return {
    referredFrom,
    referrerPath,
    anon_link_id
  }
}

export default useGoogleAnalyticsHelpers
