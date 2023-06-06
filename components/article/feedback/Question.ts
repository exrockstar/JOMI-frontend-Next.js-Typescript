type Choice = {
  value: number
  description: string
}

export type Question = {
  question: string
  legends: string[]
  id: string
  type: 'likert' | 'yes-no'
  choices?: Choice[]
}

type FeedbackComponentProps = {
  question: Question
  onAnswer(value: any, questionId: string)
}
export type FeedbackComponent = React.ComponentType<FeedbackComponentProps>
