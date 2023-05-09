import { Container, Typography, Stack, Alert, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Logo from 'components/common/Logo'
import { BlueLink } from 'components/common/BlueLink'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'
import Link from 'next/link'
import { Home } from '@mui/icons-material'
const PublicationRequestResultPage = () => {
  const router = useRouter()
  // const [count, setCount] = useState(5)

  const isSuccess = router.query.success === 'true'

  // useEffect(() => {
  //   if (count <= 1) {
  //     router.push('/')

  //     return () => clearTimeout(handler)
  //   }

  //   const handler = setTimeout(() => setCount((prev) => prev - 1), 1000)
  //   return () => clearTimeout(handler)
  // })

  const title = isSuccess
    ? 'Publication Request Success'
    : 'Publication Request Failed'

  if (!router.isReady) {
    return null
  }
  return (
    <Container maxWidth="sm">
      <Head>
        <title>
          {title}| {SITE_NAME}
        </title>
      </Head>
      <Stack spacing={1} alignItems="center">
        <Stack alignItems="center" mt={20}>
          <Logo type="dark" />
        </Stack>
        <Alert severity={isSuccess ? 'success' : 'error'}>
          {isSuccess
            ? 'We have successfully received your application.'
            : 'Something wrong happened when submitting your request.'}
        </Alert>
        {isSuccess ? (
          <Typography color="textSecondary" align="center">
            Your request is now being reviewed. We will contact you when we
            process your request.
          </Typography>
        ) : (
          <Typography color="textSecondary" align="center">
            Request publication failed for some reason. Please try submitting a
            request after a few minutes.
          </Typography>
        )}
        <Link href="/" passHref legacyBehavior>
          <Button variant="contained" color={'success'} startIcon={<Home />}>
            GO to HOME PAGE
          </Button>
        </Link>
      </Stack>
    </Container>
  )
}

export default PublicationRequestResultPage
