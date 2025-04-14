import Player from '@/services/enum/Player'
import { BotResources } from '@/store/state'

/**
 * Get initial bot resources.
 * @param startPlayer Start player
 * @returns Bot resources
 */
export default function(startPlayer: Player) : BotResources {
  return {
    progress: 1,
    publicity: 4,
    data: 0,
    techProbe: 0,
    techTelescope: 0,
    techComputer: 0,
    vp: startPlayer == Player.BOT ? 1 : 2
  }
}
