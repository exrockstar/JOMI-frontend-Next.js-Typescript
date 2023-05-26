import { Box, Stack, Typography, TextField, List, ListItem } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'

import { UserDetailQuery } from 'graphql/cms-queries/user-list.generated'

import React from 'react'
import UserDetailInstitutionSelector from './UserDetailInstitutionSelector'

type Props = {
  user: UserDetailQuery['userById']
}

const InstitutionSection = ({ user }: Props) => {
  return (
    <div>
      <Typography variant="h5" my={2}>
        Institution
      </Typography>
      <Stack spacing={2}>
        <UserDetailInstitutionSelector />
        <FormikTextField size="small" name="institution_name" label="Stated Institution" />
        <FormikTextField
          name="institution"
          label="Institution ID"
          fullWidth
          size="small"
          helperText="ID will be auto-populated when choosing a valid institution name / alias"
          disabled
        />
        <FormikTextField name="inst_email" label="Institutional Email" fullWidth size="small" />
        <FormikTextField
          value={user?.matchedBy}
          name="matchedBy"
          label="Matched By"
          fullWidth
          size="small"
          helperText="By whom this user was matched by"
          defaultValue=""
          disabled
        />

        <FormikTextField
          value={user?.matchStatus}
          name="matchStatus"
          label="Match Status"
          fullWidth
          size="small"
          disabled
          defaultValue=""
          helperText="Which method was used to match the user to their institution"
        />
      </Stack>
    </div>
  )
}

export default InstitutionSection
