import { GetFeedbackQuestionsQuery } from 'graphql/mutations/collect-feedback.generated'

type Question = GetFeedbackQuestionsQuery['question']

type FeedbackComponentProps = {
  question: Question
}
export type FeedbackComponent = React.ComponentType<FeedbackComponentProps>
