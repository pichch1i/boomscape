import type { QuestionOption } from '../data/questions'
import type { Language } from '../i18n'
import QuestionPage from './QuestionPage'
import './Q7Page.css'

type Props = { language: Language; onAnswer: (id: QuestionOption['id'], emotion: QuestionOption['emotion']) => void }
export default function Q7Page(props: Props) { return <QuestionPage number={7} {...props} /> }
