import type { QuestionOption } from '../data/questions'
import type { Language } from '../i18n'
import QuestionPage from './QuestionPage'
import './Q6Page.css'

type Props = { language: Language; onLanguageChange: (language: Language) => void; onAnswer: (id: QuestionOption['id'], emotion: QuestionOption['emotion']) => void }
export default function Q6Page(props: Props) { return <QuestionPage number={6} {...props} /> }
