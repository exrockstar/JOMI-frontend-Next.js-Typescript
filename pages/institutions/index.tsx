import Layout from 'components/layout'
import {
  Typography,
  Container,
  Grid,
  Divider,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloClient } from 'apis/apollo-admin-client'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import { AllInstitutionsDocument, InstitutionsListQuery, InstitutionsListQueryVariables, } from 'graphql/cms-queries/institutions-list.generated'
import InstitutionList from "../../components/institutions/InstitutionList"

type Props = {
  institutions: string[]
  [APOLLO_STATE_PROP_NAME]: any
} & DefaultPageProps

export default function Institutions({ institutions }: Props) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const rendered = useMemo(() => {
    return (<Layout>
      <Container maxWidth="lg" sx={{ backgroundColor: 'white' }}>
        <Grid container py={2} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" fontSize="2rem">
              Publishing Institutions
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container columnSpacing={2} my={2}>
          <InstitutionList institutions={institutions} />
        </Grid>
      </Container>
    </Layout>)
  }, [isMdUp])
  return rendered
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const client = getApolloClient()

  const { data } = await client.query<InstitutionsListQuery, InstitutionsListQueryVariables>({
    query: AllInstitutionsDocument
  })
  const institutions: string[] = [...data?.allInstitutions || []].sort()
  return {
    props: {
      institutions,
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      meta_data: buildGenericMetadata({
        title: 'Publishing institutions',
        meta_desc: `institutions`,
        slug: 'institutions'
      }),
    }
  }
}
