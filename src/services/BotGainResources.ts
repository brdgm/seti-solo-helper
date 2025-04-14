import { BotResources } from '@/store/state'
import { ref } from 'vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

/**
 * Resources the bot gained this turn by either the actions, or manual input.
 */
export default class BotGainResources {

  public readonly gainProgressSingleStep = ref(undefined as number|undefined)
  public readonly gainProgressIncomeIncrease = ref(undefined as number|undefined)
  public readonly gainPublicity = ref(undefined as number|undefined)
  public readonly gainData = ref(undefined as number|undefined)
  public readonly gainVP = ref(undefined as number|undefined)

  private readonly actionProgress = ref(0)
  private readonly actionPublicity = ref(0)
  private readonly actionVP = ref(0)
  private readonly actionTechProbe = ref(0)
  private readonly actionTechTelescope = ref(0)
  private readonly actionTechComputer = ref(0)
  private readonly actionProbeCount = ref(0)

  public get resources() : BotResources {
    return {
      progress: toNumber(this.gainProgressSingleStep.value)
          + toNumber(this.gainProgressIncomeIncrease.value) * 4
          + toNumber(this.actionProgress.value),
      publicity: toNumber(this.gainPublicity.value) + this.actionPublicity.value,
      data: toNumber(this.gainData.value),
      vp: toNumber(this.gainVP.value) + this.actionVP.value,
      techProbe: this.actionTechProbe.value,
      techTelescope: this.actionTechTelescope.value,
      techComputer: this.actionTechComputer.value,
      probeCount: this.actionProbeCount.value
    }  
  }

}
