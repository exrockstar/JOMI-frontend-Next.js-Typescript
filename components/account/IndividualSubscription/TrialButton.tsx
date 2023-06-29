import { Box, BoxProps } from '@mui/material'
import { amplitudeTrackTrial } from 'apis/amplitude'
import { analytics } from 'apis/analytics'
import CTAButton from 'components/common/CTAButton'
import { useAddTrialOrderForUserMutation } from 'graphql/cms-queries/trials.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  trialDuration: number
}
const TrialButton = ({ trialDuration }: Props) => {
  const description = `Try free for ${trialDuration} days`
  const router = useRouter()
  const {data: session } = useSession()
  const [addTrialOrder, { loading }] = useAddTrialOrderForUserMutation({
    onCompleted() {
      router.reload()
      analytics.trackTrial({})
      amplitudeTrackTrial({
        user_id: session.user ? session.user._id : 'none',
        duration: trialDuration
      })
    }
  })
  return (
    <TrialButtonContainer mb={1}>
      {description}
      <CTAButton
        loading={loading}
        onClick={() => {
          addTrialOrder()
        }}
      >
        Try now
      </CTAButton>
    </TrialButtonContainer>
  )
}

export default TrialButton

export const TrialButtonContainer = (props: BoxProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        borderWidth: 1,
        borderColor: 'grey.300',
        borderRadius: 2,
        borderStyle: 'solid',
        p: 1,
        pl: 2,
        display: 'flex',
        gap: { xs: 1, md: 2 },
        justifyContent: 'space-between',
        width: { xs: '100%', md: 500 },
        alignItems: { xs: 'stretch', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' }
      }}
      {...props}
    />
  )
}
