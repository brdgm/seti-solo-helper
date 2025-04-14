import { BotResources } from '@/store/state'

/**
 * Get initial bot resources.
 * @returns Bot resources
 */
export default function() : BotResources {
  return {
    progress: 1,
    publicity: 4,
    data: 0,
    techProbe: 0,
    techTelescope: 0,
    techComputer: 0,
    vp: 0
  }
}
