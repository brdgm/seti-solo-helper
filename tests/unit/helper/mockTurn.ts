import Player from '@/services/enum/Player'
import { BotPersistence, RoundTurn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'

export default function (params?: MockTurnParams) : RoundTurn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player ?? Player.PLAYER,
    pass: params?.pass,
    botPersistence: params?.botPersistence ?? mockBotPersistence()
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  player?: Player
  pass?: boolean
  botPersistence?: BotPersistence
}
