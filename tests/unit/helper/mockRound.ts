import { PlayerOrder, Round, Turn } from '@/store/state'

export default function (params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1,
    playerOrder: params?.playerOrder ?? [{bot:1},{player:1}],
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
  playerOrder? : PlayerOrder[]
  turns? : Turn[]
}
