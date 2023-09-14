import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Typography,
  Stack,
  MenuItem,
  useMediaQuery,
  DialogProps
} from '@mui/material'
import { ThemeProvider, styled, useTheme } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import { useCompleteRegistrationMutation } from 'graphql/mutations/complete-user-registration.generated'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import {
  UserProfileDocument,
  UserProfileQuery
} from 'graphql/queries/user-profile.generated'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string, Asserts } from 'yup'
import FormikTextField from '../formik/FormikTextFIeld'
import FormikSelect from '../formik/FormkSelect'
import CTAButton from '../CTAButton'
import { frontPageTheme } from 'components/theme'
import { useAppState } from 'components/_appstate/useAppState'

const schema = object({
  first_name: string().required('Please enter your first name.'),
  last_name: string().required('Please enter your last name.'),
  institution_name: string(),
  inst_email: string().email(),
  user_type: string().required('Please select your user type.'),
  specialty: string().required('Please select your specialty.')
})

type FormValues = Asserts<typeof schema>

const initialValues: FormValues = {
  first_name: '',
  last_name: '',
  inst_email: '',
  institution_name: '',
  specialty: '',
  user_type: ''
}

type Props = {
  data: UserProfileQuery
} & DialogProps
/**
 * Asks more information about the user if the user is newly registered.
 * @returns
 */
const MoreInfoDialog2: React.FC<Props> = ({ data, open, onClose }: Props) => {
  const theme = useTheme()
  const user = data.user
  const userAccessType = user?.accessType
  const { enqueueSnackbar } = useSnackbar()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  const {setShowPricingDialog} = useAppState()

  const [updateProfile, { loading: updateLoading }] =
    useCompleteRegistrationMutation({
      onCompleted() {
        enqueueSnackbar('Thank you! your profile has been updated.', {
          variant: 'info'
        })
        setShowPricingDialog(true)
        onClose({}, null)
      },
      refetchQueries: [UserPricesDocument, UserProfileDocument]
    })

  const { data: optionsData } = useUserTypesAndSpecialtiesQuery({
    skip: !open
  })

  const handleSubmit = async (values: FormValues) => {
    updateProfile({
      variables: {
        input: {
          first_name: values.first_name,
          last_name: values.last_name,
          institution_name: values.institution_name,
          institutional_email: values.inst_email,
          user_type: values.user_type,
          specialty: values.specialty
        }
      }
    })
  }

  const userTypes = optionsData?.userTypes
  const specialties = optionsData?.specialties

  if (!open) return null
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Dialog
          open={open}
          maxWidth="sm"
          fullScreen={!user.institution && isSmallDevice}
        >
          <Form>
            <DialogTitle>
              <Stack>
                <Typography variant="h5">
                  We would love to know more about you!
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Please take a moment to fill in the following information
                </Typography>
              </Stack>
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ minWidth: { lg: 480 } }}>
              <Box mt={-1}>
                <Typography fontWeight={700} variant="body2">
                  Your First Name
                </Typography>
                <FormikTextField
                  name="first_name"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box mt={2}>
                <Typography fontWeight={700} variant="body2">
                  Your Last Name
                </Typography>
                <FormikTextField
                  name="last_name"
                  fullWidth
                  size="small"
                />
              </Box>
              {!user.institution ? (
                <>
                  <Box my={1}>
                    <Typography fontWeight={700} variant="body2">
                      Your Institutional Association
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      If you are not affiliated with any institution you may
                      leave these fields blank and click continue.
                    </Typography>
                    <FormikTextField
                      name="institution_name"
                      placeholder="e.g., Medical College"
                      fullWidth
                      size="small"
                    />
                  </Box>

                  <Box mt={2}>
                    <Typography fontWeight={700} variant="body2">
                      Your Institutional Email Address
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      If affiliated with any institution please include your
                      institution email. It is the primary way of matching you
                      to your institution.
                    </Typography>
                    <FormikTextField
                      name="inst_email"
                      placeholder="e.g., student@college.edu"
                      fullWidth
                      size="small"
                    />
                  </Box>
                </>
              ) : (
                <Box>
                  <Typography color="text.primary" variant="body2">
                    <b>Institution</b>: {userAccessType.institution_name}
                  </Typography>
                  {user.institutionalEmail ? (
                    <Typography color="text.secondary" variant="body2">
                      <b>Institutional email</b>:{' '}
                      {userAccessType.shouldRequestInstVerification}
                    </Typography>
                  ) : (
                    <Box mt={2}>
                      <Typography fontWeight={700} variant="body2">
                        Your Institutional Email Address
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        If affiliated with any institution please include your
                        institution email. It is the primary way of matching you
                        to your institution.
                      </Typography>
                      <FormikTextField
                        name="inst_email"
                        placeholder="e.g., student@college.edu"
                        fullWidth
                        size="small"
                      />
                    </Box>
                  )}
                </Box>
              )}
              <Box mt={2}>
                <Typography fontWeight={700} variant="body2">
                  User Type
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Please select a user type that best suites you.
                </Typography>
                <FormikSelect
                  fullWidth
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
              </Box>
              <Box mt={2}>
                <Typography fontWeight={700} variant="body2">
                  Specialty
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Please select a specialty that best suites you.
                </Typography>
                <FormikSelect
                  fullWidth
                  size="small"
                  name="specialty"
                  id="specialty"
                >
                  {specialties?.map((item) => (
                    <MenuItem value={item.name} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                  <MenuItem value={'Other'}>Other</MenuItem>
                  <MenuItem value={'Not Specialized'}>Not Specialized</MenuItem>
                </FormikSelect>
              </Box>
            </DialogContent>
            <Divider />
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                justifyContent: { xs: 'stretch', md: 'flex-end' },
                gap: 2
              }}
            >
              <CancelButton
                color="error"
                variant="outlined"
                onClick={() => signOut()}
                sx={{ px: 2 }}
                fullWidth
              >
                Nevermind, sign me out
              </CancelButton>
              <CTAButton
                type="submit"
                loading={updateLoading}
                sx={{ px: 2, ml: 0 }}
                fullWidth
              >
                Complete Registration
              </CTAButton>
            </Box>
          </Form>
        </Dialog>
      </Formik>
    </ThemeProvider>
  )
}

export default MoreInfoDialog2

const CancelButton = styled(Button)({
  borderRadius: 4,
  textTransform: 'capitalize'
})
