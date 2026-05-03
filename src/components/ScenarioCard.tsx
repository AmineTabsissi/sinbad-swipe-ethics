import type { Scenario } from '../types'
import { useI18n } from '../i18n/I18nContext'

interface ScenarioCardProps {
  scenario: Scenario
  cardIndex: number
  totalCards: number
  /** When set, card plays exit animation in this direction before unmount */
  exitDirection?: 'left' | 'right' | null
}

export function ScenarioCard({
  scenario,
  cardIndex,
  totalCards,
  exitDirection,
}: ScenarioCardProps) {
  const { t } = useI18n()
  const cur = String(cardIndex + 1)
  const tot = String(totalCards)
  return (
    <article
      className={`scenario-card ${exitDirection ? `scenario-card--exit-${exitDirection}` : ''}`}
      aria-label={t('scenario.cardAria', { current: cur, total: tot, title: scenario.voyageTitle })}
    >
      <header className="scenario-card__header">
        <div className="scenario-card__counter">{t('map.cardLabel', { current: cur, total: tot })}</div>
        <h2 className="scenario-card__title">{scenario.voyageTitle}</h2>
      </header>
      <section className="scenario-card__body">
        <p className="scenario-card__summary">{scenario.summary}</p>
        <p className="scenario-card__dilemma">{scenario.dilemma}</p>
      </section>
    </article>
  )
}
