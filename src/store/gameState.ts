import type { GameState } from '../types'

const STORAGE_KEY = 'sinbad-swipe-ethics'

export const initialGameState: GameState = {
  currentCardIndex: 0,
  ethicsScore: 50,
  wealthScore: 50,
  reputationScore: 50,
  mercantileCount: 0,
  compassionCount: 0,
  screen: 'home',
}

export function loadGameState(): GameState | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GameState>

    const hasCore =
      typeof parsed.currentCardIndex === 'number' &&
      typeof parsed.ethicsScore === 'number' &&
      typeof parsed.mercantileCount === 'number' &&
      typeof parsed.compassionCount === 'number' &&
      (parsed.screen === 'home' ||
        parsed.screen === 'play' ||
        parsed.screen === 'result')

    if (hasCore) {
      // Backward compatible defaults for older saves (pre-wealth/reputation)
      const wealthScore =
        typeof parsed.wealthScore === 'number' ? parsed.wealthScore : 50
      const reputationScore =
        typeof parsed.reputationScore === 'number' ? parsed.reputationScore : 50

      return {
        ...(parsed as GameState),
        wealthScore,
        reputationScore,
      }
    }

    return null
  } catch {
    return null
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore persistence errors
  }
}

export function clearGameState(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

const HINT_DISMISSED_KEY = 'sinbad-swipe-ethics-hint-dismissed'

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