import { Question } from './Question'

export const question1: Question = {
  question: 'How valuable do you find JOMI as a resource?',
  legends: ['0 - Not valuable', ' 10 - Very valuable'],
  id: '863gxgke3',
  type: 'likert',
  choices: new Array(11)
    .fill('-')
    .map((v, i) => ({ value: i, description: '' }))
}
