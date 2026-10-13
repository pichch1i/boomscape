import type { QuestionOption } from '../data/questions'
import type { Language } from '../i18n'
import QuestionPage from './QuestionPage'
import './Q1Page.css'

type Props = { language: Language; onLanguageChange: (language: Language) => void; onAnswer: (id: QuestionOption['id'], emotion: QuestionOption['emotion']) => void }
export default function Q1Page(props: Props) { return <QuestionPage number={1} {...props} /> }
