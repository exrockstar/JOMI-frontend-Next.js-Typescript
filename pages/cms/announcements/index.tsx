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
import DownloadIcon from '@mui/icons-material/Download'
import AnnouncementsList from 'components/cms/announcements/AnnouncementsList/AnnouncementsList'
import CmsLayout from 'components/cms/CmsLayout'
import useCsvDownload from 'components/cms/useCsvDownload'
import {
  useAnnouncementsQuery,
  useAnnouncementsLazyQuery,
  useCreateAnnouncementMutation,
  AnnouncementsDocument,
  AnnouncementsQuery
} from 'graphql/queries/announcements.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

const Announcements = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const client = useApolloClient()
  const { data, loading, error } = useAnnouncementsQuery({
    skip: !session
  })

  const [fetchFunc] = useAnnouncementsLazyQuery({
    fetchPolicy: 'no-cache'
  })

  const getMainData = (data) => {
    return data?.announcements ?? []
  }

  const convertFunc = (item) => {
    return {
      TITLE: item.title || 'N/A',
      ENABLED: item.enabled ? 'Enabled' : 'Disabled',
      AUTHOR: item.author || 'N/A',
      'LAST EDITED BY': item.lastEditedBy,
      'CREATE AT': dayjs(item.createdAt).format('MM/DD/YYYY'),
      'UPDATE AT': dayjs(item.updatedAt).format('MM/DD/YYYY'),
      CONTENT: item.content
    }
  }

  const { downloadCsv, loading: csvLoading } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    collection: 'announcements'
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
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems={'center'}
        p={2}
        pt={5}
      >
        <Typography variant="h4">Announcements</Typography>

        <Stack direction={'row'} spacing={1}>
          <LoadingButton
            loading={csvLoading}
            onClick={downloadCsv}
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Download Table as CSV
          </LoadingButton>
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
