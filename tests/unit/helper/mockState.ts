import Corporation from '@/services/enum/Corporation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import Expansion from '@/services/enum/Expansion'
import PlayerColor from '@/services/enum/PlayerColor'
import { CardDeckPersistence, Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      expansions: params?.expansions ?? [],
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerColors: params?.playerColors ?? [PlayerColor.WHITE, PlayerColor.BLACK, PlayerColor.TURQUOISE, PlayerColor.RED]
      },
      difficultyLevels: params?.difficultyLevels ?? [DifficultyLevel.MEDIUM],
      botCorporations: params?.botCorporations ?? [Corporation.USA],
      botExecutiveOfficers: params?.botExecutiveOfficers ?? [],
      initialCardDeck: params?.initialCardDeck
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  expansions?: Expansion[]
  playerCount?: number
  botCount?: number
  playerColors?: PlayerColor[]
  difficultyLevels?: DifficultyLevel[]
  rounds?: Round[]
  botCorporations?: Corporation[]
  botExecutiveOfficers?: ExecutiveOfficer[]
  initialCardDeck?: CardDeckPersistence
}
