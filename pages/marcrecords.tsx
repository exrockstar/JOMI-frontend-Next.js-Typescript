import React from 'react'
import { Button, Stack, Typography, Container, Divider } from '@mui/material'

import Logo from 'components/common/Logo'
import Head from 'next/head'

const MarcRecords = () => {
  const downloadFile = () => {
    window.location.href = 'http://localhost:4000/download/record.mrc'
  }
  return (
    <>
      <Container maxWidth="sm">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Stack
          height="100vh"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Logo type="dark" height={180} />
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">{'Download our marcrecords.'}</Typography>
          </Stack>
          <Button
            color="success"
            variant="contained"
            sx={{ borderRadius: 1 }}
            data-event="ErrorPage - Back to Home"
            onClick={downloadFile}
          >
            {'Download'}
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default MarcRecords
