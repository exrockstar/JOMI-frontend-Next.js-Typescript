import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  Pagination,
  Stack,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import {
  MediaLibraryQuery,
  useMediaLibraryQuery
} from 'graphql/cms-queries/media-library.generated'
import React, { useState } from 'react'
import Image from 'next/legacy/image'
import { BASE_URL } from 'common/constants'
import { useTheme } from '@mui/material/styles'
import CircularLoader from 'components/common/CircularLoader'
import SearchInput from 'components/access/SearchInput'

type Media = Unpacked<MediaLibraryQuery['files']['files']>
type Props = {
  onSelectImage(file: Media): void
} & DialogProps

const MediaLibraryDialog = ({ onSelectImage, ...props }: Props) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Media | null>(null)
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  const perPage = 12
  const { data, loading } = useMediaLibraryQuery({
    variables: {
      input: {
        search: search,
        limit: perPage,
        skip: (page - 1) * perPage
      }
    }
  })
  const files = data?.files?.files
  const count = data?.files.count ?? 0
  const placeholder = new Array(perPage).fill('x')
  return (
    <Dialog open={true} fullScreen={isSmallDevice} {...props} maxWidth="md">
      <DialogTitle>
        Choose Image from Media Library
        <Stack spacing={2} mt={2}>
          <Pagination
            page={page}
            count={Math.ceil(count / perPage)}
            onChange={(e, page) => setPage(page)}
            size="small"
          />
          <SearchInput
            onSubmit={(value) => {
              console.log('value', value)
              setPage(1)
              setSearch(value)
            }}
          />
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ width: { sm: '100%', md: 800 } }}>
        {loading ? (
          <Grid container direction="row" spacing={1}>
            {placeholder.map((item, index) => {
              return (
                <Grid key={index} item xs={6} md={3}>
                  <Box
                    width={'100%'}
                    paddingTop={'100%'}
                    sx={{
                      backgroundColor: 'neutral.100',
                      borderColor: 'neutral.100',
                      borderWidth: 5,
                      borderStyle: 'solid'
                    }}
                  />
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <Grid container direction="row" spacing={1}>
            {files?.map((file) => {
              const url = `${BASE_URL}/api/files/${file.filename}`
              const isSelected = selected?.filename === file.filename
              return (
                <Grid key={file.filename} item xs={6} md={3}>
                  <Tooltip title={file.filename}>
                    <Box
                      position="relative"
                      paddingTop="100%"
                      width={'100%'}
                      sx={{
                        backgroundColor: 'neutral.100',
                        '& :hover': {
                          cursor: 'pointer'
                        },
                        borderColor: isSelected
                          ? 'secondary.light'
                          : 'neutral.100',
                        borderWidth: 5,
                        borderStyle: 'solid'
                      }}
                      onClick={() => setSelected(file)}
                    >
                      <Image
                        src={url}
                        alt={file.filename}
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>
                  </Tooltip>
                </Grid>
              )
            })}
          </Grid>
        )}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={(e) => {
            props.onClose && props.onClose(e, 'backdropClick')
          }}
          sx={{
            color: 'neutral.800'
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setSelected(null)
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            onSelectImage(selected)
          }}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MediaLibraryDialog
