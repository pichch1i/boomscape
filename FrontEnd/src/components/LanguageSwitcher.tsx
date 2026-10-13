import type { Language } from '../i18n'
import './LanguageSwitcher.css'

type LanguageSwitcherProps = {
  language: Language
  onChange: (language: Language) => void
}

function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={language === 'th' ? 'เลือกภาษา' : 'Choose language'}
    >
      <button
        type="button"
        className={language === 'th' ? 'is-active' : ''}
        aria-pressed={language === 'th'}
        onClick={() => onChange('th')}
      >
        TH
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher

