import {
  Box,
  Container,
  Stack,
  TextField,
  Paper,
  Typography
} from '@mui/material'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { DefaultPageProps } from 'backend/seo/MetaData'
import SubmitButton from 'components/account/SubmitButton'
import { LogoContainer } from 'components/auth/LogoContainer'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import React, { useState } from 'react'

const PasswordProtect = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [helperText, setHelperText] = useState('')
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value) {
      setHelperText('')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/password-protect', {
        method: 'POST',
        body: JSON.stringify({
          password: password,
          redirectUrl: router.query.redirectUrl
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status >= 400) {
        const res = await response.json()
        throw new Error(res.message)
      } else {
        window.location.href = router.query.redirectUrl as string
      }
    } catch (e) {
      if (e instanceof Error) {
        setHelperText(e.message)
        setLoading(false)
      }
    }
  }
  return (
    <Box display="flex" height="100vh">
      <LogoContainer />
      <Container maxWidth="sm">
        <Stack height="100vh" justifyContent="center" alignItems="center">
          <Box p={4} width="100%">
            <Typography
              color="text.primary"
              align="center"
              gutterBottom
              variant="h4"
              mb={5}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} mt={2}>
                <TextField
                  label="Password"
                  size="small"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  helperText={helperText}
                  error={Boolean(helperText)}
                />
                <SubmitButton type="submit" loading={loading}>
                  Login
                </SubmitButton>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default PasswordProtect

export const getStaticProps: GetStaticProps<DefaultPageProps> = async () => {
  return {
    props: {
      meta_data: buildGenericMetadata({
        title: 'Password'
      })
    }
  }
}
