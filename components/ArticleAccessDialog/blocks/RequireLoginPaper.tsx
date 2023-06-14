import { Paper, Typography, Divider, DialogContent, Box } from '@mui/material'

import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import LimitedAccessActions from '../actions/LimitedAccessActions'
import DialogTitleWithCloseButton from '../common/DialogTitleWithCloseButton'

type Props = {
  accessData: ArticleAccessQuery
  onClose(e: any): void
}
const RequireLoginPaper = ({ accessData, onClose }: Props) => {
  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Login Required"
        onClose={() => onClose({})}
      ></DialogTitleWithCloseButton>
      <Divider />
      <DialogContent>
        <Box mb={2}>
          <Typography>Your institution is currently subscribed.</Typography>
          <Typography variant="body2" color="text.secondary">
            Please sign in to access this video-article. If you do not have an
            account, please create an account and you will have full access.
          </Typography>
        </Box>
        <LimitedAccessActions />
      </DialogContent>
    </Paper>
  )
}

export default RequireLoginPaper
