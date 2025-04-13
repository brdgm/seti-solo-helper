import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.LEVEL_1
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
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
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  startPlayer?: Player
  debugMode?: boolean
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
  botPersistence?: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
  advanced: string[]
}
