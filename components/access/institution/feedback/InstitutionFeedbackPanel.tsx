import { Card, Table, TableBody, TableContainer } from '@mui/material'
import { InstFeedbackListProvider } from './useInstitutionFeedbackList'
import FeedbackListTableHead from './FeedbackListTableHead'
import InstitutionFeedbackList from './InstitutionFeedbackList'
import { LocalizationProvider } from '@mui/lab'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
type Props = {
  institutionId: string
}
const InstitutionFeedbackPanel = (props: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InstFeedbackListProvider institution_id={props.institutionId}>
        <InstitutionFeedbackList />
      </InstFeedbackListProvider>
    </LocalizationProvider>
  )
}
export default InstitutionFeedbackPanel
