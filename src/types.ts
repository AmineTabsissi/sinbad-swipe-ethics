export type AdventureId = 'sinbad' | 'aladdin' | 'horse'

export type Screen = 'hub' | 'home' | 'play' | 'result'

export interface Scenario {
  id: string
  voyageTitle: string
  summary: string
  dilemma: string
  leftChoiceText: string
  rightChoiceText: string
  leftConsequence: string
  rightConsequence: string
  leftDelta: {
    ethics: number
    wealth: number
    reputation: number
  }
  rightDelta: {
    ethics: number
    wealth: number
    reputation: number
  }
}

export interface GameState {
  adventureId: AdventureId
  currentCardIndex: number
  ethicsScore: number
  wealthScore: number
  reputationScore: number
  mercantileCount: number
  compassionCount: number
  screen: Screen
}
