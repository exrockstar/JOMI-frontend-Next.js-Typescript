import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const useGoogleAnalyticsHelpers = () => {
  const [referredFrom, setReferredFrom] = useLocalStorage<string>('referrer', null)
  const [referrerPath, setReferrerrPath] = useLocalStorage<string>('referrerPath', null)
  const [anon_link_id, setAnonLinkId] = useLocalStorage<string>('anon_link_id', null)

  //Check where a user came from, set in local storage, call only once
  useEffect(() => {
    if (!anon_link_id) {
      const id = nanoid(15)
      setReferredFrom(document.referrer)
      setReferrerrPath(window.location.search)
      setAnonLinkId(id)
    }
  }, [anon_link_id])
  return {
    referredFrom,
    referrerPath,
    anon_link_id
  }
}

export default useGoogleAnalyticsHelpers
