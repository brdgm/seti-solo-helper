import { expect } from 'chai'
import getInitialBotGameBoardResources from '@/util/getInitialBotGameBoardResources'
import Action from '@/services/enum/Action'
import ScanSector from '@/services/enum/ScanSector'
import TechType from '@/services/enum/TechType'

describe('util/getInitialBotGameBoardResources', () => {
  it('telescope', () => {
    const resources = getInitialBotGameBoardResources({action:Action.TELESCOPE, scanSector: [ScanSector.EARTH,ScanSector.CARD]})
    expect(resources).to.eql({data: 2})
  })

  it('telescope-tech', () => {
    const resources = getInitialBotGameBoardResources({action:Action.TELESCOPE, scanSector: [ScanSector.EARTH,ScanSector.CARD]}, TechType.TELESCOPE)
    expect(resources).to.eql({data: 3})
  })

  it('other', () => {
    const resources = getInitialBotGameBoardResources({action:Action.ANALYZE, victoryPoints: 1}, TechType.COMPUTER)
    expect(resources).to.eql({})
  })
})
