import { useApolloClient } from '@apollo/client'
import { Chip } from '@mui/material'
import {
  useToggleAnnouncementMutation,
  AnnouncementsQuery,
  AnnouncementsDocument
} from 'graphql/queries/announcements.generated'
import { useSnackbar } from 'notistack'
import React from 'react'

type Props = {
  enabled: boolean
  id: string
}

const AnnouncementToggle = ({ enabled, id }: Props) => {
  const title = enabled
    ? `Click to disable announcement`
    : `Click to enable announcement`

  const { enqueueSnackbar } = useSnackbar()
  const [toggleState] = useToggleAnnouncementMutation({
    variables: {
      _id: id,
      enabled: !enabled
    },
    onCompleted(result) {
      const handleUpdate = (data: AnnouncementsQuery) => {
        return {
          announcements: data.announcements.map((announcement) => {
            if (announcement._id === id) {
              return result.announcement
            }
            return announcement
          })
        }
      }

      client.cache.updateQuery({ query: AnnouncementsDocument }, handleUpdate)
      enqueueSnackbar(`Announcement has been updated.`, {
        variant: 'success'
      })
    },
    onError() {
      enqueueSnackbar("Couldn't delete the announcement", {
        variant: 'error'
      })
    }
  })
  const client = useApolloClient()

  const handleClick = () => {
    toggleState()
  }
  return (
    <Chip
      title={title}
      color={enabled ? 'success' : 'error'}
      label={enabled ? 'Enabled' : 'Disabled'}
      variant="outlined"
      clickable
      onClick={handleClick}
    />
  )
}

export default AnnouncementToggle
