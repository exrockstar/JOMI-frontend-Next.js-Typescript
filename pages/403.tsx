import { DefaultPageProps } from 'backend/seo/MetaData'
import Error403 from 'components/error-pages/Error403'
import { GetStaticProps } from 'next'
import React from 'react'
type Props = DefaultPageProps
const Page403 = () => {
  return <Error403 />
}

export default Page403

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      meta_data: {
        title: 'Unauthorized',
        description: "You're unauthorized to view this page"
      }
    }
  }
}
