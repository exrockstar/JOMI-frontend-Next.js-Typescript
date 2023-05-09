import { CloseOutlined } from '@mui/icons-material'
import { Container, IconButton, Stack, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { AnnouncementPartsFragment } from 'graphql/fragments/AnnouncementParts.generated'
import { AnnouncementType } from 'graphql/types'
import { memo, useMemo } from 'react'

type Props = {
  announcement: AnnouncementPartsFragment
  onClose(cache_id: string): void
}

const Announcement = ({ announcement, onClose }: Props) => {
  const bgColor = useMemo(() => {
    if (announcement?.backgroundColor) {
      return announcement.backgroundColor
    }
    switch (announcement?.type) {
      case AnnouncementType.Danger:
      case AnnouncementType.Warn:
        return 'error.main'
      case AnnouncementType.Success:
      case AnnouncementType.Info:
      default:
        return '#2cb673'
    }
  }, [announcement?.backgroundColor, announcement?.type])

  return (
    <Box sx={{ backgroundColor: bgColor }}>
      <Container maxWidth="lg">
        <Stack
          direction={'row'}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            dangerouslySetInnerHTML={{ __html: announcement.content }}
            py={1.5}
            flex={1}
            sx={{
              'h1, h2, h3, h4, h5, h6, p': {
                padding: 0,
                margin: 0
              },
              // to override /index page styles
              'p span': {
                fontSize: 'unset',
                verticalAlign: 'unset',
                border: '0px solid',
                borderRadius: 0,
                padding: 0,
                margin: 0,
                top: 'unset'
              }
            }}
          ></Box>

          <Tooltip
            placement="bottom-end"
            title="Do not show this announcement again"
          >
            <CloseButton
              onClick={() => onClose(announcement.cache_id)}
              aria-label="hide-announcement"
              edge="end"
              size="small"
            >
              <CloseOutlined />
            </CloseButton>
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  )
}

export default memo(Announcement)

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: '#121212',
  backgroundColor: `#FFFFFF50`,
  ':hover': {
    backgroundColor: '#FFFFFF88'
  }
}))
