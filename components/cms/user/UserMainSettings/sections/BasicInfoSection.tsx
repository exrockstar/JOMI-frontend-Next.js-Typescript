import { Typography, Stack, MenuItem, Box } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { UserRoles, EmailPreference } from 'graphql/types'
import React from 'react'
import GenerateSlugButton from '../GenerateSlug'

const BasicInfoSection = () => {
  const { data } = useUserTypesAndSpecialtiesQuery()
  const userTypes = data?.userTypes ?? []
  const specialties = data?.specialties ?? []
  const roles = Object.keys(UserRoles).filter(
    (role) => role !== UserRoles.Superadmin
  )
  const email_preferences = Object.keys(EmailPreference)
  return (
    <>
      <Typography variant="h5" my={2}>
        Basic Info
      </Typography>
      <Stack spacing={1}>
        <FormikTextField name="email" label="Email" fullWidth size="small" />
        <FormikTextField name="phone" label="Phone" fullWidth size="small" />
        <FormikTextField
          name="display_name"
          label="Display name"
          fullWidth
          size="small"
        />
        <FormikTextField
          name="firstName"
          label="First name"
          fullWidth
          size="small"
        />
        <FormikTextField
          name="lastName"
          label="Last name"
          fullWidth
          size="small"
        />

        <FormikSelect
          fullWidth
          label="User Type"
          size="small"
          name="user_type"
          id="user_type"
        >
          {userTypes?.map((item) => (
            <MenuItem value={item.type} key={item._id}>
              {item.type}
            </MenuItem>
          ))}
        </FormikSelect>
        <FormikSelect
          fullWidth
          label="Specialty"
          size="small"
          name="specialty"
          id="specialty"
        >
          {specialties?.map((item) => (
            <MenuItem value={item.name} key={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </FormikSelect>
        <FormikSelect
          fullWidth
          label="User Role"
          size="small"
          name="role"
          id="1user_role"
        >
          {roles.map((item, i) => (
            <MenuItem value={UserRoles[item]} key={i}>
              {UserRoles[item]}
            </MenuItem>
          ))}
        </FormikSelect>
        <Box pb={1}>
          <GenerateSlugButton />
        </Box>
        <FormikSelect
          fullWidth
          label="Email preference"
          size="small"
          name="email_preference"
          id="email_preference"
        >
          {email_preferences.map((item, i) => (
            <MenuItem value={EmailPreference[item]} key={i}>
              {EmailPreference[item]}
            </MenuItem>
          ))}
        </FormikSelect>
        <FormikTextField
          name="referer"
          label="Referred From"
          fullWidth
          size="small"
        />
        <FormikTextField
          name="referrerPath"
          label="Referred From Path Name"
          fullWidth
          size="small"
        />
      </Stack>
    </>
  )
}

export default BasicInfoSection
