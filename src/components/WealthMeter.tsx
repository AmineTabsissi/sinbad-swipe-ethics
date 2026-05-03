import { useI18n } from '../i18n/I18nContext'

interface WealthMeterProps {
  score: number
  deltaPop?: number | null
}

export function WealthMeter({ score, deltaPop }: WealthMeterProps) {
  const { t } = useI18n()
  const clamped = Math.min(100, Math.max(0, score))

  return (
    <div
      className="wealth-meter"
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('meter.wealthAria')}
    >
      <div className="wealth-meter__header">
        <span className="wealth-meter__label">{t('meter.wealthLeft')}</span>
        <span className="wealth-meter__label">{t('meter.wealthRight')}</span>
      </div>
      <div className="wealth-meter__bar-wrap">
        <div
          className={`wealth-meter__bar wealth-meter__bar--score-${clamped <= 33 ? 'low' : clamped <= 66 ? 'mid' : 'high'}`}
        >
          <div className="wealth-meter__pointer" style={{ left: `${clamped}%` }} />
        </div>
        {deltaPop != null && deltaPop !== 0 && (
          <span
            className={`wealth-meter__delta wealth-meter__delta--${deltaPop > 0 ? 'plus' : 'minus'}`}
            aria-hidden="true"
          >
            {deltaPop > 0 ? '+10' : '−10'}
          </span>
        )}
      </div>
      <div className="wealth-meter__score">{t('meter.wealthScore', { score: String(clamped) })}</div>
    </div>
  )
}

