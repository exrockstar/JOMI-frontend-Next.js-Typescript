import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  gridClasses,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import { removeTypeNameFromGQLResult } from 'common/utils'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Formik } from 'formik'
import { UserDetailQuery, useUpdateUserCmsMutation } from 'graphql/cms-queries/user-list.generated'
import { UpdateUserInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import AccountActions from './AccountActions/AccountActions'
import BasicInfoSection from './BasicInfoSection'
import InstitutionSection from './InstitutionSection'
import InterestsSection from './InterestsSection'
import OtherSettings from './OtherSettings'
import ProfileImageSection from './ProfileImageSection'
import SocialInfoSection from './SocialInfoSection'
import UserSubmitButton from './UserSubmitButton'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import PreviouslyStatedInstitutions from './PreviouslyStatedInstitutions'
type Props = {
  user: UserDetailQuery['userById']
}
const UserMainSettings = ({ user }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [updateUser, { loading: updating, client }] = useUpdateUserCmsMutation({
    onCompleted(result) {
      enqueueSnackbar(`Successfully to updated user`, {
        variant: 'success'
      })
    },
    onError(error) {
      enqueueSnackbar(`Failed to updated user: ${error.message}`, {
        variant: 'error'
      })
    }
  })

  return (
    <Formik
      initialValues={{
        email: user.email,
        phone: user.phone,
        display_name: user.display_name,
        firstName: user.name?.first,
        lastName: user.name?.last,
        referer: user.referer === '' ? 'organic' : user.referer,
        referrerPath: user.referrerPath === '' ? 'N/A' : user.referrerPath,
        user_type: user.user_type,
        specialty: user.specialty ?? 'Other',
        role: user.role,
        slug: user.slug ?? '',
        email_preference: user.email_preference,
        interests: user.interests,
        social: removeTypeNameFromGQLResult(user.social),
        institution_name: user.institution_name,
        inst_email: user.institutionalEmail,
        institution: user.institution,
        matched_institution_name: user.matched_institution_name,
        // matchedBy: user.matchedBy ?? MatchedBy.NotMatched,
        // matchStatus: user.matchStatus ?? MatchStatus.NotMatched,
        instEmailVerified: user.instEmailVerified,
        emailNeedsConfirm: user.emailNeedsConfirm,
        hasManualBlock: user.hasManualBlock,
        manualBlockMessage: user.manualBlockMessage,
        deleted: user.deleted,
        image: {
          filename: user.image?.filename,
          length: user.image?.length,
          format: user.image?.format
        },
        isTrialFeatureOn: user.isTrialFeatureOn,
        trialDuration: user.trialDuration
      }}
      onSubmit={(values, formikHelper) => {
        const temp = { ...values }

        const input: UpdateUserInput = {
          id: user._id,
          ...temp
        }
        updateUser({
          variables: {
            input
          },
          onCompleted() {
            router.reload()
          }
        })
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ProfileImageSection
            user={user}
            onChangeImage={() => {
              console.log('image changed')
            }}
          />
          <BasicInfoSection />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InterestsSection />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SocialInfoSection />
          <InstitutionSection user={user} />
          <FormGroup sx={{ my: 2 }}>
            <Typography variant="h5">Trials</Typography>
            <FormControlLabel control={<FormikCheckbox name="isTrialFeatureOn" />} label="Enable trials" />
            <FormikTextField name="trialDuration" type="number" label="Trial duration (days)" size="small" />
          </FormGroup>
          <PreviouslyStatedInstitutions institutions={user?.previouslyStatedInstitutions} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <OtherSettings />
          <UserSubmitButton loading={updating} />
          <AccountActions user={user} />
        </Grid>
      </Grid>
    </Formik>
  )
}

export default UserMainSettings
