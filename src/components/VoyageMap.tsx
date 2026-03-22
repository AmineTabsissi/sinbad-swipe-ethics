import './VoyageMap.css'

const MAP_IMAGE = '/sinbad-voyages-map.png'

interface VoyageMapProps {
  /** Current card index (0–8) to show voyage progress */
  currentCard?: number
  totalCards?: number
}

export function VoyageMap({ currentCard = 0, totalCards = 8 }: VoyageMapProps) {
  // Marker at first stop (Whale) when game starts (card 0); moves to next stop each card
  const pathProgress =
    totalCards > 0
      ? currentCard >= totalCards
        ? 100
        : ((currentCard + 1) / totalCards) * 100
      : 0
  const markerLeft = 5 + (pathProgress / 100) * 90

  return (
    <div className="voyage-map" aria-hidden="true">
      <div className="voyage-map__image-wrap">
        <img
          src={MAP_IMAGE}
          alt="The wondrous voyages of Sinbad the Sailor — from Basra to the unknown"
          className="voyage-map__image"
        />
        <div className="voyage-map__overlay" />
      </div>

      {/* Animated progress marker: at current stop (Whale when card 1, etc.) */}
      <div
        className="voyage-map__marker"
        style={{ left: `${markerLeft}%` }}
        title={`Voyage progress: ${Math.min(currentCard + 1, totalCards)} of ${totalCards}`}
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
        Card {Math.min(currentCard + 1, totalCards)} of {totalCards}
      </div>
    </div>
  )
}
