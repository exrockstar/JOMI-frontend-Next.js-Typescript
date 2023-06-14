import { Close } from '@mui/icons-material'
import {
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  Link as MuiLink
} from '@mui/material'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import RequireSubscriptionActions from '../actions/RequireSubscriptionActions'
import DialogTitleWithCloseButton from '../common/DialogTitleWithCloseButton'
type Props = {
  accessData: ArticleAccessQuery
  onClose(e: any): void
}
const EvaluationPaper = ({ accessData, onClose }: Props) => {
  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Evaluation Access"
        onClose={() => onClose({})}
      />
      <Divider />
      <DialogContent>
        <Typography mb={2}>
          If you find jomi helpful, please consider requesting a subscription
          from your institution or purchasing an individual subscription.{' '}
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

export default EvaluationPaper
