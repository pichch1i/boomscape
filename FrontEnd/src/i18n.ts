export type Language = 'th' | 'en'

export const DEFAULT_LANGUAGE: Language = 'th'
export const LANGUAGE_STORAGE_KEY = 'flower-journey-language'

export function isLanguage(value: string | null): value is Language {
  return value === 'th' || value === 'en'
}

