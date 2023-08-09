import { Divider, Grid } from '@mui/material'
import { removeTypeNameFromGQLResult } from 'common/utils'
import { Formik } from 'formik'
import {
  UserDetailQuery,
  useUpdateUserCmsMutation
} from 'graphql/cms-queries/user-list.generated'
import { useSnackbar } from 'notistack'
import AccountActions from './AccountActions/AccountActions'
import BasicInfoSection from './sections/BasicInfoSection'
import InstitutionSection from './sections/InstitutionSection'
import InterestsSection from './sections/InterestsSection'
import OtherSettings from './sections/OtherSettings'
import ProfileImageSection from './sections/ProfileImageSection'
import SocialInfoSection from './sections/SocialInfoSection'
import UserSubmitButton from './UserSubmitButton'
import { useRouter } from 'next/router'
import PreviouslyStatedInstitutions from './sections/PreviouslyStatedInstitutions'
import TrialsSection from './sections/TrialsSection'
import { UpdateUserInput } from 'graphql/types'
import getModifiedFields from 'components/utils/getModifiedFields'
import TemporaryAccess from './TemporaryAccess'
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
  const initialValues: UpdateUserInput = {
    id: user._id,
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
    institution: user.accessType?.institution_id,
    matched_institution_name: user.accessType?.institution_name,
    // matchedBy: user.matchedBy ?? MatchedBy.NotMatched,
    // matchStatus: user.matchStatus ?? MatchStatus.NotMatched,
    hasManualBlock: user.hasManualBlock,
    manualBlockMessage: user.manualBlockMessage,
    deleted: user.deleted,
    source_ip: user.source_ip,
    image: {
      filename: user.image?.filename,
      length: user.image?.length,
      format: user.image?.format
    },
    trialsAllowed: user.trialsAllowed,
    trialAccessAt: user.trialAccessAt ?? null,
    emailVerifiedAt: user.emailVerifiedAt,
    instEmailVerifiedAt: user.instEmailVerifiedAt
  }
  return (
    <>
      <Formik<UpdateUserInput>
        initialValues={initialValues}
        onSubmit={(values) => {
          // only send modified fields
          const input = getModifiedFields(initialValues, values)
          input.id = values.id
          updateUser({
            variables: { input },
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

            <PreviouslyStatedInstitutions
              institutions={user?.previouslyStatedInstitutions}
              statedInstitution={user.institution_name}
            />
            <TrialsSection />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <OtherSettings />
            <UserSubmitButton loading={updating} />
            <AccountActions user={user} />
          </Grid>
        </Grid>
      </Formik>
      <Divider sx={{ my: 3 }} />
      <TemporaryAccess user={user} />
    </>
  )
}

export default UserMainSettings
