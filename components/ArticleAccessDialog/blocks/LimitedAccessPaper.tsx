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
import LimitedAccessActions from '../actions/LimitedAccessActions'
type Props = {
  accessData: ArticleAccessQuery
  onClose(e: any): void
}
const LimitedAccessPaper = ({ accessData, onClose }: Props) => {
  return (
    <Paper>
      <DialogTitle sx={{ pr: 2 }}>
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h5">To Continue Evaluation</Typography>
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography mb={2}>
          You must login or create an account to continue evaluating this
          article. But you can review free articles{' '}
          <MuiLink href="/sample-cases" sx={{ color: 'info.main' }}>
            here
          </MuiLink>{' '}
          without needing to login.
        </Typography>
        <LimitedAccessActions />
      </DialogContent>
    </Paper>
  )
}

export default LimitedAccessPaper
