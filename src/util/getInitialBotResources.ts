import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import { BotResources } from '@/store/state'

/**
 * Get initial bot resources.
 * @param startPlayer Start player
 * @returns Bot resources
 */
export default function getInitialBotResources(startPlayer: Player, difficultyLevel: DifficultyLevel) : BotResources {
  return {
    progress: getInitialProgress(difficultyLevel),
    publicity: 4,
    data: 0,
    vp: startPlayer == Player.BOT ? 1 : 2,
    techProbe: 0,
    techTelescope: 0,
    techComputer: 0,
    probeCount: 0
  }
}

function getInitialProgress(difficultyLevel: DifficultyLevel): number {
  switch (difficultyLevel) {
    case DifficultyLevel.LEVEL_4:
      return 4
    case DifficultyLevel.LEVEL_5:
      return 9
    default:
      return 1
  }
}