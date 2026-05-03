import { useI18n } from '../i18n/I18nContext'

interface EthicsMeterProps {
  score: number
  /** Show a small +10 or -10 pop next to the bar (fades out) */
  deltaPop?: number | null
}

export function EthicsMeter({ score, deltaPop }: EthicsMeterProps) {
  const { t } = useI18n()
  const clamped = Math.min(100, Math.max(0, score))

  return (
    <div
      className="ethics-meter"
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('meter.ethicsAria')}
    >
      <div className="ethics-meter__header">
        <span className="ethics-meter__label">{t('meter.ethicsLeft')}</span>
        <span className="ethics-meter__label">{t('meter.ethicsRight')}</span>
      </div>
      <div className="ethics-meter__bar-wrap">
        <div
          className={`ethics-meter__bar ethics-meter__bar--score-${clamped <= 33 ? 'low' : clamped <= 66 ? 'mid' : 'high'}`}
        >
          <div
            className="ethics-meter__pointer"
            style={{ left: `${clamped}%` }}
          />
        </div>
        {deltaPop != null && deltaPop !== 0 && (
          <span
            className={`ethics-meter__delta ethics-meter__delta--${deltaPop > 0 ? 'plus' : 'minus'}`}
            aria-hidden="true"
          >
            {deltaPop > 0 ? '+10' : '−10'}
          </span>
        )}
      </div>
      <div className="ethics-meter__score">{t('meter.ethicsScore', { score: String(clamped) })}</div>
    </div>
  )
}
