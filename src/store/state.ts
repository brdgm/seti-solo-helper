import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import AlienSpecies from '@/services/enum/AlienSpecies'
import GoldScoreTile from '@/services/enum/GoldScoreTile'
import GoldScoreTileSide from '@/services/enum/GoldScoreTileSide'
import MilestoneType from '@/services/enum/MilestoneType'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.LEVEL_1
      },
      alienDiscovery: {
        species: [undefined, undefined]
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
      this.setup.goldScoreTileSetup = undefined
      this.alienDiscovery.species = [undefined, undefined]
    },
    storeRound(round : Round) : void {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeRoundTurn(roundTurn : RoundTurn) : void {
      const round = this.rounds.find(item => item.round == roundTurn.round)
      if (!round) {
        throw new Error(`Round ${roundTurn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < roundTurn.turn) || (item.turn == roundTurn.turn && item.turnOrderIndex < roundTurn.turnOrderIndex))
      round.turns.push(roundTurn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  alienDiscovery: AlienDiscovery
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  startPlayer?: Player
  goldScoreTileSetup?: GoldScoreTileSetup
  debugMode?: boolean
}
export interface GoldScoreTileSetup {
  tile: GoldScoreTile[]
  side: GoldScoreTileSide[]
}

export interface AlienDiscovery {
  species: (AlienSpecies|undefined)[]
}

export interface Round {
  round: number
  startPlayer: Player
  initialBotPersistence: BotPersistence
  turns: RoundTurn[]
}
export interface RoundTurn {
  round: number
  turn: number
  turnOrderIndex: number
  player: Player
  pass?: boolean
  botPersistence: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
  objectiveStack?: ObjectiveStackPersistence
  milestoneTracker?: MilestoneTrackerPersistence
  resources: BotResources
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
  advanced: string[]
}
export interface ObjectiveStackPersistence {
  pile: number[]
  current: number[]
  currentItemCheck: boolean[][]
  complete: number[]
  discard: number[]
}
export interface MilestoneTrackerPersistence {
  milestones: Milestone[]
}
export interface Milestone {
  type: MilestoneType
  score: number
}
export interface BotResources {
  progress: number
  publicity: number
  data: number
  vp: number
  techProbe: number
  techTelescope: number
  techComputer: number
  probeCount: number
}
