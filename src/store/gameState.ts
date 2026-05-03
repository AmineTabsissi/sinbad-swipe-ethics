import type { AdventureId, GameState } from '../types'

const STORAGE_PREFIX = 'arabian-night-v1-'
/** Old single-game key — migrated into Sinbad slot on first load. */
const LEGACY_STORAGE_KEY = 'sinbad-swipe-ethics'

export function storageKeyForAdventure(adventureId: AdventureId): string {
  return `${STORAGE_PREFIX}${adventureId}`
}

/** Reset scores & index to defaults for starting or restarting one tale. */
export function freshAdventureHomeState(adventureId: AdventureId): GameState {
  return {
    adventureId,
    currentCardIndex: 0,
    ethicsScore: 50,
    wealthScore: 50,
    reputationScore: 50,
    mercantileCount: 0,
    compassionCount: 0,
    screen: 'home',
  }
}

/** Initial hub view (not persisted). */
export function initialHubState(): GameState {
  return {
    ...freshAdventureHomeState('sinbad'),
    screen: 'hub',
  }
}

function coerceGameState(parsed: Partial<GameState>, fallbackId: AdventureId): GameState | null {
  const screen = parsed.screen
  const adventureId =
    parsed.adventureId === 'sinbad' ||
    parsed.adventureId === 'aladdin' ||
    parsed.adventureId === 'horse'
      ? parsed.adventureId
      : fallbackId

  const hasCore =
    typeof parsed.currentCardIndex === 'number' &&
    typeof parsed.ethicsScore === 'number' &&
    typeof parsed.mercantileCount === 'number' &&
    typeof parsed.compassionCount === 'number' &&
    (screen === 'home' || screen === 'play' || screen === 'result')

  if (!hasCore) return null

  const wealthScore =
    typeof parsed.wealthScore === 'number' ? parsed.wealthScore : 50
  const reputationScore =
    typeof parsed.reputationScore === 'number' ? parsed.reputationScore : 50

  return {
    adventureId,
    currentCardIndex: parsed.currentCardIndex!,
    ethicsScore: parsed.ethicsScore!,
    wealthScore,
    reputationScore,
    mercantileCount: parsed.mercantileCount!,
    compassionCount: parsed.compassionCount!,
    screen: screen as 'home' | 'play' | 'result',
  }
}

function tryMigrateLegacySinbad(): GameState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GameState>
    const coerced = coerceGameState({ ...parsed, adventureId: 'sinbad' }, 'sinbad')
    if (!coerced) return null
    window.localStorage.setItem(
      storageKeyForAdventure('sinbad'),
      JSON.stringify(coerced),
    )
    window.localStorage.removeItem(LEGACY_STORAGE_KEY)
    return coerced
  } catch {
    return null
  }
}

/** Load persisted progress for one tale (never returns screen `hub`). */
export function loadGameState(adventureId: AdventureId): GameState | null {
  if (typeof window === 'undefined') return null

  try {
    if (adventureId === 'sinbad') {
      const migrated = tryMigrateLegacySinbad()
      if (migrated) return migrated
    }

    const raw = window.localStorage.getItem(storageKeyForAdventure(adventureId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GameState>
    return coerceGameState(parsed, adventureId)
  } catch {
    return null
  }
}

/** Persist only gameplay screens (omit hub). */
export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return
  if (state.screen === 'hub') return

  try {
    window.localStorage.setItem(
      storageKeyForAdventure(state.adventureId),
      JSON.stringify(state),
    )
  } catch {
    // ignore persistence errors
  }
}

export function clearGameState(adventureId: AdventureId): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(storageKeyForAdventure(adventureId))
  } catch {
    // ignore
  }
}

const HINT_DISMISSED_KEY = 'arabian-night-hint-dismissed'

export function isHintDismissed(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(HINT_DISMISSED_KEY) === '1'
  } catch {
    return true
  }
}

export function setHintDismissed(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(HINT_DISMISSED_KEY, '1')
  } catch {
    // ignore
  }
}

export function resumeableFor(adventureId: AdventureId): boolean {
  const saved = loadGameState(adventureId)
  if (!saved) return false
  return (
    saved.screen === 'play' ||
    saved.screen === 'result' ||
    saved.currentCardIndex > 0 ||
    saved.ethicsScore !== 50 ||
    saved.wealthScore !== 50 ||
    saved.reputationScore !== 50 ||
    saved.mercantileCount !== 0 ||
    saved.compassionCount !== 0
  )
}
