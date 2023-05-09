
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const useArticleTabs = (article_id: string) => {
  const tabs = ["cite-article"]
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  useEffect(() => {
    if (!article_id) return;
    router.push({
      query: {
        params: [article_id, selectedTab]
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab])

  return {
    selectedTab,
    setSelectedTab,
    tabs,
  }
}

export default useArticleTabs