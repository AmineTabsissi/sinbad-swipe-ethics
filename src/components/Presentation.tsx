import { useCallback, useEffect, useState } from 'react'
import './Presentation.css'

const TOTAL_SLIDES = 14

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
    if (t.closest('.pres-deck-nav') || t.closest('button') || t.closest('a')) return
    const w = window.innerWidth
    if (e.clientX > w / 2) go(index + 1)
    else go(index - 1)
  }

  const progressPct = ((index + 1) / TOTAL_SLIDES) * 100

  return (
    <div className="pres-root" role="dialog" aria-modal="true" aria-label="Arabian Nights final presentation">
      <button type="button" className="pres-back" onClick={onClose}>
        ← Back to app
      </button>

      <div className="pres-deck" onClick={onDeckClick}>
        <div className="pres-deck__atmosphere" aria-hidden="true">
          <div className="pres-deck__orb pres-deck__orb--1" />
          <div className="pres-deck__orb pres-deck__orb--2" />
          <div className="pres-deck__orb pres-deck__orb--3" />
        </div>
        <div className="pres-deck__grain" aria-hidden="true" />
        <div className="pres-deck__frame" aria-hidden="true" />

        {/* 0 */}
        <section className={`pres-slide ${index === 0 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 0}>
          <div className="pres-slide-content">
            <h1 className="pres-title-glow">Arabian Nights</h1>
            <p className="pres-sub">Final presentation — anthology web app: three tales, eight choices each.</p>
            <p className="pres-meta-line">Sinbad · Aladdin · Ebony Horse · 1001 Nights · Final · Amine T.</p>
          </div>
        </section>

        {/* 1 */}
        <section className={`pres-slide ${index === 1 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 1}>
          <div className="pres-slide-content">
            <h2>What we shipped</h2>
            <p>
              A single-page <strong>React + TypeScript</strong> experience: hub, per-tale home, play loop, results,
              calibrated <strong>voyage maps</strong>, <strong>local persistence</strong> per story, and{' '}
              <strong>nine themed endings</strong> driven by three meters.
            </p>
            <p>
              No backend — everything runs in the browser with hash routes, optional ambient audio, and a built-in
              slide deck (this screen) at <code>#presentation</code>.
            </p>
          </div>
        </section>

        {/* 2 */}
        <section className={`pres-slide ${index === 2 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 2}>
          <div className="pres-slide-content">
            <h2>Three tales</h2>
            <div className="pres-three-col">
              <div>
                <h3>Sinbad</h3>
                <p>
                  <em>Swipe Ethics</em> — classic voyage order + Sultan frame. Choices:{' '}
                  <strong>Compassion</strong> vs <strong>Mercantile</strong>.
                </p>
                <p>
                  Deep link: <code>#sinbad</code>
                </p>
              </div>
              <div>
                <h3>Aladdin</h3>
                <p>
                  <em>The Lamp Ledger</em> — beats ordered to match the lamp map left → right. Choices:{' '}
                  <strong>Mercy · Restraint</strong> vs <strong>Aspiration · Bargain</strong>.
                </p>
                <p>
                  Deep link: <code>#aladdin</code>
                </p>
              </div>
              <div>
                <h3>Ebony Horse</h3>
                <p>
                  <em>Skybound Crown</em> — eight vignettes on the sky-route map. Choices:{' '}
                  <strong>Honor · Truth</strong> vs <strong>Audacity · Seizure</strong>.
                </p>
                <p>
                  Deep link: <code>#ebony-horse</code>
                </p>
              </div>
            </div>
            <p className="pres-sub">Each tale: eight scenario cards, two actions per card, same three global meters.</p>
          </div>
        </section>

        {/* 3 */}
        <section className={`pres-slide ${index === 3 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 3}>
          <div className="pres-slide-content">
            <h2>Core gameplay</h2>
            <ul>
              <li>
                <strong>Eight beats</strong> per run — one dilemma at a time; left/right apply scenario deltas to
                Ethics, Wealth, and Reputation (clamped 0–100).
              </li>
              <li>
                <strong>Hidden tallies</strong> — compassion vs mercantile counts still feed the model for endings
                and clipboard summaries.
              </li>
              <li>
                <strong>Toasts</strong> — short consequence lines after each tap; meters animate with delta pops.
              </li>
              <li>
                <strong>Keyboard</strong> — <kbd>←</kbd> <kbd>→</kbd> only on the <strong>play</strong> screen (so
                they never hijack scrolling on home/result). <kbd>R</kbd> clears the current tale slot and returns to
                tale home (any tale screen except hub).
              </li>
            </ul>
          </div>
        </section>

        {/* 4 */}
        <section className={`pres-slide ${index === 4 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 4}>
          <div className="pres-slide-content">
            <h2>Screens &amp; flow</h2>
            <ul>
              <li>
                <strong>Hub</strong> (<code>#hub</code>) — pick a tale; &quot;Progress saved&quot; when{' '}
                <code>localStorage</code> has data for that slot.
              </li>
              <li>
                <strong>Tale home</strong> — blurb, <strong>Start New Voyage</strong>, <strong>Resume</strong> when
                applicable, link to this deck.
              </li>
              <li>
                <strong>Play</strong> — voyage strip, card index, triple meters, scenario card, two choice buttons,
                ambient loop while playing.
              </li>
              <li>
                <strong>Result</strong> — one of nine endings, epilogue, scores, counts, <strong>Copy Result</strong>,
                restart or return to hub.
              </li>
            </ul>
          </div>
        </section>

        {/* 5 */}
        <section className={`pres-slide ${index === 5 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 5}>
          <div className="pres-slide-content">
            <h2>Voyage maps</h2>
            <ul>
              <li>
                <strong>Per-tale art</strong> in <code>public/</code> — banner uses <code>object-fit: cover</code> and
                per-adventure <code>object-position</code> (e.g. Aladdin <code>center 50%</code>, Ebony Horse{' '}
                <code>center 28%</code>).
              </li>
              <li>
                <strong>Eight anchors</strong> — <code>mapMarkerLeftPercents</code> + optional{' '}
                <code>mapMarkerTopPercents</code> in <code>adventureConfig.ts</code>; Sinbad uses the default even grid;
                Aladdin and Ebony Horse use hand-tuned stops so beat 1 sits on the first vignette and later beats track
                the painted path.
              </li>
              <li>
                <strong>Progress</strong> — marker index follows <code>currentCardIndex</code> in play and the last
                stop on the result screen.
              </li>
            </ul>
          </div>
        </section>

        {/* 6 */}
        <section className={`pres-slide ${index === 6 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 6}>
          <div className="pres-slide-content">
            <h2>Nine outcomes</h2>
            <div className="pres-endings-list">
              <div className="pres-ending-card pres-shrewd">
                <h3>Legacy tier</h3>
                <p>
                  From <strong>Ethics + Reputation</strong> — compassionate vs mercantile leaning of that sum.
                </p>
              </div>
              <div className="pres-ending-card pres-balanced">
                <h3>Wealth tier</h3>
                <p>
                  From the <strong>Wealth</strong> score — poor / balanced / treasure bands.
                </p>
              </div>
              <div className="pres-ending-card pres-moral">
                <h3>Intersection</h3>
                <p>
                  <strong>3 × 3</strong> meter cells per tale, <strong>27 bespoke epilogues</strong> across the
                  anthology (one coherent paragraph per cell). Result art still keys off legacy band; each cell has a
                  stable id like <code>aladdin-humble-moral</code>.
                </p>
              </div>
            </div>
            <p className="pres-sub" style={{ marginTop: 20 }}>
              <strong>Copy Result</strong> includes that id plus scores and tallies; the screen adds a{' '}
              <strong>playstyle coda</strong> from ← vs → counts so twin scores can still read differently.
            </p>
          </div>
        </section>

        {/* 7 */}
        <section className={`pres-slide ${index === 7 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 7}>
          <div className="pres-slide-content">
            <h2>Tech stack</h2>
            <div className="pres-two-col">
              <div>
                <h3>Build</h3>
                <p>Vite 5 · React 18 · TypeScript (project references)</p>
                <p>Plain CSS modules per component — no Tailwind, no Framer Motion.</p>
              </div>
              <div>
                <h3>Run</h3>
                <p>
                  <code>npm install</code>
                  <br />
                  <code>npm run dev</code> · <code>npm run build</code>
                </p>
                <p>Optional: <code>public/sounds/ambient.mp3</code> for looped bed during play.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8 */}
        <section className={`pres-slide ${index === 8 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 8}>
          <div className="pres-slide-content">
            <h2>Project layout</h2>
            <ul>
              <li>
                <code>src/App.tsx</code> — hash routing, game shell, persistence side effects, presentation toggle.
              </li>
              <li>
                <code>src/data/adventureConfig.ts</code> — tale metadata, map tuning, scenario array wiring.
              </li>
              <li>
                <code>src/data/scenariosSinbad.ts</code> (and <code>Aladdin</code>, <code>EbonyHorse</code>) — copy &
                deltas per beat.
              </li>
              <li>
                <code>src/store/gameState.ts</code> — save/load, legacy Sinbad migration, hint flag.
              </li>
              <li>
                <code>src/utils/endings.ts</code>, <code>mapMarkers.ts</code>, <code>sound.ts</code> — outcomes math,
                marker helpers, Web Audio SFX.
              </li>
              <li>
                <code>src/components/</code> — <code>VoyageMap</code>, <code>ScenarioCard</code>, meters, toast,
                <code>Presentation</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* 9 */}
        <section className={`pres-slide ${index === 9 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 9}>
          <div className="pres-slide-content">
            <h2>Routing &amp; persistence</h2>
            <ul>
              <li>
                <strong>Hash only</strong> — no React Router dependency; <code>hashchange</code> rehydrates hub vs tale
                vs saved screen.
              </li>
              <li>
                <strong>Keys</strong> — <code>arabian-night-v1-{'{adventureId}'}</code> per tale; one-time migration
                from the legacy single-key Sinbad store.
              </li>
              <li>
                <strong>Resume rules</strong> — play/result/mid-run index or any non-default scores surface &quot;Resume
                Last Voyage&quot; on tale home.
              </li>
            </ul>
          </div>
        </section>

        {/* 10 */}
        <section className={`pres-slide ${index === 10 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 10}>
          <div className="pres-slide-content">
            <h2>Polish &amp; a11y</h2>
            <ul>
              <li>
                <strong>Sound</strong> — synthesized click, whoosh between cards, completion sting; ambient MP3 optional.
              </li>
              <li>
                <strong>Motion</strong> — card exit direction, map marker easing; <code>prefers-reduced-motion</code>{' '}
                trims deck orbs and slide reveals in this presentation.
              </li>
              <li>
                <strong>Escape</strong> exits this deck; focusable back button; ARIA on the dialog and slide nav.
              </li>
            </ul>
          </div>
        </section>

        {/* 11 */}
        <section className={`pres-slide ${index === 11 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 11}>
          <div className="pres-slide-content">
            <h2>Content &amp; narrative</h2>
            <p>
              Each tale is eight authored scenarios (title, summary, dilemma, two choice lines, consequences, meter
              deltas). Aladdin and Ebony Horse beats are <strong>ordered to match their panoramic map art</strong> so
              the voyage strip reads as a true left-to-right journey; Sinbad keeps a traditional voyage sequence.
            </p>
            <p className="pres-sub">
              Same mechanical spine everywhere — only labels, art, map anchors, and ending prose change per adventure.
            </p>
          </div>
        </section>

        {/* 12 */}
        <section className={`pres-slide ${index === 12 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 12}>
          <div className="pres-slide-content">
            <h2>Demo checklist</h2>
            <ol className="pres-ordered-list">
              <li>
                <code>npm install && npm run dev</code> — open the local URL; confirm <strong>hub</strong> shows three
                tales.
              </li>
              <li>
                Walk one tale start-to-finish — watch map marker advance, meters move, result + clipboard summary.
              </li>
              <li>
                Exercise deep links: <code>#hub</code>, <code>#sinbad</code>, <code>#aladdin</code>,{' '}
                <code>#ebony-horse</code>, <code>#presentation</code>.
              </li>
              <li>
                Inspect <code>localStorage</code> keys prefixed <code>arabian-night-v1-</code>; use <kbd>R</kbd> restart
                and Resume from tale home.
              </li>
            </ol>
          </div>
        </section>

        {/* 13 */}
        <section className={`pres-slide ${index === 13 ? 'pres-slide--active' : ''}`} aria-hidden={index !== 13}>
          <div className="pres-slide-content">
            <h1 className="pres-title-glow">Thank you</h1>
            <p className="pres-sub" style={{ fontSize: '1.1rem' }}>
              Arabian Nights anthology — hub, three complete tales, maps, persistence, nine endings, and this final
              walkthrough.
            </p>
            <p className="pres-sub">Questions?</p>
          </div>
        </section>
      </div>

      <nav className="pres-deck-nav" aria-label="Slide navigation" onClick={(e) => e.stopPropagation()}>
        <div className="pres-progress-track" aria-hidden="true">
          <div className="pres-progress-fill" style={{ width: `${progressPct}%` }} />
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
