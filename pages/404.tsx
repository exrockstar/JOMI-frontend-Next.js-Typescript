import { DefaultPageProps } from 'backend/seo/MetaData'
import Error404 from 'components/error-pages/Error404'
import { GetStaticProps } from 'next'

import React from 'react'
type Props = DefaultPageProps
const Page404 = () => {
  return <Error404 />
}

export default Page404

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      meta_data: {
        title: 'Page not Found',
        description: "We couldn't find the page you're looking for."
      }
    }
  }
}
