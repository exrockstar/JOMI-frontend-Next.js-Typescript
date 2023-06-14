import {
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  Link as MuiLink,
  Divider
} from '@mui/material'
const EmergencyAccessPaper = () => {
  return (
    <Paper>
      <Stack>
        <DialogTitle>
          <Typography variant="h5" color="warning.main">
            Emergency Access
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography component={'span'} variant="body2">
            If you would like to request an exception, please create an account
            and send an email to{' '}
            <MuiLink href="mailto:contact@jomi.com" sx={{ color: 'info.main' }}>
              contact@jomi.com
            </MuiLink>{' '}
            stating 1) why you need urgent access and 2) why you are unable to
            purchase access at this time. Please State:
          </Typography>
          <List>
            <ListItem disablePadding>
              <Typography variant="body2">
                i) institutional affiliation,
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body2">
                ii) whom should we contact to negotiate an institutional
                subscription.
              </Typography>
            </ListItem>
          </List>
        </DialogContent>
      </Stack>
    </Paper>
  )
}
export default EmergencyAccessPaper
