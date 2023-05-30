import Layout from 'components/layout';
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
import { AuthorsDocument, AuthorsQuery, AuthorsQueryVariables } from 'graphql/queries/authors.generated'
import AuthorList from 'components/authors/AuthorList';
import { Author } from 'graphql/types';

type Props = {
  authors: any[],
  [APOLLO_STATE_PROP_NAME]: any
} & DefaultPageProps

export default function Articles({ authors }: Props) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const rendered = useMemo(() => {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ backgroundColor: 'white' }}>
          <Grid container py={2} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" fontSize="2rem">
                Publishing Authors
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container columnSpacing={2} my={2}>
            <AuthorList authors={authors} />
          </Grid>
        </Container>
      </Layout>
    )
  }, [isMdUp])
  return rendered
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const client = getApolloClient()
  const { data } = await client.query<AuthorsQuery, AuthorsQueryVariables>({ query: AuthorsDocument })
  let authorsList = data?.authors || []

  const authors = [...authorsList].sort((a: Author, b: Author) => {
    if (a.display_name < b.display_name) {
      return -1;
    }
    if (a.display_name > b.display_name) {
      return 1;
    }
    return 0;
  })
  return {
    props: {
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      authors: authors,
      meta_data: buildGenericMetadata({
        title: 'Publishing Authors',
        meta_desc: `Authors`,
        slug: 'author'
      }),
    }
  }
}
