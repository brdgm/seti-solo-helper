import Expansion from '@/services/enum/Expansion'

/**
 * Get first round to play
 * @returns Round
 */
export default function getFirstRound(expansions: Expansion[]) : number {
  if (expansions.includes(Expansion.SPACE_AGENCIES_ORGANIZATIONS)) { 
    return 2
  }
  else {
    return 1
  }
}
