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
const RequireSubscriptionPaper = ({ accessData, onClose }: Props) => {
  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Subscription Required to Continue"
        onClose={() => onClose({})}
      ></DialogTitleWithCloseButton>
      <Divider />
      <DialogContent>
        <Typography variant="body2" mb={2}>
          You must have a subscription to continue watching this article.{' '}
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

export default RequireSubscriptionPaper
