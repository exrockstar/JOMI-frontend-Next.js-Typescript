import { LoadingButton } from '@mui/lab'
import { AnnouncementQuery, useUpdateAnnouncementMutation } from 'graphql/queries/announcements.generated'
import { Announcement } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useAnnouncementFilters } from './useAnnouncementFilters'
type Props = {
  announcement: AnnouncementQuery['announcement']
  onCompleted(): void
}
const SaveFiltersButton = ({ announcement, onCompleted }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const { filters } = useAnnouncementFilters()
  const [updateAnnouncement, { loading }] = useUpdateAnnouncementMutation({
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    onCompleted() {
      enqueueSnackbar('Updated successfully', { variant: 'success' })
      onCompleted()
    }
  })
  return (
    <LoadingButton
      loading={loading}
      color="primary"
      variant="contained"
      onClick={() => {
        updateAnnouncement({
          variables: {
            input: {
              _id: announcement._id,
              enabled: announcement.enabled,
              type: announcement.type,
              backgroundColor: announcement.backgroundColor,
              content: announcement.content,
              isPermanent: announcement.isPermanent,
              title: announcement.title,
              filters: filters.map((f) => {
                let x = { ...f }
                delete x.__typename
                return x
              })
            }
          }
        })
      }}
    >
      Save Filters
    </LoadingButton>
  )
}

export default SaveFiltersButton
