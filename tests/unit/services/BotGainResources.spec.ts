import BotGainResources from '@/services/BotGainResources'
import Action from '@/services/enum/Action'
import TechType from '@/services/enum/TechType'
import { BotResources } from '@/store/state'
import { expect } from 'chai'

describe('services/BotGainResources', () => {
  it('empty', () => {
    const underTest = new BotGainResources()
    expect(underTest.resources).to.eql(resources({}))
  })

  it('gain-values', () => {
    const underTest = new BotGainResources()

    underTest.gainProgressSingleStep.value = 2
    underTest.gainProgressIncomeIncrease.value = 1
    underTest.gainPublicity.value = 3
    underTest.gainData.value = 4
    underTest.gainVP.value = 5

    expect(underTest.resources).to.eql(resources({
      progress: 2 + 1 * 4,
      publicity: 3,
      data: 4,
      vp: 5
    }))
  })

  it('apply-tech', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.TECH, publicityCost: 6, progress: 1}, TechType.PROBE)

    expect(underTest.resources).to.eql(resources({
      progress: 1,
      publicity: -6,
      techProbe: 1
    }))
  })

  it('apply-launch', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.LAUNCH, publicity:2, progress:1})

    expect(underTest.resources).to.eql(resources({
      progress: 1,
      publicity: 2,
      probeCount: 1
    }))
  })

  it('apply-probe', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.PROBE, movementPoints:1, planets:[], probeActions:[]})

    expect(underTest.resources).to.eql(resources({
      probeCount: -1
    }))
  })

  it('apply-probe-tech', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.PROBE, movementPoints:1, planets:[], probeActions:[]}, TechType.PROBE)

    expect(underTest.resources).to.eql(resources({
      techProbe: -1,
      probeCount: -1      
    }))
  })

  it('apply-telescope', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.TELESCOPE, scanSector:[]})

    expect(underTest.resources).to.eql(resources({}))
  })

  it('apply-telescope-tech', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.TELESCOPE, scanSector:[]}, TechType.TELESCOPE)

    expect(underTest.resources).to.eql(resources({
      techTelescope: -1
    }))
  })

  it('apply-analyze', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.ANALYZE, victoryPoints: 2})

    expect(underTest.resources).to.eql(resources({
      data: -6,
      vp: 2
    }))
  })

  it('apply-analyze-tech', () => {
    const underTest = new BotGainResources()
    underTest.applyAction({action:Action.ANALYZE, victoryPoints: 2}, TechType.COMPUTER)

    expect(underTest.resources).to.eql(resources({
      progress: 1,
      data: -6,
      vp: 5,
      techComputer: -1,
    }))
  })

  it('merge', () => {
    const underTest = new BotGainResources()

    underTest.gainProgressSingleStep.value = 2
    underTest.gainProgressIncomeIncrease.value = 1
    underTest.gainPublicity.value = 3
    underTest.gainData.value = 4
    underTest.gainVP.value = 5

    underTest.applyAction({action:Action.ANALYZE, victoryPoints: 2}, TechType.COMPUTER)

    expect(underTest.merge(resources({
      progress: 1,
      publicity: 2,
      data: 7,
      vp: 4,
      techProbe: 1,
      techTelescope: 3,
      techComputer: 2
    }))).to.eql(resources({
      progress: 12,
      publicity: 6,
      data: 5,
      vp: 14,
      techProbe: 1,
      techTelescope: 3,
      techComputer: 1
    }))
  })

  it('merge-data-bonus', () => {
    const underTest = new BotGainResources()

    underTest.gainData.value = 1
    expect(underTest.merge(resources({}))).to.eql(resources({data: 1}))

    underTest.gainData.value = 2
    expect(underTest.merge(resources({}))).to.eql(resources({publicity:1, data: 2}))

    underTest.gainData.value = 4
    expect(underTest.merge(resources({}))).to.eql(resources({progress:4, publicity:1, data: 4}))

    underTest.gainData.value = 0
    underTest.applyAction({action:Action.ANALYZE, victoryPoints: 0})
    expect(underTest.merge(resources({data:8}))).to.eql(resources({publicity:1, data: 2}))
  })

  it('merge-data-bonus-analyze', () => {
    const underTest = new BotGainResources()

    underTest.applyAction({action:Action.ANALYZE, victoryPoints: 0})

    expect(underTest.merge(resources({data:8}))).to.eql(resources({publicity:1, data: 2}))
    expect(underTest.merge(resources({data:10}))).to.eql(resources({progress:4, publicity:1, data: 4}))
  })

  it('getDrawAdvancedCardCount', () => {
    const underTest = new BotGainResources()

    expect(underTest.getDrawAdvancedCardCount(resources({progress:1}))).to.eq(0)

    underTest.gainProgressSingleStep.value = 11
    expect(underTest.getDrawAdvancedCardCount(resources({progress:1}))).to.eq(0)

    underTest.gainProgressSingleStep.value = 12
    expect(underTest.getDrawAdvancedCardCount(resources({progress:1}))).to.eq(1)

    underTest.gainProgressSingleStep.value = 28
    expect(underTest.getDrawAdvancedCardCount(resources({progress:1}))).to.eq(2)
  })
})

function resources(params:{progress?: number, publicity?: number, data?: number, vp?: number,
    techProbe?: number, techTelescope?: number, techComputer?: number, probeCount?: number}) : BotResources {
  return {
    progress: params.progress || 0,
    publicity: params.publicity || 0,
    data: params.data || 0,
    vp: params.vp || 0,
    techProbe: params.techProbe || 0,
    techTelescope: params.techTelescope || 0,
    techComputer: params.techComputer || 0,
    probeCount: params.probeCount || 0
  }
}
