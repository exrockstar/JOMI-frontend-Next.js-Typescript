import React, { useMemo } from 'react'
import { Modal, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import dayjs from 'dayjs'

import { AccessTypeEnum } from 'graphql/types'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

import { frontPageTheme } from 'components/theme'

import EmailConfirmationRequiredPaper from './blocks/EmailConfirmationRequiredPaper'
import EmailExpiryNotice from './blocks/EmailConfirmationExpiredPaper'
import InstitutionalAccessPaper from './common/InstitutionalAccessPaper'
import AlreadySubscribedPaper from './common/AlreadySubscribedPaper'
import RequireSubscriptionPaper from './blocks/RequireSubscriptionPaper'
import LimitedAccessPaper from './blocks/LimitedAccessPaper'

import SubscriptionExpiredPaper from './blocks/SubscriptionExpiredPaper'
import RequireLoginPaper from './blocks/RequireLoginPaper'
import EvaluationPaper from './blocks/EvaluationPaper'
import EmergencyAccessPaper from './common/EmergencyAccessPaper'

type ArticleAccessDialogProps = {
  open: boolean
  handleState(state: boolean): void
  publication_id: string
  accessData: ArticleAccessQuery
}

function ArticleAccessDialog({
  open,
  accessData,
  handleState
}: ArticleAccessDialogProps) {
  const handleClose = (e: React.SyntheticEvent, reason?: string) => {
    if (reason === 'backdropClick') {
      return null
    }
    handleState(false)
  }
  const isLoggedIn = accessData?.user
  const articleAccess = accessData?.article?.articleAccessType
  const accessType = articleAccess?.accessType
  const hasNoAccess = [
    AccessTypeEnum.LimitedAccess,
    AccessTypeEnum.RequireSubscription,
    AccessTypeEnum.AwaitingEmailConfirmation,
    AccessTypeEnum.EmailConfirmationExpired,
    AccessTypeEnum.InstitutionLoginRequired,
    AccessTypeEnum.InstitutionSubscriptionExpired,
    AccessTypeEnum.Evaluation
  ].includes(accessType)

  const MainBlock = useMemo(() => {
    switch (accessType) {
      case AccessTypeEnum.AwaitingEmailConfirmation:
        return EmailConfirmationRequiredPaper
      case AccessTypeEnum.EmailConfirmationExpired:
        return EmailExpiryNotice
      case AccessTypeEnum.RequireSubscription:
        return RequireSubscriptionPaper
      case AccessTypeEnum.Evaluation:
        return EvaluationPaper
      case AccessTypeEnum.InstitutionSubscriptionExpired:
        return SubscriptionExpiredPaper
      case AccessTypeEnum.InstitutionLoginRequired:
        return RequireLoginPaper
      case AccessTypeEnum.LimitedAccess:
        return LimitedAccessPaper
      default:
        return null
    }
  }, [accessType])

  const addditional_blocks = useMemo(() => {
    const additional = []
    switch (accessType) {
      case AccessTypeEnum.EmailConfirmationExpired:
      case AccessTypeEnum.AwaitingEmailConfirmation:
      case AccessTypeEnum.InstitutionLoginRequired:
      case AccessTypeEnum.InstitutionSubscriptionExpired:
        break
      case AccessTypeEnum.RequireSubscription:
      case AccessTypeEnum.Evaluation:
        if (isLoggedIn) {
          additional.push(InstitutionalAccessPaper)
        } else {
          additional.push(AlreadySubscribedPaper)
        }
        additional.push(EmergencyAccessPaper)
        break

      case AccessTypeEnum.LimitedAccess:
        additional.push(AlreadySubscribedPaper)
        additional.push(EmergencyAccessPaper)
      default:
        break
    }

    return additional
  }, [accessType, isLoggedIn])
  const hasAdditionalBlocks = addditional_blocks.length > 0
  if (!hasNoAccess) return null
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Modal
        keepMounted
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ overflowY: 'auto' }}
      >
        <Stack
          gap={1.5}
          maxWidth={'sm'}
          mx="auto"
          justifyContent={hasAdditionalBlocks ? 'flex-start' : 'center'}
          py={{ xs: 0, sm: 4 }}
          height={'100vh'}
        >
          <MainBlock
            accessData={accessData}
            onClose={(e) => handleClose(e, null)}
          />
          {addditional_blocks?.map((Block, i) => (
            <Block key={i} />
          ))}
        </Stack>
      </Modal>
    </ThemeProvider>
  )
}

export default React.memo(ArticleAccessDialog)
