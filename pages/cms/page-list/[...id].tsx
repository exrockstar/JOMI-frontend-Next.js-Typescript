import {
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CmsLayout from 'components/cms/CmsLayout'
import PageDetails from 'components/cms/page-details/PageDetails'
import dayjs from 'dayjs'
import { usePageByIdQuery } from 'graphql/cms-queries/pages-list.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const PageDetailsPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const queryId = router.query.id
  const id = queryId instanceof Array ? queryId[0] : queryId
  const { data: session } = useSession()
  const { data, loading, error } = usePageByIdQuery({
    skip: !session?.user || !id,
    variables: {
      id
    }
  })
  const page = data?.page

  return (
    <CmsLayout>
      {!page ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}
        </Stack>
      ) : (
        <Stack p={2} minHeight="90vh">
          <Typography variant="h4">{page?.title}</Typography>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Database ID: {page?._id}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Author: {page?.author?.name.first} {page?.author?.name.last}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Created at: {dayjs(page.created).format('MM/DD/YYYY')}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Updated at: {dayjs(page.updated).format('MM/DD/YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}></Grid>
          </Grid>

          <PageDetails page={page} />
        </Stack>
      )}
    </CmsLayout>
  )
}

export default PageDetailsPage
