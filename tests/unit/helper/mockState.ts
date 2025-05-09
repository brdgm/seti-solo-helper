import AlienSpecies from '@/services/enum/AlienSpecies'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.LEVEL_1,
      startPlayer: params?.startPlayer
    },
    alienDiscovery: {
      species: params?.alienSpecies ?? []
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  startPlayer?: Player
  alienSpecies?: (AlienSpecies|undefined)[]
  rounds?: Round[]
}
