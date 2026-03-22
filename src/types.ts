export type Screen = 'home' | 'play' | 'result'

export interface Scenario {
  id: string
  voyageTitle: string
  summary: string
  dilemma: string
  leftChoiceText: string
  rightChoiceText: string
  leftConsequence: string
  rightConsequence: string
}

export interface GameState {
  currentCardIndex: number
  ethicsScore: number
  mercantileCount: number
  compassionCount: number
  screen: Screen
}