import { Box, Container, Stack, Typography, TextField } from '@mui/material'
import SubmitButton from 'components/account/SubmitButton'
import { LogoContainer } from 'components/auth/LogoContainer'
import { useLoginToArticleMutation } from 'graphql/mutations/login-to-article.generated'
import React, { useState } from 'react'

type Props = {
  onComplete(): void
  onError?(error: string): void
  publication_id: string
}

const ArticlePassword = (props: Props) => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [helperText, setHelperText] = useState('')

  const [loginToArticle] = useLoginToArticleMutation({
    onCompleted() {
      setLoading(false)
      props.onComplete()
    },
    onError(e) {
      setLoading(false)
      setHelperText(e.message)
    }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value) {
      setHelperText('')
      setLoading(false)
      setHelperText('')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    loginToArticle({
      variables: {
        password: password,
        publication_id: props.publication_id
      }
    })
  }

  return (
    <Box display="flex" height="100vh">
      <LogoContainer />
      <Container maxWidth="sm">
        <Stack height="100vh" justifyContent="center" alignItems="center">
          <Box p={4} width="100%">
            <Typography color="text.primary" align="center" gutterBottom mb={5}>
              This article is password protected.
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
                  Submit
                </SubmitButton>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default ArticlePassword
