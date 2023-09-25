import { Delete, Facebook, Google, LinkedIn, Apple } from '@mui/icons-material'
import {
  Button,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { useField, useFormikContext } from 'formik'
import { UserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { Social } from 'graphql/types'

import React from 'react'

const SocialInfoSection = () => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField<Social>('social')
  const social = {
    facebook: field.value?.facebook,
    linkedin: field.value?.linkedin,
    google: field.value?.google,
    apple: field.value?.apple
  }
  type Provider = keyof typeof social
  const socialEntries = Object.entries(social)
  const getIcon = (provider: Provider) => {
    switch (provider) {
      case 'facebook':
        return <Facebook />
      case 'linkedin':
        return <LinkedIn />
      case 'google':
        return <Google />
      case 'apple':
        return <Apple />
    }
  }

  const handleDelete = (provider: Provider) => {
    setFieldValue(`social.${provider}`, null)
  }
  return (
    <>
      <Typography mt={2} mb={2} variant="h5">
        Social Info
      </Typography>
      <Stack px={2} spacing={1}>
        {socialEntries.map((entry, i) => {
          const [_provider, socialInfo] = entry
          const provider = _provider as Provider
          const icon = getIcon(provider as Provider)
          return (
            <Tooltip title="Click to remove" arrow key={provider}>
              <Button
                color={provider}
                variant="outlined"
                startIcon={icon}
                endIcon={socialInfo ? <Delete color="error" /> : null}
                sx={{
                  pointerEvents: !socialInfo ? 'none' : 'default',
                  justifyContent: 'flex-start'
                }}
                onClick={() => handleDelete(provider)}
              >
                {socialInfo ? (
                  <Stack alignItems="flex-start" flexGrow={1} pl={2}>
                    <Typography variant="caption" color="text.secondary">
                      Display Name: {socialInfo.displayName ?? 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {socialInfo.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Email: {socialInfo.email}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    align="center"
                    variant="caption"
                    fontWeight={700}
                    width="100%"
                  >
                    NOT ACTIVE
                  </Typography>
                )}
              </Button>
            </Tooltip>
          )
        })}
      </Stack>
    </>
  )
}

export default SocialInfoSection
