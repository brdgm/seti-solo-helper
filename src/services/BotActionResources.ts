import { BotResources } from '@/store/state'
import { ref } from 'vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import { CardAction } from './Card'
import Action from './enum/Action'
import TechType from './enum/TechType'
import AlienSpecies from './enum/AlienSpecies'
import BotGameBoardResources from './BotGameBoardResources'

/**
 * Resources the bot gained this turn implicitly by the actions.
 */
export default class BotActionResources {

  private readonly actionProgress = ref(0)
  private readonly actionPublicity = ref(0)
  private readonly actionData = ref(0)
  private readonly actionVP = ref(0)
  private readonly actionTechProbe = ref(0)
  private readonly actionTechTelescope = ref(0)
  private readonly actionTechComputer = ref(0)
  private readonly actionProbeCount = ref(0)

  public get resources() : BotResources {
    return {
      progress: this.actionProgress.value,
      publicity: this.actionPublicity.value,
      data: this.actionData.value,
      vp: this.actionVP.value,
      techProbe: this.actionTechProbe.value,
      techTelescope: this.actionTechTelescope.value,
      techComputer: this.actionTechComputer.value,
      probeCount: this.actionProbeCount.value
    }  
  }

  public applyAction(action: CardAction, techType?: TechType, alienSpecies?: AlienSpecies) : void {
    this.resetAction()
    switch (action.action) {
      case Action.TECH:
        this.actionPublicity.value -= action.publicityCost
        this.actionProgress.value += action.progress
        this.gainTech(techType)
        break
      case Action.LAUNCH:
        this.actionPublicity.value += action.publicity
        this.actionProgress.value += action.progress
        this.actionProbeCount.value += 1
        break
      case Action.PROBE:
        this.actionProbeCount.value -= 1
        if (techType === TechType.PROBE) {
          this.actionTechProbe.value -= 1
        }
        break
      case Action.TELESCOPE:
        if (techType === TechType.TELESCOPE) {
          this.actionTechTelescope.value -= 1
        }
        break
      case Action.ANALYZE:
        this.actionVP.value += action.victoryPoints
        this.actionData.value -= 6
        if (techType === TechType.COMPUTER) {
          this.actionTechComputer.value -= 1
          this.actionVP.value += 3
          this.actionProgress.value += 1
        }
        break
      case Action.PASS:
        this.actionProgress.value += 1
        break
      case Action.SPECIES_SPECIAL_ACTION:
        switch (alienSpecies) {
          case AlienSpecies.MASCAMITES:
            this.actionProbeCount.value -= 1
            if (techType === TechType.PROBE) {
              this.actionTechProbe.value -= 1
            }
            break
          case AlienSpecies.ANOMALIES:
            this.actionVP.value += 3
            break
          case AlienSpecies.CENTAURIANS:
            this.actionProgress.value += 1
            break
        }
        break
    }
  }

  private gainTech(techType?: TechType) : void {
    switch (techType) {
      case TechType.PROBE:
        this.actionTechProbe.value += 1
        break
      case TechType.TELESCOPE:
        this.actionTechTelescope.value += 1
        break
      case TechType.COMPUTER:
        this.actionTechComputer.value += 1
        break
    }
  }

  private resetAction() : void {
    this.actionProgress.value = 0
    this.actionPublicity.value = 0
    this.actionData.value = 0
    this.actionVP.value = 0
    this.actionTechProbe.value = 0
    this.actionTechTelescope.value = 0
    this.actionTechComputer.value = 0
    this.actionProbeCount.value = 0
  }

  public merge(botResources: BotResources, gameBoardResources : BotGameBoardResources) : BotResources {
    let initialData = botResources.data
    if (this.actionData.value == -6) {
      initialData = 0
    }
    const result : BotResources = {
      progress: botResources.progress + this.resources.progress
          + toNumber(gameBoardResources.progressSingleStep)
          + toNumber(gameBoardResources.progressIncomeIncrease) * 4,
      publicity: botResources.publicity + this.resources.publicity
          + toNumber(gameBoardResources.publicity),
      data: botResources.data + this.resources.data
          + toNumber(gameBoardResources.data),
      vp: botResources.vp + this.resources.vp
          + toNumber(gameBoardResources.vp),
      techProbe: botResources.techProbe + this.resources.techProbe,
      techTelescope: botResources.techTelescope + this.resources.techTelescope,
      techComputer: botResources.techComputer + this.resources.techComputer,
      probeCount: botResources.probeCount + this.resources.probeCount
    }
    // data bonus
    if (initialData < 2 && result.data >= 2) {
      result.publicity += 1
    }
    if (initialData < 4 && result.data >= 4) {
      result.progress += 4
    }
    // limit publicity
    if (result.publicity > 10) {
      result.publicity = 10
    }
    return result
  }

  public getDrawAdvancedCardCount(botResources: BotResources, gameBoardResources : BotGameBoardResources) : number {
    const initialProgress = botResources.progress
    const newProgress = this.merge(botResources, gameBoardResources).progress
    let count = 0
    for (let i = initialProgress; i < newProgress; i++) {
      if (i % 12 == 0) {
        count++
      }
    }
    return count
  }

}
