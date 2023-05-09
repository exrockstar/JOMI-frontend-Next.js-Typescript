// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  GetScienceOpenXmlByPublicationIdDocument,
  GetScienceOpenXmlByPublicationIdQuery,
  GetScienceOpenXmlByPublicationIdQueryVariables
} from 'graphql/queries/scienceopen.generated'
import { GetServerSideProps } from 'next'
const ScienceopenIndex = () => {
  return null
}
export default ScienceopenIndex

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  try {
    const client = getApolloAdminClient()
    const filename = params.publication_id as string
    const id = filename.replace('.xml', '')

    const { data, error } = await client.query<
      GetScienceOpenXmlByPublicationIdQuery,
      GetScienceOpenXmlByPublicationIdQueryVariables
    >({
      query: GetScienceOpenXmlByPublicationIdDocument,
      variables: {
        pub_id: id
      }
    })
    if (error) {
      throw error.message
    }

    const xml = data.getScienceOpenArticleByPubId?.generatedXml
    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('x-robots-tag', 'noindex')
    res.write(xml)
    res.end()
  } catch (e) {
    console.log(e.message)
    return {
      notFound: true
    }
  }
  return {
    props: {}
  }
}
