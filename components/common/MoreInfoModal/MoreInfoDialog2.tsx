import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Divider,
  Typography,
  Stack,
  MenuItem,
  useMediaQuery,
  DialogProps
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import SubmitButton from 'components/account/SubmitButton'
import { useAppState } from 'components/_appstate/useAppState'
import { Form, Formik } from 'formik'
import { useCompleteRegistrationMutation } from 'graphql/mutations/complete-user-registration.generated'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import {
  UserProfileDocument,
  UserProfileQuery,
  useUserProfileLazyQuery
} from 'graphql/queries/user-profile.generated'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { AccessTypeEnum } from 'graphql/types'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string, Asserts } from 'yup'
import FormikTextField from '../formik/FormikTextFIeld'
import FormikSelect from '../formik/FormkSelect'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'

const schema = object({
  institution_name: string(),
  inst_email: string().email(),
  user_type: string().required('Please select your user type.'),
  specialty: string().required('Please select your specialty.')
})

type FormValues = Asserts<typeof schema>

const initialValues: FormValues = {
  inst_email: '',
  institution_name: '',
  specialty: '',
  user_type: ''
}

type Props = {
  user?: UserProfileQuery['user']
} & DialogProps
/**
 * Asks more information about the user if the user is newly registered.
 * @returns
 */
const MoreInfoDialog2: React.FC<Props> = ({ user, open, onClose }: Props) => {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { toggleMatchedInstModal } = useAppState()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const isLackingInfo = Boolean(user) && (!user.user_type || !user.specialty)
  
  const [updateProfile, { loading: updateLoading }] =
    useCompleteRegistrationMutation({
      onCompleted({ completeUserRegistration: result }) {
        console.log(result)
        const accessType = result.updatedAccess
        const hasInstitutionalSubscription =
          accessType.accessType === AccessTypeEnum.InstitutionalSubscription

        if (hasInstitutionalSubscription) {
          //show matched with institution modal with sent email request
          toggleMatchedInstModal()
          console.log('toggleMatchedInstModal')
        } else {
          enqueueSnackbar('Thank you! your profile has been updated.', {
            variant: 'info'
          })
        }
        onClose({}, 'backdropClick')
      },
      refetchQueries: [UserPricesDocument, UserProfileDocument]
    })

  const { data: optionsData } = useUserTypesAndSpecialtiesQuery({
    skip: !isLackingInfo
  })

  const handleSubmit = async (values: FormValues) => {
    updateProfile({
      variables: {
        input: {
          institution_name: values.institution_name,
          institutional_email: values.inst_email,
          user_type: values.user_type,
          specialty: values.specialty,
        }
      }
    })
  }

  const userTypes = optionsData?.userTypes
  const specialties = optionsData?.specialties

  if (!open) return null
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Dialog open={open} fullScreen={fullScreen}>
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

          <DialogContent>
            {/* don't show if we already matched institution from user access type */}
            {!user?.institution_name && (
              <Box my={1}>
                <Typography fontWeight={700} variant="body2">
                  Your Institutional Association
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  If you are not affiliated with any institution you may leave
                  these fields blank and click continue.
                </Typography>
                <FormikTextField
                  name="institution_name"
                  placeholder="e.g., Medical College"
                  fullWidth
                  size="small"
                />
              </Box>
            )}
            {/* don't show if we already sent an insitution email. Otherwise, user will get multiple emails */}
            {!user?.institutionalEmail && (
              <Box mt={2}>
                <Typography fontWeight={700} variant="body2">
                  Your Institutional Email Address
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  If affiliated with any institution please include your
                  institution email. It is the primary way of matching you to
                  your institution.
                </Typography>
                <FormikTextField
                  name="inst_email"
                  placeholder="e.g., student@college.edu"
                  fullWidth
                  size="small"
                />
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

          <DialogActions>
            <CancelButton
              color="error"
              variant="outlined"
              onClick={() => signOut()}
            >
              Nevermind, sign me out
            </CancelButton>
            <SubmitButton type="submit" loading={updateLoading}>
              Continue
            </SubmitButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default MoreInfoDialog2

const CancelButton = styled(Button)({
  borderRadius: 4,
  textTransform: 'capitalize'
})
