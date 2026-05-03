import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { ADVENTURE_ORDER, adventures, adventureIdFromHashFragment } from './data/adventureConfig'
import { getLocalizedAdventure } from './data/getLocalizedAdventure'
import { EthicsMeter } from './components/EthicsMeter'
import { WealthMeter } from './components/WealthMeter'
import { ReputationMeter } from './components/ReputationMeter'
import { ScenarioCard } from './components/ScenarioCard'
import { ToastMessage } from './components/ToastMessage'
import { VoyageMap } from './components/VoyageMap'
import type { AdventureId, GameState } from './types'
import {
  clearGameState,
  freshAdventureHomeState,
  initialHubState,
  isHintDismissed,
  loadGameState,
  saveGameState,
  setHintDismissed,
  resumeableFor,
} from './store/gameState'
import { publicUrl } from './utils/publicUrl'
import { playClick, playComplete, playAmbient, stopAmbient, playWhoosh } from './utils/sound'
import { Presentation } from './components/Presentation'
import { buildResultClipboardSummary, getEndingInfo } from './utils/endings'
import { buildHubTapestryCopy, loadCompletedTaleSummaries, splitTapestryBold } from './utils/anthologyPortrait'
import { useI18n } from './i18n/I18nContext'

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, value))
}

function applyHashRoute(): { kind: 'hub' } | { kind: 'play'; adventure: AdventureId; state: GameState } {
  const h = window.location.hash.replace(/^#\/?/, '')

  const adv = adventureIdFromHashFragment(window.location.hash)
  if (!adv || h === '' || h === 'hub') {
    return { kind: 'hub' }
  }

  const loaded = loadGameState(adv)
  const total = adventures[adv].scenarios.length
  if (!loaded) {
    return {
      kind: 'play',
      adventure: adv,
      state: freshAdventureHomeState(adv),
    }
  }

  let screen: 'home' | 'play' | 'result' =
    loaded.screen === 'hub'
      ? 'home'
      : (loaded.screen as 'home' | 'play' | 'result')
  if (loaded.currentCardIndex >= total) screen = 'result'
  else if (screen === 'result') screen = 'play'

  return {
    kind: 'play',
    adventure: adv,
    state: { ...loaded, adventureId: adv, screen },
  }
}

function App() {
  const { locale, setLocale, t } = useI18n()
  const [state, setState] = useState<GameState>(initialHubState)
  const [hasSavedGame, setHasSavedGame] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastChoiceType, setToastChoiceType] = useState<'left' | 'right'>('left')
  const [choiceLocked, setChoiceLocked] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const [ethicsDeltaPop, setEthicsDeltaPop] = useState<number | null>(null)
  const [wealthDeltaPop, setWealthDeltaPop] = useState<number | null>(null)
  const [reputationDeltaPop, setReputationDeltaPop] = useState<number | null>(null)
  const [cardExiting, setCardExiting] = useState<'left' | 'right' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showPresentation, setShowPresentation] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#presentation',
  )
  /** Bumps whenever we land on #hub so hub tapestry re-reads localStorage (screen may stay `hub`). */
  const [hubTapestryTick, setHubTapestryTick] = useState(0)

  useEffect(() => {
    function onRoute() {
      const raw = window.location.hash
      if (raw === '#presentation') {
        setShowPresentation(true)
        return
      }
      setShowPresentation(false)

      const route = applyHashRoute()
      if (route.kind === 'hub') {
        setState(initialHubState())
        setHubTapestryTick((t) => t + 1)
      } else setState(route.state)

      const adv = adventureIdFromHashFragment(raw)
      if (adv && route.kind !== 'hub') {
        setHasSavedGame(resumeableFor(adv))
      } else setHasSavedGame(false)
    }

    if (typeof window === 'undefined') return
    onRoute()
    window.addEventListener('hashchange', onRoute)
    return () => window.removeEventListener('hashchange', onRoute)
  }, [])

  /** First-time hint once per tale home if never dismissed globally. */
  useEffect(() => {
    if (state.screen !== 'home') return
    if (!isHintDismissed()) setShowHint(true)
  }, [state.screen, state.adventureId])

  useEffect(() => {
    if (state.screen !== 'home') return
    setHasSavedGame(resumeableFor(state.adventureId))
  }, [state.screen, state.adventureId])

  const adventureDef = useMemo(
    () => getLocalizedAdventure(state.adventureId, locale),
    [state.adventureId, locale],
  )
  const scenarios = adventureDef.scenarios
  const totalCards = scenarios.length

  const openPresentation = useCallback(() => {
    setShowPresentation(true)
    window.location.hash = '#presentation'
  }, [])

  const closePresentation = useCallback(() => {
    setShowPresentation(false)
    if (window.location.hash !== '#presentation') return
    /** Restore a shareable deep link; clearing hash desynced URL from tale and broke refresh/bookmark. */
    const nextHash =
      state.screen === 'hub' ? '#hub' : `#${adventures[state.adventureId].hash}`
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}${nextHash}`,
    )
  }, [state.screen, state.adventureId])

  const goToHub = useCallback(() => {
    setShowHint(false)
    window.location.hash = '#hub'
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
    if (state.screen === 'hub') return
    const next: GameState = {
      ...freshAdventureHomeState(state.adventureId),
      screen: 'play',
    }
    setState(next)
    saveGameState(next)
    setHasSavedGame(true)
    setToastVisible(false)
    setCopyStatus('idle')
    setCardExiting(null)
    setEthicsDeltaPop(null)
    setWealthDeltaPop(null)
    setReputationDeltaPop(null)
  }, [state.adventureId, state.screen])

  const resumeGame = useCallback(() => {
    const loaded = loadGameState(state.adventureId)
    if (!loaded) return

    let screen: 'home' | 'play' | 'result' =
      loaded.screen === 'hub'
        ? 'home'
        : (loaded.screen as 'home' | 'play' | 'result')
    if (loaded.currentCardIndex >= totalCards) screen = 'result'
    else if (screen === 'result') screen = 'play'

    const next: GameState = {
      ...loaded,
      screen,
      adventureId: state.adventureId,
    }

    setState(next)
    saveGameState(next)
    setToastVisible(false)
    setChoiceLocked(false)
    setCopyStatus('idle')
    setHasSavedGame(true)
    setCardExiting(null)
    setEthicsDeltaPop(null)
    setWealthDeltaPop(null)
    setReputationDeltaPop(null)
  }, [state.adventureId, totalCards])

  const handleRestart = useCallback(() => {
    clearGameState(state.adventureId)
    const next = freshAdventureHomeState(state.adventureId)
    setState(next)
    setHasSavedGame(false)
    setToastVisible(false)
    setChoiceLocked(false)
    setCopyStatus('idle')
    setCardExiting(null)
    setEthicsDeltaPop(null)
    setWealthDeltaPop(null)
    setReputationDeltaPop(null)
    saveGameState(next)
  }, [state.adventureId])

  const handleChoice = useCallback(
    (direction: 'left' | 'right') => {
      if (choiceLocked) return
      if (state.screen !== 'play') return
      if (state.currentCardIndex >= totalCards) return

      const scenario = scenarios[state.currentCardIndex]
      const isLeft = direction === 'left'
      const delta = isLeft ? scenario.leftDelta : scenario.rightDelta

      playClick()
      setHintDismissed()
      setShowHint(false)

      setCardExiting(direction)
      setEthicsDeltaPop(delta.ethics)
      setWealthDeltaPop(delta.wealth)
      setReputationDeltaPop(delta.reputation)
      setChoiceLocked(true)
      setToastChoiceType(direction)
      setToastMessage(isLeft ? scenario.leftConsequence : scenario.rightConsequence)
      setToastVisible(true)

      const intermediate: GameState = {
        ...state,
        ethicsScore: clampScore(state.ethicsScore + delta.ethics),
        wealthScore: clampScore(state.wealthScore + delta.wealth),
        reputationScore: clampScore(state.reputationScore + delta.reputation),
        mercantileCount: state.mercantileCount + (isLeft ? 0 : 1),
        compassionCount: state.compassionCount + (isLeft ? 1 : 0),
      }

      setState(intermediate)

      const nextIndex = state.currentCardIndex + 1
      const willBeResult = nextIndex >= totalCards

      window.setTimeout(() => {
        playWhoosh()
        setCardExiting(null)
        setState((prev) => {
          const advancedIndex =
            prev.currentCardIndex < totalCards
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
        window.setTimeout(() => {
          setEthicsDeltaPop(null)
          setWealthDeltaPop(null)
          setReputationDeltaPop(null)
        }, 800)
      }, 380)
    },
    [choiceLocked, state, scenarios, totalCards],
  )

  const handleCopyResult = useCallback(() => {
    const summary = buildResultClipboardSummary(
      state.adventureId,
      state.ethicsScore,
      state.wealthScore,
      state.reputationScore,
      state.mercantileCount,
      state.compassionCount,
      locale,
    )

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyStatus('error')
      return
    }

    navigator.clipboard
      .writeText(summary)
      .then(() => setCopyStatus('copied'))
      .catch(() => setCopyStatus('error'))
  }, [state, locale])

  const dismissHint = useCallback(() => {
    setHintDismissed()
    setShowHint(false)
  }, [])

  useEffect(() => {
    if (showPresentation) return
    if (state.screen === 'hub') return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.screen === 'play') {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          handleChoice('left')
          return
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          handleChoice('right')
          return
        }
      }
      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault()
        handleRestart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showPresentation, state.screen, handleChoice, handleRestart])

  const currentScenario =
    state.currentCardIndex < totalCards ? scenarios[state.currentCardIndex] : null

  const endingInfo = getEndingInfo(
    state.adventureId,
    state.ethicsScore,
    state.wealthScore,
    state.reputationScore,
    state.compassionCount,
    state.mercantileCount,
    locale,
  )

  const mapProgress =
    state.screen === 'play'
      ? state.currentCardIndex
      : state.screen === 'result'
        ? totalCards
        : 0

  const hubTapestry = useMemo(() => {
    if (state.screen !== 'hub') return null
    const summaries = loadCompletedTaleSummaries(locale)
    return { summaries, copy: buildHubTapestryCopy(summaries, locale) }
  }, [state.screen, hubTapestryTick, locale])

  if (showPresentation) {
    return <Presentation onClose={closePresentation} />
  }

  const hubView = state.screen === 'hub'

  return (
    <div className={`app-shell${hubView ? ' app-shell--hub' : ''}`} data-adventure={state.adventureId}>
      <div className="app-shell__voyage-bg" aria-hidden="true" />
      <div className="app-shell__grain" aria-hidden="true" />
      {!hubView && (
        <VoyageMap
          currentCard={mapProgress}
          totalCards={totalCards}
          mapSrc={publicUrl(adventureDef.mapImage)}
          mapAlt={adventureDef.mapImageAlt}
          mapMarkerLeftPercents={adventureDef.mapMarkerLeftPercents}
          mapImageObjectPosition={adventureDef.mapImageObjectPosition}
          mapMarkerTopPercent={adventureDef.mapMarkerTopPercent}
          mapMarkerTopPercents={adventureDef.mapMarkerTopPercents}
        />
      )}
      <header className="app-header">
        {hubView ? (
          <>
            <h1 className="app-title app-title--hub">{t('header.hubTitle')}</h1>
            <p className="app-subtitle">{t('header.hubSubtitle')}</p>
            <div className="hub-lang" role="group" aria-label={t('hub.langLabel')}>
              <button
                type="button"
                className={`hub-lang__btn${locale === 'en' ? ' hub-lang__btn--active' : ''}`}
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
              >
                {t('hub.langEn')}
              </button>
              <button
                type="button"
                className={`hub-lang__btn${locale === 'fr' ? ' hub-lang__btn--active' : ''}`}
                onClick={() => setLocale('fr')}
                aria-pressed={locale === 'fr'}
              >
                {t('hub.langFr')}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="app-title">{adventureDef.gameTitle}</h1>
            <p className="app-subtitle">{adventureDef.gameSubtitle}</p>
          </>
        )}
      </header>

      <main className="app-main">
        {state.screen === 'hub' && (
          <section className="hub-screen" aria-label={t('header.hubSubtitle')}>
            <div className="hub-hero" aria-hidden="true">
              {ADVENTURE_ORDER.map((id) => {
                const def = adventures[id]
                return (
                  <div
                    key={id}
                    className={`hub-hero__panel hub-hero__panel--${def.id}`}
                    style={{ backgroundImage: `url(${publicUrl(def.mapImage)})` }}
                  />
                )
              })}
              <div className="hub-hero__veil" />
            </div>
            <p className="hub-intro">{t('hub.intro')}</p>

            {hubTapestry && (
              <div className="hub-tapestry" aria-label={t('hub.tapestryAria')}>
                <h2 className="hub-tapestry__headline">{hubTapestry.copy.headline}</h2>
                <p className="hub-tapestry__tagline">{hubTapestry.copy.tagline}</p>
                <div className="hub-tapestry__slots">
                  {ADVENTURE_ORDER.map((id) => {
                    const def = getLocalizedAdventure(id, locale)
                    const slot = hubTapestry.summaries.find((s) => s.adventureId === id)
                    return (
                      <div
                        key={id}
                        className={`hub-tapestry-slot${slot ? ' hub-tapestry-slot--done' : ''}`}
                      >
                        <span className="hub-tapestry-slot__tale">{def.icon}</span>
                        <span className="hub-tapestry-slot__label">{def.hubTitle}</span>
                        {slot ? (
                          <>
                            <span className="hub-tapestry-slot__ending">{slot.endingTitle}</span>
                            <span className="hub-tapestry-slot__id">{slot.endingId}</span>
                          </>
                        ) : (
                          <span className="hub-tapestry-slot__pending">{t('hub.tapestryPending')}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="hub-tapestry__portrait">
                  {splitTapestryBold(hubTapestry.copy.portrait).map((part, i) =>
                    part.bold ? (
                      <strong key={i}>{part.text}</strong>
                    ) : (
                      <span key={i}>{part.text}</span>
                    ),
                  )}
                </p>
              </div>
            )}

            <div className="hub-grid">
              {ADVENTURE_ORDER.map((id) => {
                const def = getLocalizedAdventure(id, locale)
                const canResume = resumeableFor(id)
                return (
                  <button
                    key={id}
                    type="button"
                    className="hub-card"
                    onClick={() => {
                      window.location.hash = `#${def.hash}`
                    }}
                  >
                    <div
                      className={`hub-card__visual hub-card__visual--${def.id}`}
                      style={{ backgroundImage: `url(${publicUrl(def.mapImage)})` }}
                      aria-hidden="true"
                    />
                    <div className="hub-card__body">
                      <span className="hub-card__icon" aria-hidden="true">
                        {def.icon}
                      </span>
                      <span className="hub-card__title">{def.hubTitle}</span>
                      <span className="hub-card__blurb">{def.hubBlurb}</span>
                      {canResume && <span className="hub-card__badge">{t('hub.badgeSaved')}</span>}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="hub-footer">
              <button type="button" className="secondary-button" onClick={openPresentation}>
                {t('hub.presentation')}
              </button>
            </div>
          </section>
        )}

        {state.screen === 'home' && (
          <section className="home-screen">
            {showHint && (
              <div className="first-time-hint" role="region" aria-label={t('hint.region')}>
                <p className="first-time-hint__text">{t('hint.body')}</p>
                <button
                  type="button"
                  className="first-time-hint__dismiss"
                  onClick={dismissHint}
                  aria-label={t('hint.dismissAria')}
                >
                  {t('hint.dismiss')}
                </button>
              </div>
            )}
            <button type="button" className="link-back-hub" onClick={goToHub}>
              {t('header.allTales')}
            </button>
            <p className="home-description">{adventureDef.homeDescription}</p>
            <div className="home-buttons">
              <button type="button" className="primary-button" onClick={startNewGame} aria-label={t('home.startAria')}>
                {t('home.start')}
              </button>
              {hasSavedGame && (
                <button type="button" className="secondary-button" onClick={resumeGame} aria-label={t('home.resumeAria')}>
                  {t('home.resume')}
                </button>
              )}
              <button
                type="button"
                className="secondary-button"
                onClick={openPresentation}
                aria-label={t('home.presentationAria')}
              >
                {t('hub.presentation')}
              </button>
            </div>
            <p className="keyboard-hint">
              <kbd>←</kbd> {adventureDef.leftVerb} · <kbd>→</kbd> {adventureDef.rightVerb} · <kbd>R</kbd>{' '}
              {t('home.keyboardHint')}
            </p>
          </section>
        )}

        {state.screen === 'play' && currentScenario && (
          <section className="play-screen">
            <button type="button" className="link-back-hub link-back-hub--inline" onClick={goToHub}>
              {t('play.tales')}
            </button>
            <div className="play-top-bar">
              <div className="card-index">
                {t('play.cardIndex', {
                  current: String(state.currentCardIndex + 1),
                  total: String(totalCards),
                })}
              </div>
              <div className="meters">
                <EthicsMeter score={state.ethicsScore} deltaPop={ethicsDeltaPop} />
                <WealthMeter score={state.wealthScore} deltaPop={wealthDeltaPop} />
                <ReputationMeter score={state.reputationScore} deltaPop={reputationDeltaPop} />
              </div>
            </div>

            <div className="play-content">
              <ScenarioCard
                key={currentScenario.id}
                scenario={currentScenario}
                cardIndex={state.currentCardIndex}
                totalCards={totalCards}
                exitDirection={cardExiting}
              />

              <ToastMessage message={toastMessage} visible={toastVisible} choiceType={toastChoiceType} />
            </div>

            <p className="keyboard-hint keyboard-hint--play">
              <kbd>←</kbd> {adventureDef.leftVerb} · <kbd>→</kbd> {adventureDef.rightVerb} · <kbd>R</kbd>{' '}
              {t('play.restartHint')}
            </p>

            <div className="choice-buttons">
              <button
                type="button"
                className="choice-button choice-button--left"
                onClick={() => handleChoice('left')}
                disabled={choiceLocked}
                aria-label={t('play.chooseLeft', { label: adventureDef.leftVerb })}
              >
                {adventureDef.leftVerb} (←)
                <span className="choice-button__subtitle">{currentScenario.leftChoiceText}</span>
              </button>
              <button
                type="button"
                className="choice-button choice-button--right"
                onClick={() => handleChoice('right')}
                disabled={choiceLocked}
                aria-label={t('play.chooseRight', { label: adventureDef.rightVerb })}
              >
                {adventureDef.rightVerb} (→)
                <span className="choice-button__subtitle">{currentScenario.rightChoiceText}</span>
              </button>
            </div>
          </section>
        )}

        {state.screen === 'result' && (
          <section
            className={`result-screen result-screen--${endingInfo.backgroundKey}`}
            aria-label={t('result.aria')}
            data-ending-id={endingInfo.id}
          >
            <button type="button" className="link-back-hub link-back-hub--inline" onClick={goToHub}>
              {t('play.tales')}
            </button>
            <div className="result-celebration" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="result-celebration__particle" style={{ '--i': i } as React.CSSProperties} />
              ))}
            </div>

            <h2 className="result-title">{endingInfo.title}</h2>
            <p className="result-epilogue">{endingInfo.epilogue}</p>
            <p className="result-playstyle">{endingInfo.playstyleCoda}</p>

            <p className="result-one-liner">
              {adventureDef.leftVerb} (←): {state.compassionCount} · {adventureDef.rightVerb} (→):{' '}
              {state.mercantileCount}.
            </p>

            <div className="result-stats">
              <div className="result-stat">
                <span className="result-stat__label">{t('result.statEthics')}</span>
                <span className="result-stat__value">{state.ethicsScore}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">{t('result.statWealth')}</span>
                <span className="result-stat__value">{state.wealthScore}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">{t('result.statReputation')}</span>
                <span className="result-stat__value">{state.reputationScore}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">{t('result.statRight')}</span>
                <span className="result-stat__value">{state.mercantileCount}</span>
              </div>
              <div className="result-stat">
                <span className="result-stat__label">{t('result.statLeft')}</span>
                <span className="result-stat__value">{state.compassionCount}</span>
              </div>
            </div>

            <div className="result-actions">
              <button type="button" className="primary-button" onClick={handleRestart} aria-label={t('result.restartAria')}>
                {t('result.restart')}
              </button>
              <button type="button" className="secondary-button" onClick={goToHub} aria-label={t('result.hubAria')}>
                {t('result.hub')}
              </button>
              <button type="button" className="secondary-button" onClick={handleCopyResult} aria-label={t('result.copyAria')}>
                {t('result.copy')}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={openPresentation}
                aria-label={t('result.presentationAria')}
              >
                {t('result.presentation')}
              </button>
            </div>

            {copyStatus === 'copied' && <p className="copy-status copy-status--success">{t('result.copied')}</p>}
            {copyStatus === 'error' && <p className="copy-status copy-status--error">{t('result.copyError')}</p>}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
