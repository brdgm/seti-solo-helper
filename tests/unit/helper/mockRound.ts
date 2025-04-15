import Player from '@/services/enum/Player'
import { BotPersistence, Round, RoundTurn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'

export default function (params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1,
    startPlayer: params?.startPlayer ?? Player.PLAYER,
    initialBotPersistence: params?.initialBotPersistence ?? mockBotPersistence(),
    turns: params?.turns ?? []
  }
  // renumber turnOrderIndex
  let previousTurn = 0
  let turnOrderIndex = 0
  round.turns.forEach(turn => {
    if (turn.turn != previousTurn) {
      turnOrderIndex = 0
      previousTurn = turn.turn
    }
    turn.turnOrderIndex = turnOrderIndex++
  })
  return round
}

export interface MockRoundParams {
  round? : number
  startPlayer? : Player
  initialBotPersistence? : BotPersistence
  turns? : RoundTurn[]
}
