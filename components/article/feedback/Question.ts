import { GetFeedbackQuestionsQuery } from 'graphql/mutations/collect-feedback.generated'

type Question = GetFeedbackQuestionsQuery['question']

type FeedbackComponentProps = {
  question: Question
  onAnswer(value: any, questionId: string, comment?: string)
}
export type FeedbackComponent = React.ComponentType<FeedbackComponentProps>
