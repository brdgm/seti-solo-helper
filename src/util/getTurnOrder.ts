import Player from '@/services/enum/Player'
import { State } from '@/store/state'

/**
 * Generate list of all player/bot turns - leaving out steps after player/bot has passed.
 * @param state State
 * @param round Current round
 * @param currentTurn Current turn number
 */
export default function getTurnOrder(state: State, currentRound: number, currentTurn: number) : TurnOrder[] {
  const round = state.rounds.find(item => item.round==currentRound)
  if (!round) {
    return []
  }
  const { startPlayer, turns } = round
  const playerOrder = startPlayer == Player.PLAYER ? [Player.PLAYER, Player.BOT] : [Player.BOT, Player.PLAYER]
  const steps : TurnOrder[] = []

  let invalidTurn = false
  for (let turn=1; turn<=currentTurn+1; turn++) {
    let turnOrderIndex = 0
    for (const player of playerOrder) {
      const hasPassed = turns.find(item => item.turn<turn
            && item.player==player && item.pass) != undefined
      if (!hasPassed) {
        if (turn > MAX_TURN) {
          // not a valid round as not all have passed in time, return empty list of steps
          invalidTurn = true
        }
        steps.push({round:round.round, turn, turnOrderIndex, player})
        turnOrderIndex++
      }
    }
  }
  if (invalidTurn) {
    return []
  }
  else {
    return steps
  }
}

export interface TurnOrder {
  readonly round: number
  readonly turn: number
  readonly turnOrderIndex: number
  readonly player: Player
}

export const MAX_TURN = 99
