import { State } from '@/store/state'

/**
 * Checks if no player/bot has passed on a previous turn.
 * @param state State
 * @param round Current round
 * @param turn Current turn
 * @param turnOrderIndex Current turn order index
 */
export default function isFirstPass(state:State, round:number, turn:number, turnOrderIndex:number) : boolean {
  const roundData = state.rounds.find(item => item.round==round)
  const previousTurns = roundData?.turns.filter(item => item.turn < turn || (item.turn == turn && item.turnOrderIndex < turnOrderIndex)) ?? []
  return !previousTurns.some(item => item.pass)
}
