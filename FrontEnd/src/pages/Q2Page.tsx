import type { QuestionOption } from '../data/questions'
import type { Language } from '../i18n'
import QuestionPage from './QuestionPage'
import './Q2Page.css'

type Props = { language: Language; onLanguageChange: (language: Language) => void; onAnswer: (id: QuestionOption['id'], emotion: QuestionOption['emotion']) => void }
export default function Q2Page(props: Props) { return <QuestionPage number={2} {...props} /> }
