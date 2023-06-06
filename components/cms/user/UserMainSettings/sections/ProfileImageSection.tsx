import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/legacy/image'
import { UserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { BASE_URL } from 'common/constants'

import { MediaLibraryQuery } from 'graphql/cms-queries/media-library.generated'
import {
  CloudUploadOutlined,
  Delete,
  PhotoSizeSelectActualOutlined
} from '@mui/icons-material'
import { useFormikContext } from 'formik'
import MediaLibraryDialog from 'components/cms/MediaLibraryDialog/MediaLibraryDialog'
import UploadImageDialog from 'components/cms/UploadImage/UploadImageDialog'

type Props = {
  user: UserDetailQuery['userById']
  onChangeImage(image?: { name: string; size: number }): void
}

type Media = Unpacked<MediaLibraryQuery['files']['files']>

const ProfileImageSection = ({ user, onChangeImage }: Props) => {
  const DEFAULT_IMAGE = `/img/user-profile-icon.png`
  const { setFieldValue } = useFormikContext()
  const [imageUrl, setImageUrl] = useState(
    user.image
      ? user.image.filename?.startsWith('http')
        ? user.image.filename
        : `${BASE_URL}/api/files/${user.image.filename}`
      : DEFAULT_IMAGE
  )

  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [openMediaDialog, setOpenMediaDialog] = useState(false)
  const handleRemoveImage = () => {
    setImageUrl(DEFAULT_IMAGE)
    onChangeImage(null)
    setFieldValue('image', null)
  }
  return (
    <Stack>
      <MediaLibraryDialog
        open={openMediaDialog}
        onClose={() => {
          setOpenMediaDialog(false)
        }}
        onSelectImage={(media: Media) => {
          if (media) {
            const newUrl = `${BASE_URL}/api/files/${media.filename}`
            onChangeImage({ name: media.filename, size: media.length })
            setImageUrl(newUrl)
            setFieldValue('image', {
              filename: media.filename,
              length: media.length,
              format: media.filename.split('.').pop()
            })
          }
          setOpenMediaDialog(false)
        }}
      />
      <UploadImageDialog
        open={openUploadDialog}
        onClose={() => {
          setOpenUploadDialog(false)
        }}
        onCompleted={(uploaded: { name: string; size: number }) => {
          const newUrl = `${BASE_URL}/api/files/${uploaded.name}`
          onChangeImage(uploaded)
          setImageUrl(newUrl)
          setFieldValue('image', {
            filename: uploaded.name,
            length: uploaded.size,
            format: uploaded.name.split('.').pop()
          })
          setOpenUploadDialog(false)
        }}
      />
      <Typography variant="h5" my={2}>
        Profile Image
      </Typography>
      <Stack alignItems="stretch" spacing={1}>
        <Stack alignItems="center">
          <Box
            position="relative"
            width={200}
            height={200}
            sx={{ backgroundColor: 'neutral.200' }}
          >
            <Image
              src={imageUrl}
              alt="institution-logo"
              layout="fill"
              objectFit="contain"
              onError={() => {
                setImageUrl(DEFAULT_IMAGE)
              }}
            />
          </Box>
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setOpenUploadDialog(true)}
          startIcon={<CloudUploadOutlined />}
        >
          Upload New Image
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => setOpenMediaDialog(true)}
          startIcon={<PhotoSizeSelectActualOutlined />}
        >
          Choose From Library
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleRemoveImage}
          startIcon={<Delete />}
        >
          Remove Image
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProfileImageSection
