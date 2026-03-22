import { useCallback, useEffect, useState } from 'react'
import './Presentation.css'

const TOTAL_SLIDES = 9

interface PresentationProps {
  onClose: () => void
}

export function Presentation({ onClose }: PresentationProps) {
  const [index, setIndex] = useState(0)

  const go = useCallback((n: number) => {
    setIndex(Math.max(0, Math.min(n, TOTAL_SLIDES - 1)))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setIndex((i) => Math.min(i + 1, TOTAL_SLIDES - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const onDeckClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t.closest('.pres-deck-nav') || t.closest('button') || t.closest('a'))
      return
    const w = window.innerWidth
    if (e.clientX > w / 2) go(index + 1)
    else go(index - 1)
  }

  const progressPct = ((index + 1) / TOTAL_SLIDES) * 100

  return (
    <div className="pres-root" role="dialog" aria-modal="true" aria-label="Midterm presentation">
      <button type="button" className="pres-back" onClick={onClose}>
        ← Back to game
      </button>

      <div className="pres-deck" onClick={onDeckClick}>
        <div className="pres-deck__atmosphere" aria-hidden="true">
          <div className="pres-deck__orb pres-deck__orb--1" />
          <div className="pres-deck__orb pres-deck__orb--2" />
          <div className="pres-deck__orb pres-deck__orb--3" />
        </div>
        <div className="pres-deck__grain" aria-hidden="true" />
        <div className="pres-deck__frame" aria-hidden="true" />

        <section
          className={`pres-slide ${index === 0 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 0}
        >
          <div className="pres-slide-content">
            <h1 className="pres-title-glow">Sinbad: Swipe Ethics</h1>
            <p className="pres-sub">
              A laptop-first, eight-card voyage through moral trade-offs
            </p>
            <p className="pres-meta-line">1001 Nights · Midterm Project · Amine T.</p>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 1 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 1}
        >
          <div className="pres-slide-content">
            <h2>Concept</h2>
            <p>
              A narrative choice game inspired by <em>One Thousand and One Nights</em>. The player
              guides Sinbad (and the Sultan of Samarkand) through <strong>8 fixed scenarios</strong>,
              choosing between <strong>Compassionate</strong> (←) and <strong>Mercantile</strong> (→)
              actions.
            </p>
            <p>
              Each choice moves an <strong>Ethics Meter</strong> (0–100). The final score determines
              one of three endings.
            </p>
            <p className="pres-sub">
              Desktop/laptop only · No backend · Progress saved in the browser
            </p>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 2 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 2}
        >
          <div className="pres-slide-content">
            <h2>Features</h2>
            <ul>
              <li>
                <strong>8 scenarios</strong> in fixed order (Whale Island → Valley of Diamonds →
                Cyclops → Tomb → Old Man of the Sea → River of Gems → Elephant Graveyard → Sultan of
                Samarkand)
              </li>
              <li>
                <strong>Ethics Meter</strong> (0–100, start 50): Left +10, Right −10
              </li>
              <li>
                <strong>Three endings</strong>: Shrewd Merchant (0–33), Balanced Voyager (34–66),
                Moral Wanderer (67–100)
              </li>
              <li>
                <strong>Animated voyage map</strong> with progress marker and optional AI-generated
                art
              </li>
              <li>
                <strong>Sound</strong>: Web Audio click/whoosh/chime; optional ambient loop
              </li>
              <li>
                <strong>Accessibility</strong>: keyboard (← → R), focus states, reduced motion
              </li>
            </ul>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 3 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 3}
        >
          <div className="pres-slide-content">
            <h2>Tech Stack</h2>
            <div className="pres-two-col">
              <div>
                <h3>Core</h3>
                <p>Vite · React · TypeScript</p>
                <p>Plain CSS (no Tailwind). CSS-only animations (no Framer Motion).</p>
              </div>
              <div>
                <h3>Run</h3>
                <p>
                  <code>npm install</code>
                  <br />
                  <code>npm run dev</code>
                </p>
                <p>
                  No backend, database, or auth. <code>localStorage</code> for progress.
                </p>
              </div>
            </div>
            <p className="pres-sub" style={{ marginTop: 24 }}>
              Single-page app: Home → Play → Result
            </p>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 4 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 4}
        >
          <div className="pres-slide-content">
            <h2>Game Flow</h2>
            <ul>
              <li>
                <strong>Home</strong>: Title, description, Start / Resume. First-time hint. Keyboard
                legend.
              </li>
              <li>
                <strong>Play</strong>: Voyage map at top, “Card X of 8”, Ethics Meter, scenario card,
                two choice buttons. After each choice: card exit animation, toast with consequence,
                meter pop (+10 / −10), then next card.
              </li>
              <li>
                <strong>Result</strong>: Ending title, epilogue, compassion/mercantile counts, stats,
                Restart, Copy Result. Ending-specific background image and tint.
              </li>
            </ul>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 5 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 5}
        >
          <div className="pres-slide-content">
            <h2>Three Endings</h2>
            <div className="pres-endings-list">
              <div className="pres-ending-card pres-shrewd">
                <h3>Shrewd Merchant</h3>
                <p>Score 0–33. Pragmatic, rewarded, haunted by the cost.</p>
              </div>
              <div className="pres-ending-card pres-balanced">
                <h3>Balanced Voyager</h3>
                <p>Score 34–66. Mix of profit and mercy, scars and stories.</p>
              </div>
              <div className="pres-ending-card pres-moral">
                <h3>Moral Wanderer</h3>
                <p>Score 67–100. Principled, compassionate, different legacy.</p>
              </div>
            </div>
            <p className="pres-sub" style={{ marginTop: 20 }}>
              Each ending has a unique epilogue and optional background image.
            </p>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 6 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 6}
        >
          <div className="pres-slide-content">
            <h2>Technical Highlights</h2>
            <ul>
              <li>
                <strong>State</strong>: React state + <code>localStorage</code> (load/save/clear) with
                a simple screen machine (home / play / result).
              </li>
              <li>
                <strong>Map</strong>: Progress marker snaps to “current stop”; optional AI-generated
                voyage map image.
              </li>
              <li>
                <strong>Polish</strong>: Card exit animation, ethics meter delta pop, toast with
                left/right icon, first-time hint, keyboard hints, focus-visible,
                prefers-reduced-motion.
              </li>
              <li>
                <strong>Assets</strong>: Optional background images per ending + voyage background;
                optional <code>public/sounds/ambient.mp3</code> for play screen.
              </li>
            </ul>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 7 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 7}
        >
          <div className="pres-slide-content">
            <h2>Demo</h2>
            <p>Run the game:</p>
            <p>
              <span className="pres-code-block">npm install && npm run dev</span>
            </p>
            <p className="pres-sub">Then open the local URL (e.g. http://localhost:5173) in a browser.</p>
            <p style={{ marginTop: 28 }}>
              Controls: <strong>←</strong> Compassionate · <strong>→</strong> Mercantile ·{' '}
              <strong>R</strong> Restart
            </p>
          </div>
        </section>

        <section
          className={`pres-slide ${index === 8 ? 'pres-slide--active' : ''}`}
          aria-hidden={index !== 8}
        >
          <div className="pres-slide-content">
            <h1 className="pres-title-glow">Thank you</h1>
            <p className="pres-sub" style={{ fontSize: '1.15rem' }}>
              Questions?
            </p>
          </div>
        </section>
      </div>

      <nav className="pres-deck-nav" aria-label="Slide navigation" onClick={(e) => e.stopPropagation()}>
        <div className="pres-progress-track" aria-hidden="true">
          <div
            className="pres-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="pres-dots" role="tablist">
          {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={`pres-dot ${i === index ? 'pres-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="pres-nav-row">
          <button
            type="button"
            className="pres-nav-btn"
            aria-label="Previous slide"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="pres-nav-hint">
            <kbd>←</kbd> <kbd>→</kbd> or <kbd>Space</kbd> · <kbd>Esc</kbd> exit · Click dots
          </span>
          <button
            type="button"
            className="pres-nav-btn"
            aria-label="Next slide"
            disabled={index === TOTAL_SLIDES - 1}
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  )
}
