import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { useIsJobRunningLazyQuery } from 'graphql/cms-queries/jobs.generated'
import {
  useCheckFrequentArticleViewsDataLazyQuery,
  useCleanUpFrequentArticleViewsDataMutation
} from 'graphql/queries/access.generated'
import { UserRoles } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

const AdminControlPanel = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user
  const institution_id = router.query.id as string
  const [showConfirm, setShowConfirm] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [checkArticleViews, { data, client }] =
    useCheckFrequentArticleViewsDataLazyQuery({
      onCompleted() {
        setShowConfirm(true)
      }
    })

  const [startCleanUp] = useCleanUpFrequentArticleViewsDataMutation({
    onCompleted() {
      enqueueSnackbar('Starting clean up task...', { variant: 'success' })
      isJobRunning({
        variables: {
          name: 'TransferDuplicateDomainsJob'
        }
      })
    }
  })

  const [isJobRunning, { loading, data: jobRunning }] =
    useIsJobRunningLazyQuery({
      onCompleted(result) {
        if (result.isJobRunning) {
          setTimeout(() => {
            isJobRunning({
              variables: {
                name: 'RemoveFrequentArticleViewActivity'
              }
            })
          }, 2000)
        }

        if (result.jobProgress >= 100) {
          enqueueSnackbar(`Clean up successful! Reloading page...`, {
            variant: 'success'
          })
          setShowConfirm(false)
          router.reload()
        }
      },
      fetchPolicy: 'network-only'
    })
  if (user?.role !== UserRoles.Admin) {
    return null
  }

  const numberOfArticleViewsToDelete = data?.result
  return (
    <Stack my={2}>
      <ConfirmationDialog
        onComplete={() => {
          startCleanUp({
            variables: {
              institution_id
            }
          })
        }}
        onCancel={() => {
          setShowConfirm(false)
        }}
        dialogTitle={'Confirm to delete article view access records'}
        open={showConfirm}
        loading={loading || jobRunning?.isJobRunning}
      >
        Found <b>{numberOfArticleViewsToDelete}</b> frequent article views. Are
        you sure to delete them all?
      </ConfirmationDialog>
      <Card>
        <CardContent>
          <Typography variant="h5" fontSize={20}>
            Admin Control Panel
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Provides a way to clean up the data for the institution if necessary
          </Typography>

          <Stack my={2}>
            <Box>
              <Button
                variant="outlined"
                title="Removes duplicate article view data within the last hour"
                onClick={() => {
                  checkArticleViews({
                    variables: {
                      institution_id
                    }
                  })
                }}
              >
                Clean Up Frequent Article View Data
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default AdminControlPanel
