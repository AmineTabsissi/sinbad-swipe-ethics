import type { Scenario } from '../types'

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
  return (
    <article
      className={`scenario-card ${exitDirection ? `scenario-card--exit-${exitDirection}` : ''}`}
      aria-label={`Card ${cardIndex + 1} of ${totalCards}: ${scenario.voyageTitle}`}
    >
      <header className="scenario-card__header">
        <div className="scenario-card__counter">
          Card {cardIndex + 1} of {totalCards}
        </div>
        <h2 className="scenario-card__title">{scenario.voyageTitle}</h2>
      </header>
      <section className="scenario-card__body">
        <p className="scenario-card__summary">{scenario.summary}</p>
        <p className="scenario-card__dilemma">{scenario.dilemma}</p>
      </section>
    </article>
  )
}
