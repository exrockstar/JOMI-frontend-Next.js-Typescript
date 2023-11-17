import {
  Paper,
  Stack,
  DialogTitle,
  Typography,
  Divider,
  DialogContent
} from '@mui/material'
import CTAButton from 'components/common/CTAButton'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Formik, Form } from 'formik'
import { useUpdateInstEmailMutation } from 'graphql/mutations/update-inst-email.generated'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import { UserProfilePageDocument } from 'graphql/queries/user-profile-page.generated'
import { UserProfileDocument } from 'graphql/queries/user-profile.generated'
import { useSnackbar } from 'notistack'
import { TypeOf, object, string } from 'yup'
import NextLink from 'next/link'
import { analytics } from 'apis/analytics'
import { useRouter } from 'next/router'
import {
  ArticleAccessDocument,
  ArticleAccessQuery
} from 'graphql/queries/article-access.generated'
const schema = object({
  inst_email: string().email('Please enter a valid email')
})

type Props = {
  accessData: ArticleAccessQuery
}

const InstitutionalAccessPaper = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const fromUrl = encodeURIComponent(router?.asPath)

  const [updateInstEmail, { loading: updatingProfile }] =
    useUpdateInstEmailMutation({
      refetchQueries: [
        { query: UserProfilePageDocument },
        { query: UserProfileDocument },
        { query: UserPricesDocument },
        { query: ArticleAccessDocument }
      ],
      onCompleted: (data) => {
        enqueueSnackbar('Success. We matched you to your institution.', {
          variant: 'success'
        })
      },
      onError(e) {
        enqueueSnackbar(e.message, { variant: 'error' })
      }
    })

  const handleSubmit = async (values: TypeOf<typeof schema>) => {
    updateInstEmail({
      variables: {
        email: values.inst_email
      }
    })
  }
  return (
    <Paper>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ inst_email: '' }}
        validationSchema={schema}
      >
        <Form>
          <Stack>
            <DialogTitle>
              <Typography variant="h5">Institutional Access</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Typography mb={2} variant="body2">
                If you are at an institution that has an institutional
                subscription, please add a valid institutional email to your
                profile:
              </Typography>
              <FormikTextField
                name="inst_email"
                fullWidth
                size="small"
                placeholder="johndoe@jomi.edu"
                label="Institutional Email"
              />
              <CTAButton
                fullWidth
                type="submit"
                sx={{
                  my: 2
                }}
                loading={updatingProfile}
              >
                Submit
              </CTAButton>
              {props.accessData?.getIsRequestInstSubButtonPaperOn && (
                <>
                  <Divider>or</Divider>
                  <CTAButton
                    LinkComponent={NextLink}
                    data-event={
                      'ArticleAccessDialog - Request Institutional Subscription'
                    }
                    sx={{ mt: 2 }}
                    onClick={analytics.trackClick}
                    fullWidth
                    href={`/account/request-subscription?from=${fromUrl}`}
                  >
                    Request Institutional Subscription
                  </CTAButton>
                </>
              )}
            </DialogContent>
          </Stack>
        </Form>
      </Formik>
    </Paper>
  )
}

export default InstitutionalAccessPaper
