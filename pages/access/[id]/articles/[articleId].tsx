import AccessLayout from 'components/access/AccessLayout'
import ArticleActivityDetailsPanel from 'components/access/article/ArticleActivityDetailsPanel'
import { useRouter } from 'next/router'
import React from 'react'

const ArticleActivityPage = () => {
  return (
    <AccessLayout>
      <ArticleActivityDetailsPanel />
    </AccessLayout>
  )
}

export default ArticleActivityPage
