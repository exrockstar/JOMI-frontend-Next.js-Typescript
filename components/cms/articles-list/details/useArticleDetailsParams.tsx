
import { useRouter } from 'next/router';
import React from 'react'

const useArticleDetailsParams = () => {
  const router = useRouter();
  const params = (router.query?.params ?? []) as string[]

  return {
    articleId: params[0],
    tab: params[1]
  }
}

export default useArticleDetailsParams