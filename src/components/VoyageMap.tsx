import './VoyageMap.css'
import { useI18n } from '../i18n/I18nContext'
import { markerLeftPercentForCard, markerTopPercentForCard } from '../utils/mapMarkers'

interface VoyageMapProps {
  /** Current card index while playing (0-based); may be `totalCards` on result screen. */
  currentCard?: number
  totalCards?: number
  /** Full URL built from `public/` (e.g. `publicUrl(config.mapImage)`). */
  mapSrc: string
  /** Describes the map motif for accessibility (banner is decorative + aria-hidden elsewhere). */
  mapAlt?: string
  /** One horizontal stop per card; omit for default even spacing (Sinbad-style). */
  mapMarkerLeftPercents?: number[]
  mapImageObjectPosition?: string
  /** Single CSS `top` % when `mapMarkerTopPercents` is omitted. */
  mapMarkerTopPercent?: number
  /** Per-card CSS `top` % (length === totalCards) for wave layouts on calibrated art. */
  mapMarkerTopPercents?: number[]
}

export function VoyageMap({
  currentCard = 0,
  totalCards = 8,
  mapSrc,
  mapAlt = 'Story progress map',
  mapMarkerLeftPercents,
  mapImageObjectPosition,
  mapMarkerTopPercent,
  mapMarkerTopPercents,
}: VoyageMapProps) {
  const { t } = useI18n()
  const markerLeft = markerLeftPercentForCard(mapMarkerLeftPercents, currentCard, totalCards)
  const markerTop = markerTopPercentForCard(
    mapMarkerTopPercents,
    mapMarkerTopPercent,
    currentCard,
    totalCards,
  )

  return (
    <div className="voyage-map" aria-hidden="true">
      <div className="voyage-map__image-wrap">
        <img
          src={mapSrc}
          alt=""
          role="presentation"
          className="voyage-map__image"
          style={mapImageObjectPosition ? { objectPosition: mapImageObjectPosition } : undefined}
          title={mapAlt}
          key={mapSrc}
        />
        <div className="voyage-map__overlay" />
      </div>

      <div
        className="voyage-map__marker"
        style={{ left: `${markerLeft}%`, top: `${markerTop}%` }}
        title={t('map.progressTitle', {
          current: String(Math.min(currentCard + 1, totalCards)),
          total: String(totalCards),
        })}
      >
        <span className="voyage-map__marker-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="rgba(15,23,42,0.94)" stroke="rgba(251,191,36,0.9)" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="16" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1" />
            <path d="M24 12 L27 20 L24 18 L21 20 Z" fill="rgba(251,191,36,0.95)" stroke="rgba(248,250,252,0.5)" strokeWidth="0.8" strokeLinejoin="round" />
            <path d="M19 20 L29 20 L29 25 L19 25 Z" fill="rgba(51,65,85,0.98)" stroke="rgba(251,191,36,0.45)" strokeWidth="0.8" />
            <path d="M24 25 L24 34 M20 28 L28 28" stroke="rgba(251,191,36,0.65)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div className="voyage-map__label">
        {t('map.cardLabel', {
          current: String(Math.min(currentCard + 1, totalCards)),
          total: String(totalCards),
        })}
      </div>
    </div>
  )
}
