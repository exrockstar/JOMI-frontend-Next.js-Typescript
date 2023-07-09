import { useEffect } from 'react'
import { Box, FormControl, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { Formik, Form, Field, useFormikContext } from 'formik'
import { TextField, CheckboxWithLabel, Select } from 'formik-mui'
import { initialValues, profileSchema } from './schema'
import { interests } from './data'
import SubmitButton from '../SubmitButton'

import { LoadingButton } from '@mui/lab'
import { useProfileOptionsQuery } from 'graphql/queries/profile-options.generated'
import { UserProfilePageQuery } from 'graphql/queries/user-profile-page.generated'
import { UpdateProfileInput } from 'graphql/types'
import { analytics } from 'apis/analytics'

type Props = {
  handleSubmit(values: UpdateProfileInput, actions: any): void
  userData?: UserProfilePageQuery['user']
  loading?: boolean
}
function ProfileForm({ loading }: Props) {
  const { data: formData } = useProfileOptionsQuery()

  const context = useFormikContext<typeof initialValues>()
  const userTypes = formData?.profileOptions?.userTypes
  const specialties = formData?.profileOptions?.specialties

  useEffect(() => {
    const errors = Object.keys(context.errors).filter((i) => context.errors[i])
    if (!(errors?.length && context.isSubmitting)) return

    const element = document.getElementById(errors[0])
    const bodyRect = document.body.getBoundingClientRect(),
      elemRect = element.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top - 100
    window.scroll({
      top: offset,
      behavior: 'smooth'
    })
  }, [context, context.errors])
  return (
    <Form>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
      >
        <Box m={1}>
          <InputLabel>First Name</InputLabel>
          <Field
            component={TextField}
            variant="standard"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            fullWidth
          />
        </Box>
        <Box m={1}>
          <InputLabel>Last Name</InputLabel>
          <Field
            component={TextField}
            variant="standard"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            fullWidth
          />
        </Box>
        <Box m={1}>
          <InputLabel>Phone number</InputLabel>
          <Field
            component={TextField}
            variant="standard"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            fullWidth
          />
        </Box>
        <Box m={1}>
          <InputLabel>Display Name</InputLabel>
          <Field
            component={TextField}
            variant="standard"
            id="display_name"
            name="display_name"
            placeholder="Display Name"
            fullWidth
          />
        </Box>
        <Box m={1}>
          <InputLabel>Institution Name</InputLabel>
          <Field
            component={TextField}
            variant="standard"
            id="institution_name"
            name="institution_name"
            placeholder="Institution"
            fullWidth
          />
        </Box>

        <Box m={1} flex={1}>
          <InputLabel>Institution Email</InputLabel>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'stretch', md: 'flex-end' }}
            spacing={2}
          >
            <Field
              component={TextField}
              variant="standard"
              id="institutional_email"
              name="institutional_email"
              placeholder="Institutional Email"
              fullWidth
              sx={{ flex: 2 }}
            />
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} m={1} spacing={2}>
          <FormControl>
            <Typography color="text.secondary">User Type</Typography>
            <Field
              component={Select}
              placeholder="User Type"
              id="user_type"
              name="user_type"
              variant="standard"
            >
              {userTypes?.map((userType) => (
                <MenuItem key={userType._id} value={userType.type}>
                  {userType.type}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <FormControl>
            {/* <InputLabel htmlFor="specialty">Specialty</InputLabel> */}
            <Typography color="text.secondary">Specialty</Typography>
            <Field
              component={Select}
              id="specialty"
              name="specialty"
              variant="standard"
            >
              {specialties?.map((specialty) => (
                <MenuItem key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </MenuItem>
              ))}
              <MenuItem value={'Other'}>Other</MenuItem>
              <MenuItem value={'Not Specialized'}>Not Specialized</MenuItem>
            </Field>
          </FormControl>
        </Stack>
        <Box m={1}>
          <InputLabel>Interests</InputLabel>
          {interests.map((interest, index) => (
            <Field
              key={index}
              component={CheckboxWithLabel}
              type="checkbox"
              name="interests"
              value={interest}
              Label={{ label: interest }}
            />
          ))}
        </Box>
        <Box m={1}>
          <SubmitButton
            variant="text"
            type="submit"
            loading={loading}
            onClick={analytics.trackClick}
            data-event="Account - Profile Save Changes Button"
          >
            Save Changes
          </SubmitButton>
        </Box>
      </Box>
    </Form>
  )
}

/**
 * Just a Wrapper for ProfileForm so that we can use useFormikContext in ProfileForm component
 * @param props
 * @returns
 */
export default function ProfileFormWrapper(props: Props) {
  const { userData } = props
  const values: UpdateProfileInput = {
    firstName: userData?.name.first || initialValues.firstName,
    lastName: userData?.name.last || initialValues.lastName,
    display_name: userData?.display_name || initialValues.display_name,
    institution_name:
      userData?.institution_name || initialValues.institution_name,
    institutional_email:
      userData?.institutionalEmail || initialValues.institutional_email,
    user_type: userData?.user_type || initialValues.user_type,
    specialty: userData?.specialty || initialValues.specialty,
    interests: userData?.interests || initialValues.interests,
    phone: userData?.phone || initialValues.phone
  }
  return (
    <Formik
      initialValues={userData ? values : initialValues}
      validationSchema={profileSchema}
      onSubmit={(values, actions) => props.handleSubmit(values, actions)}
    >
      <ProfileForm {...props} />
    </Formik>
  )
}
