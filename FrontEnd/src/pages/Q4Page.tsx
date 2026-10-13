import type { QuestionOption } from '../data/questions'
import type { Language } from '../i18n'
import QuestionPage from './QuestionPage'
import './Q4Page.css'

type Props = { language: Language; onAnswer: (id: QuestionOption['id'], emotion: QuestionOption['emotion']) => void }
export default function Q4Page(props: Props) { return <QuestionPage number={4} {...props} /> }
