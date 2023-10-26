import { useApolloClient } from '@apollo/client'
import {
  Edit,
  Delete,
  KeyboardArrowUpOutlined,
  KeyboardArrowDown
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  TableCell,
  IconButton,
  Box,
  Button,
  TableRow,
  Collapse,
  Stack
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import {
  AnnouncementsDocument,
  AnnouncementsQuery,
  useDeleteAnnouncementMutation
} from 'graphql/queries/announcements.generated'
import { AnnouncementType } from 'graphql/types'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useMemo, useState } from 'react'

import AnnouncementToggle from './AnnouncementToggle'
import DeleteDialog from 'components/common/cms/DeleteDialog'

type Props = {
  announcement: Unpacked<AnnouncementsQuery['announcements']>
}

type Announcement = Unpacked<AnnouncementsQuery['announcements']>

const AnnouncementRow = ({ announcement }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedDeleteAnnouncement, setSelectedDeleteAnnouncement] = useState<Announcement | null>(null)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const client = useApolloClient()
  const theme = useTheme()
  const [deleteAnnouncement, { loading: deleteLoading }] =
    useDeleteAnnouncementMutation({
      onCompleted: ({ result: deletedId }) => {
        client.cache.updateQuery(
          { query: AnnouncementsDocument },
          (data: AnnouncementsQuery) => {
            const filtered = data.announcements.filter(function (announcement) {
              return announcement._id !== deletedId
            })

            return {
              announcements: filtered
            }
          }
        )

        enqueueSnackbar(`Announcement has been deleted.`, {
          variant: 'success'
        })
      },
      onError: (error) => {
        enqueueSnackbar("Couldn't delete the announcement", {
          variant: 'error'
        })
      }
    })

  const bgColor = useMemo(() => {
    if (announcement.backgroundColor) {
      return announcement.backgroundColor
    }
    switch (announcement?.type) {
      case AnnouncementType.Danger:
        return theme.palette.error.main
      case AnnouncementType.Warn:
        return theme.palette.warning.main
      case AnnouncementType.Success:
      case AnnouncementType.Info:
      default:
        return '#2cb673'
    }
  }, [
    announcement.backgroundColor,
    announcement?.type,
    theme.palette.error.main,
    theme.palette.warning.main
  ])

  return (
    <>
      <DeleteDialog 
        deleteMutation={deleteAnnouncement} 
        deleteMutationOpts={{
          variables: {
            _id: selectedDeleteAnnouncement?._id
          }
        }} 
        header={`Are you sure you want to delete '${selectedDeleteAnnouncement?.title}'`}
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setSelectedDeleteAnnouncement(null)
        }}
      />
      <StyledTableRow hover key={announcement._id}>
        <TableCell sx={{ maxWidth: 600 }}>
          <IconButton
            title="Click to show announcement preview"
            aria-label="expand row"
            size="small"
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          >
            {isPreviewOpen ? (
              <KeyboardArrowUpOutlined />
            ) : (
              <KeyboardArrowDown />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{announcement.title ?? 'N/A'}</TableCell>
        <TableCell>
          <AnnouncementToggle
            enabled={announcement.enabled}
            id={announcement._id}
          />
        </TableCell>
        <TableCell>{announcement.author?.display_name}</TableCell>
        <TableCell>{announcement.lastEditedBy}</TableCell>
        <TableCell>
          {dayjs(announcement.createdAt).format('MM/DD/YYYY')}
        </TableCell>
        <TableCell>
          {dayjs(announcement.updatedAt).format('MM/DD/YYYY')}
        </TableCell>
        <TableCell>
          <Button
            color="primary"
            startIcon={<Edit />}
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={() =>
              router.push(`/cms/announcements/${announcement._id}`)
            }
          >
            Edit
          </Button>
          <LoadingButton
            color="error"
            startIcon={<Delete />}
            onClick={() => {
              setSelectedDeleteAnnouncement(announcement)
              setShowDeleteDialog(true)
            }}
            loading={deleteLoading}
          >
            Delete
          </LoadingButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell
          colSpan={8}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: bgColor,
            transition: 'all .3s ease'
          }}
        >
          <Collapse in={isPreviewOpen} timeout="auto" unmountOnExit>
            <Stack alignItems="center">
              <Box
                sx={{
                  overflow: 'hidden'
                }}
                bgcolor={bgColor}
                dangerouslySetInnerHTML={{
                  __html: announcement.content
                }}
              />
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default AnnouncementRow
