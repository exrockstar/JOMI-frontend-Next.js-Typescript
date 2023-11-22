import { UploadFile } from '@mui/icons-material'
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
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useRef, useState } from 'react'
import Image from 'next/legacy/image'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import axios, { AxiosError } from 'axios'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import MediaLibraryImage from '../media-library/MediaLibraryImage'

type Props = {
  onCompleted(uploaded: { name: string; size: number }): void
} & DialogProps

const UploadImageDialog = ({ onCompleted, ...props }: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File>(null)
  const [uploading, setUploading] = useState(false)
  const [localImageSrc, setLocalImageSource] = useState<string>('')
  const [filename, setFilename] = useState<string>(null)
  const { enqueueSnackbar } = useSnackbar()
  const handleFilePick = () => {
    const files = ref.current.files
    const image = files[0]

    setImage(image)
    setFilename(image.name)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(image)
    fileReader.onload = (e) => {
      const result = e.target.result
      if (typeof result === 'string') {
        setLocalImageSource(result)
      }
    }
  }

  const chooseFile = (ev) => {
    if (ev) ev.preventDefault()
    ref.current.click()
  }

  const uploadFile = async (values) => {
    const data = new FormData()
    data.append('image', image)
    data.append('title', values.title)
    data.append('description', values.description)

    setUploading(true)
    try {
      const { data: responseData } = await axios.post('/api/upload', data, {
        withCredentials: true
      })

      enqueueSnackbar(`Successfully uploaded ${responseData.filename}`, {
        variant: 'success'
      })
      onCompleted({
        name: image.name,
        size: image.size
      })
    } catch (e) {
      console.log(e)
      if (e instanceof AxiosError) {
        enqueueSnackbar(`${e.response.data}`, { variant: 'error' })
      }
    }
    setImage(null)
    setLocalImageSource(null)
    setFilename(null)
    setUploading(false)
  }

  return (
    <Formik
      onSubmit={uploadFile}
      initialValues={{ title: '', description: '' }}
    >
      <Dialog {...props}>
        <Form>
          <DialogTitle>Upload File</DialogTitle>
          <Divider />
          <DialogContent sx={{ width: { sm: '100%', md: 600 } }}>
            {image && localImageSrc && (
              <Stack spacing={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={4}>
                      <Box position="relative" paddingTop={'100%'}>
                        <MediaLibraryImage src={localImageSrc} alt={filename} />
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack
                      alignItems={'flex-start'}
                      justifyContent={'center'}
                      height="100%"
                    >
                      <Typography>
                        File name: <strong>{image.name}</strong>
                      </Typography>
                      <Typography>
                        File size: <strong>{image.size}</strong>
                      </Typography>
                      <Typography>
                        File type: <strong>{image.type}</strong>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Metadata used for searching
                </Typography>
                <FormikTextField
                  name="title"
                  placeholder="Title"
                  size="small"
                />
                <FormikTextField
                  name="description"
                  placeholder="Description"
                  size="small"
                />
              </Stack>
            )}
            {!image && (
              <Stack spacing={2}>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file-input-hidden"
                  accept="image/*|.pdf|.doc|.docx|.csv"
                  ref={ref}
                  onChange={handleFilePick}
                />
                <Button variant="outlined" onClick={chooseFile}>
                  Choose file to upload
                </Button>
                <Typography variant="subtitle2" color="text.secondary">
                  Currently only jpg, bmp, gif,png, doc, docx, csv, and pdf are
                  supported. Animated gifs will upload normally, but will behave
                  abnormally when scaled for UI purposes.
                </Typography>
              </Stack>
            )}
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={(e) => {
                props.onClose && props.onClose(e, 'backdropClick')
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setImage(null)}
            >
              Clear File
            </Button>
            <LoadingButton
              variant="contained"
              color="secondary"
              endIcon={<UploadFile />}
              loading={uploading}
              type="submit"
              disabled={!image}
            >
              Upload File
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default UploadImageDialog
