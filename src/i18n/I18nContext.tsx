import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppLocale, MessageParams } from './types'
import { LOCALE_STORAGE_KEY } from './types'
import { interpolate } from './interpolate'
import { messagesEn } from './messagesEn'
import { messagesFr } from './messagesFr'

const bundles: Record<AppLocale, Record<string, string>> = {
  en: messagesEn,
  fr: messagesFr,
}

function readStoredLocale(): AppLocale {
  if (typeof window === 'undefined') return 'en'
  try {
    const v = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (v === 'fr' || v === 'en') return v
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('fr')) {
    return 'fr'
  }
  return 'en'
}

interface I18nContextValue {
  locale: AppLocale
  setLocale: (next: AppLocale) => void
  t: (key: string, params?: MessageParams) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(() => readStoredLocale())

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'fr' ? 'fr' : 'en'
    }
  }, [])

  const t = useCallback(
    (key: string, params?: MessageParams) => {
      const table = bundles[locale] ?? bundles.en
      const fallback = bundles.en[key] ?? key
      const raw = table[key] ?? fallback
      return interpolate(raw, params)
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = locale === 'fr' ? 'fr' : 'en'
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
