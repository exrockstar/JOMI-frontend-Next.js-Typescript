import { useApolloClient } from '@apollo/client'
import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material'
import AnnouncementsList from 'components/cms/announcements/AnnouncementsList/AnnouncementsList'
import CmsLayout from 'components/cms/CmsLayout'
import {
  useAnnouncementsQuery,
  useCreateAnnouncementMutation,
  AnnouncementsDocument,
  AnnouncementsQuery
} from 'graphql/queries/announcements.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

const Announcements = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const client = useApolloClient()
  const { data, loading, error } = useAnnouncementsQuery({
    skip: !session
  })
  const { enqueueSnackbar } = useSnackbar()
  const [createAnnouncement, { loading: newAnnouncementLoading }] =
    useCreateAnnouncementMutation({
      onCompleted({ announcement }) {
        router.push(`/cms/announcements/${announcement._id}/`)
        client.cache.updateQuery(
          { query: AnnouncementsDocument },
          (data: AnnouncementsQuery) => {
            return {
              announcements: [announcement, ...data.announcements]
            }
          }
        )
      },
      onError() {
        enqueueSnackbar("Couldn't create announcement", {
          variant: 'error'
        })
      }
    })

  return (
    <CmsLayout>
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Typography variant="h4">Announcements</Typography>

        <LoadingButton
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => createAnnouncement()}
          loading={newAnnouncementLoading}
        >
          New Announcement
        </LoadingButton>
      </Stack>
      {loading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : error ? (
        <Stack p={2}>
          <Alert variant="filled" color="error">
            {error.message}
          </Alert>
        </Stack>
      ) : (
        <Stack p={2}>
          <AnnouncementsList announcements={data?.announcements ?? []} />
        </Stack>
      )}
    </CmsLayout>
  )
}

export default Announcements
