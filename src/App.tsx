import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { scenarios } from './data/scenarios'
import { EthicsMeter } from './components/EthicsMeter'
import { ScenarioCard } from './components/ScenarioCard'
import { ToastMessage } from './components/ToastMessage'
import { VoyageMap } from './components/VoyageMap'
import type { GameState, Screen } from './types'
import {
  clearGameState,
  initialGameState,
  isHintDismissed,
  loadGameState,
  saveGameState,
  setHintDismissed,
} from './store/gameState'
import { playClick, playComplete, playAmbient, stopAmbient, playWhoosh } from './utils/sound'
import { Presentation } from './components/Presentation'

const TOTAL_CARDS = scenarios.length

type EndingId = 'shrewd-merchant' | 'balanced-voyager' | 'moral-wanderer'

interface EndingInfo {
  id: EndingId
  title: string
  epilogue: string
}

function getEndingInfo(score: number): EndingInfo {
  if (score <= 33) {
    return {
      id: 'shrewd-merchant',
      title: 'Shrewd Merchant',
      epilogue:
        'You return from your voyages with ledgers thick as sea-logs and holds heavy with treasure. Yet in the quiet hours between deals and toasts, the memories of those you bartered away crowd your thoughts like ghosts in the harbor.',
    }
  }

  if (score <= 66) {
    return {
      id: 'balanced-voyager',
      title: 'Balanced Voyager',
      epilogue:
        'You sail between ports as both trader and storyteller, carrying scars and silver in equal measure. Sometimes you chose profit, sometimes mercy, and in the end you survive with enough wealth—and enough hard-won wisdom—to fill many long evenings in Baghdad.',
    }
  }

  return {
    id: 'moral-wanderer',
    title: 'Moral Wanderer',
    epilogue:
      'Your coffers are lighter than they might have been, but your wake is lined with lives spared and oaths kept. You walk the docks as a sailor of stubborn conscience, remembered less for your fortune than for the strange, luminous kindness that followed in your steps.',
  }
}

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, value))
}

function App() {
  const [state, setState] = useState<GameState>(initialGameState)
  const [hasSavedGame, setHasSavedGame] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastChoiceType, setToastChoiceType] = useState<'left' | 'right'>('left')
  const [choiceLocked, setChoiceLocked] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const [meterDeltaPop, setMeterDeltaPop] = useState<number | null>(null)
  const [cardExiting, setCardExiting] = useState<'left' | 'right' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showPresentation, setShowPresentation] = useState(
    () =>
      typeof window !== 'undefined' && window.location.hash === '#presentation',
  )

  useEffect(() => {
    const onHash = () => {
      setShowPresentation(window.location.hash === '#presentation')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openPresentation = useCallback(() => {
    setShowPresentation(true)
    window.location.hash = '#presentation'
  }, [])

  const closePresentation = useCallback(() => {
    setShowPresentation(false)
    if (window.location.hash === '#presentation') {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`,
      )
    }
  }, [])

  useEffect(() => {
    const loaded = loadGameState()
    if (loaded) {
      setState({
        ...loaded,
        screen: 'home',
      })
      setHasSavedGame(true)
    }
    if (!loaded && !isHintDismissed()) setShowHint(true)
  }, [])

  useEffect(() => {
    if (showPresentation) {
      stopAmbient()
      return
    }
    if (state.screen === 'play') playAmbient()
    else stopAmbient()
    return () => stopAmbient()
  }, [state.screen, showPresentation])

  useEffect(() => {
    if (state.screen === 'result') playComplete()
  }, [state.screen])

  const startNewGame = useCallback(() => {
    const next: GameState = {
      ...initialGameState,
      screen: 'play',
    }
    setState(next)
    saveGameState(next)
    setHasSavedGame(true)
    setToastVisible(false)
    setCopyStatus('idle')
    setCardExiting(null)
    setMeterDeltaPop(null)
  }, [])

  const resumeGame = useCallback(() => {
    const loaded = loadGameState()
    if (!loaded) return

    let screen: Screen
    if (loaded.currentCardIndex >= TOTAL_CARDS) {
      screen = 'result'
    } else {
      screen = 'play'
    }

    const next: GameState = {
      ...loaded,
      screen,
    }

    setState(next)
    saveGameState(next)
    setToastVisible(false)
    setChoiceLocked(false)
    setCopyStatus('idle')
    setHasSavedGame(true)
    setCardExiting(null)
  }, [])

  const handleRestart = useCallback(() => {
    clearGameState()
    setState(initialGameState)
    setHasSavedGame(false)
    setToastVisible(false)
    setChoiceLocked(false)
    setCopyStatus('idle')
    setCardExiting(null)
  }, [])

  const handleChoice = useCallback(
    (direction: 'left' | 'right') => {
      if (choiceLocked) return
      if (state.screen !== 'play') return
      if (state.currentCardIndex >= TOTAL_CARDS) return

      const scenario = scenarios[state.currentCardIndex]
      const isLeft = direction === 'left'
      const delta = isLeft ? 10 : -10

      playClick()
      setHintDismissed()
      setShowHint(false)

      setCardExiting(direction)
      setMeterDeltaPop(delta)
      setChoiceLocked(true)
      setToastChoiceType(direction)
      setToastMessage(
        isLeft ? scenario.leftConsequence : scenario.rightConsequence
      )
      setToastVisible(true)

      const intermediate: GameState = {
        ...state,
        ethicsScore: clampScore(state.ethicsScore + delta),
        mercantileCount: state.mercantileCount + (isLeft ? 0 : 1),
        compassionCount: state.compassionCount + (isLeft ? 1 : 0),
      }

      setState(intermediate)

      const nextIndex = state.currentCardIndex + 1
      const willBeResult = nextIndex >= TOTAL_CARDS

      window.setTimeout(() => {
        playWhoosh()
        setCardExiting(null)
        setState((prev) => {
          const advancedIndex =
            prev.currentCardIndex < TOTAL_CARDS
              ? prev.currentCardIndex + 1
              : prev.currentCardIndex

          const next: GameState = {
            ...prev,
            currentCardIndex: advancedIndex,
            screen: willBeResult ? 'result' : 'play',
          }

          saveGameState(next)
          return next
        })

        setToastVisible(false)
        setChoiceLocked(false)
        window.setTimeout(() => setMeterDeltaPop(null), 800)
      }, 380)
    },
    [choiceLocked, state],
  )

  const handleCopyResult = useCallback(() => {
    const ending = getEndingInfo(state.ethicsScore)
    const summary = `Sinbad: Swipe Ethics — ${ending.title} (Score: ${state.ethicsScore}, Mercantile choices: ${state.mercantileCount}, Compassionate choices: ${state.compassionCount}).`

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyStatus('error')
      return
    }

    navigator.clipboard
      .writeText(summary)
      .then(() => setCopyStatus('copied'))
      .catch(() => setCopyStatus('error'))
  }, [state])

  const dismissHint = useCallback(() => {
    setHintDismissed()
    setShowHint(false)
  }, [])

  useEffect(() => {
    if (showPresentation) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handleChoice('left')
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleChoice('right')
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault()
        handleRestart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showPresentation, handleChoice, handleRestart])

  const currentScenario =
    state.currentCardIndex < TOTAL_CARDS
      ? scenarios[state.currentCardIndex]
      : null

  const endingInfo = getEndingInfo(state.ethicsScore)

  const mapProgress =
    state.screen === 'play'
      ? state.currentCardIndex
      : state.screen === 'result'
        ? TOTAL_CARDS
        : 0

  if (showPresentation) {
    return <Presentation onClose={closePresentation} />
  }

  return (
    <div className="app-shell">
      <div className="app-shell__voyage-bg" aria-hidden="true" />
      <div className="app-shell__grain" aria-hidden="true" />
      <VoyageMap currentCard={mapProgress} totalCards={TOTAL_CARDS} />
      <header className="app-header">
        <h1 className="app-title">Sinbad: Swipe Ethics</h1>
        <p className="app-subtitle">
          A laptop-first, eight-card voyage through moral trade-offs and
          mercantile temptation.
        </p>
      </header>

      <main className="app-main">
        {state.screen === 'home' && (
          <section className="home-screen">
            {showHint && (
              <div className="first-time-hint" role="region" aria-label="How to play">
                <p className="first-time-hint__text">
                  Choose with <kbd>←</kbd> or <kbd>→</kbd> (or the buttons below). Your ethics meter decides your ending.
                </p>
                <button
                  type="button"
                  className="first-time-hint__dismiss"
                  onClick={dismissHint}
                  aria-label="Dismiss hint"
                >
                  Got it
                </button>
              </div>
            )}
            <p className="home-description">
              Decide whether Sinbad pursues profit or compassion on each voyage.
              Your choices push an Ethics Meter between Mercantile and
              Compassion, shaping your final legacy.
            </p>
            <div className="home-buttons">
              <button
                type="button"
                className="primary-button"
                onClick={startNewGame}
                aria-label="Start new voyage"
              >
                Start New Voyage
              </button>
              {hasSavedGame && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resumeGame}
                  aria-label="Resume last voyage"
                >
                  Resume Last Voyage
                </button>
              )}
              <button
                type="button"
                className="secondary-button"
                onClick={openPresentation}
                aria-label="Open midterm presentation slides"
              >
                Midterm presentation
              </button>
            </div>
            <p className="keyboard-hint">
              <kbd>←</kbd> Compassionate · <kbd>→</kbd> Mercantile · <kbd>R</kbd> Restart. Progress saved in this browser.
            </p>
          </section>
        )}

        {state.screen === 'play' && currentScenario && (
          <section className="play-screen">
            <div className="play-top-bar">
              <div className="card-index">
                Card {state.currentCardIndex + 1} of {TOTAL_CARDS}
              </div>
              <EthicsMeter score={state.ethicsScore} deltaPop={meterDeltaPop} />
            </div>

            <div className="play-content">
              <ScenarioCard
                key={currentScenario.id}
                scenario={currentScenario}
                cardIndex={state.currentCardIndex}
                totalCards={TOTAL_CARDS}
                exitDirection={cardExiting}
              />

              <ToastMessage
                message={toastMessage}
                visible={toastVisible}
                choiceType={toastChoiceType}
              />
            </div>

            <p className="keyboard-hint keyboard-hint--play">
              <kbd>←</kbd> Compassion · <kbd>→</kbd> Mercantile · <kbd>R</kbd> Restart
            </p>

            <div className="choice-buttons">
              <button
                type="button"
                className="choice-button choice-button--left"
                onClick={() => handleChoice('left')}
                disabled={choiceLocked}
                aria-label="Choose compassionate"
              >
                Compassionate (←)
                <span className="choice-button__subtitle">
                  {currentScenario.leftChoiceText}
                </span>
              </button>
              <button
                type="button"
                className="choice-button choice-button--right"
                onClick={() => handleChoice('right')}
                disabled={choiceLocked}
                aria-label="Choose mercantile"
              >
                Mercantile (→)
                <span className="choice-button__subtitle">
                  {currentScenario.rightChoiceText}
                </span>
              </button>
            </div>
          </section>
        )}

        {state.screen === 'result' && (
          <section
            className={`result-screen result-screen--${endingInfo.id}`}
            aria-label="Game result"
          >
            <div className="result-celebration" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="result-celebration__particle" style={{ '--i': i } as React.CSSProperties} />
              ))}
            </div>

            <h2 className="result-title">{endingInfo.title}</h2>
            <p className="result-epilogue">{endingInfo.epilogue}</p>

            <p className="result-one-liner">
              You chose compassion {state.compassionCount} time{state.compassionCount !== 1 ? 's' : ''} and mercantile {state.mercantileCount} time{state.mercantileCount !== 1 ? 's' : ''}.
            </p>

            <div className="result-stats">
              <div className="result-stat">
                <span className="result-stat__label">Final Ethics Meter</span>
                <span className="result-stat__value">{state.ethicsScore}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">Mercantile choices (→)</span>
                <span className="result-stat__value">{state.mercantileCount}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">Compassionate choices (←)</span>
                <span className="result-stat__value">{state.compassionCount}</span>
              </div>
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="primary-button"
                onClick={handleRestart}
                aria-label="Restart game"
              >
                Restart
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={handleCopyResult}
                aria-label="Copy result to clipboard"
              >
                Copy Result
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={openPresentation}
                aria-label="Open midterm presentation slides"
              >
                Midterm presentation
              </button>
            </div>

            {copyStatus === 'copied' && (
              <p className="copy-status copy-status--success">
                Result copied to clipboard.
              </p>
            )}
            {copyStatus === 'error' && (
              <p className="copy-status copy-status--error">
                Could not copy result in this browser.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
