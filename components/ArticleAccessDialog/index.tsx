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
import InstitutionalAccessAnonPaper from './common/InstitutionalAccessAnonPaper'

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
  const hasAccess = accessData?.getTypesWithAccess?.includes(accessType)

  const MainBlock = useMemo(() => {
    switch (accessType) {
      case AccessTypeEnum.AwaitingEmailConfirmation:
        return EmailConfirmationRequiredPaper
      case AccessTypeEnum.EmailConfirmationExpired:
        return EmailExpiryNotice
      case AccessTypeEnum.RequireSubscription:
      case AccessTypeEnum.InstitutionNameOrAliasRestricted:
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
      // no additional blocks for these accessTypes
      case AccessTypeEnum.EmailConfirmationExpired:
      case AccessTypeEnum.AwaitingEmailConfirmation:
      case AccessTypeEnum.InstitutionLoginRequired:
        break

      // have additional blocks for these access types:
      case AccessTypeEnum.InstitutionSubscriptionExpired:
      case AccessTypeEnum.RequireSubscription:
      case AccessTypeEnum.InstitutionNameOrAliasRestricted:
      case AccessTypeEnum.Evaluation:
      case AccessTypeEnum.LimitedAccess:
        if (isLoggedIn) {
          additional.push(InstitutionalAccessPaper)
        } else {
          additional.push(InstitutionalAccessAnonPaper)
        }
        additional.push(AlreadySubscribedPaper)
        additional.push(EmergencyAccessPaper)
        break
      default:
        break
    }

    return additional
  }, [accessType, isLoggedIn])
  const hasAdditionalBlocks = addditional_blocks.length > 0
  if (hasAccess) return null
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
            <Block key={i} accessData={accessData} />
          ))}
        </Stack>
      </Modal>
    </ThemeProvider>
  )
}

export default React.memo(ArticleAccessDialog)
