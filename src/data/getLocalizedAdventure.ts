import type { AdventureDefinition } from './adventureConfig'
import { adventures } from './adventureConfig'
import type { AdventureId } from '../types'
import type { AppLocale } from '../i18n/types'
import { adventureUiFr } from '../locale/fr/adventureUiFr'
import { scenariosForLocale } from './scenariosI18n'

export function getLocalizedAdventure(adventureId: AdventureId, locale: AppLocale): AdventureDefinition {
  const base = adventures[adventureId]
  const scenarios = scenariosForLocale(adventureId, locale)
  if (locale === 'en') {
    return { ...base, scenarios }
  }
  const overlay = adventureUiFr[adventureId]
  return {
    ...base,
    ...overlay,
    scenarios,
  }
}
