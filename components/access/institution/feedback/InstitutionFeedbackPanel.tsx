import { InstFeedbackListProvider } from './useInstitutionFeedbackList'
import InstitutionFeedbackList from './InstitutionFeedbackList'
type Props = {
  institutionId: string
}
const InstitutionFeedbackPanel = (props: Props) => {
  return (
    <InstFeedbackListProvider institution_id={props.institutionId}>
      <InstitutionFeedbackList />
    </InstFeedbackListProvider>
  )
}
export default InstitutionFeedbackPanel
