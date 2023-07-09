import {
  Paper,
  Typography,
  Divider,
  DialogContent,
  Link as MuiLink
} from '@mui/material'

import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import RequireSubscriptionActions from '../actions/RequireSubscriptionActions'
import DialogTitleWithCloseButton from '../common/DialogTitleWithCloseButton'

type Props = {
  accessData: ArticleAccessQuery
  onClose(e: any): void
}
const SubscriptionExpiredPaper = ({ accessData, onClose }: Props) => {
  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Subscription Expired"
        onClose={() => onClose({})}
      />
      <Divider />
      <DialogContent>
        <Typography mb={2}>
          Your {`institution's`} subscription has expired. You must have an
          active subscription to continue watching this article.{' '}
          <MuiLink href="/sample-cases" sx={{ color: 'info.main' }}>
            Click here{' '}
          </MuiLink>
          for sample articles.
        </Typography>
        <RequireSubscriptionActions accessData={accessData} />
      </DialogContent>
    </Paper>
  )
}

export default SubscriptionExpiredPaper
