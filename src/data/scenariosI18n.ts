import type { AdventureId } from '../types'
import type { Scenario } from '../types'
import type { AppLocale } from '../i18n/types'
import { scenariosSinbad } from './scenariosSinbad'
import { scenariosAladdin } from './scenariosAladdin'
import { scenariosEbonyHorse } from './scenariosEbonyHorse'
import { scenariosSinbadFr } from '../locale/fr/scenariosSinbad.fr'
import { scenariosAladdinFr } from '../locale/fr/scenariosAladdin.fr'
import { scenariosEbonyHorseFr } from '../locale/fr/scenariosEbonyHorse.fr'

export function scenariosForLocale(adventureId: AdventureId, locale: AppLocale): Scenario[] {
  if (locale === 'fr') {
    if (adventureId === 'sinbad') return scenariosSinbadFr
    if (adventureId === 'aladdin') return scenariosAladdinFr
    return scenariosEbonyHorseFr
  }
  if (adventureId === 'sinbad') return scenariosSinbad
  if (adventureId === 'aladdin') return scenariosAladdin
  return scenariosEbonyHorse
}
