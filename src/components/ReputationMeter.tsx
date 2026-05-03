import { useI18n } from '../i18n/I18nContext'

interface ReputationMeterProps {
  score: number
  deltaPop?: number | null
}

export function ReputationMeter({ score, deltaPop }: ReputationMeterProps) {
  const { t } = useI18n()
  const clamped = Math.min(100, Math.max(0, score))

  return (
    <div
      className="reputation-meter"
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('meter.reputationAria')}
    >
      <div className="reputation-meter__header">
        <span className="reputation-meter__label">{t('meter.reputationLeft')}</span>
        <span className="reputation-meter__label">{t('meter.reputationRight')}</span>
      </div>
      <div className="reputation-meter__bar-wrap">
        <div
          className={`reputation-meter__bar reputation-meter__bar--score-${clamped <= 33 ? 'low' : clamped <= 66 ? 'mid' : 'high'}`}
        >
          <div
            className="reputation-meter__pointer"
            style={{ left: `${clamped}%` }}
          />
        </div>
        {deltaPop != null && deltaPop !== 0 && (
          <span
            className={`reputation-meter__delta reputation-meter__delta--${deltaPop > 0 ? 'plus' : 'minus'}`}
            aria-hidden="true"
          >
            {deltaPop > 0 ? '+10' : '−10'}
          </span>
        )}
      </div>
      <div className="reputation-meter__score">{t('meter.reputationScore', { score: String(clamped) })}</div>
    </div>
  )
}

