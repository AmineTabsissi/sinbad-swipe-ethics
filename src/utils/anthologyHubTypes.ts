import type { AdventureId } from '../types'

export interface TaleCompletionSummary {
  adventureId: AdventureId
  gameTitle: string
  endingId: string
  endingTitle: string
  ethics: number
  wealth: number
  reputation: number
  compassionCount: number
  mercantileCount: number
}

export interface HubTapestryCopy {
  headline: string
  tagline: string
  portrait: string
}
