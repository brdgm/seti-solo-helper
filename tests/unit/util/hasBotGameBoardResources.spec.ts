import { expect } from 'chai'
import hasBotGameBoardResources from '@/util/hasBotGameBoardResources'
import BotGameBoardResources from '@/services/BotGameBoardResources'

describe('util/hasBotGameBoardResources', () => {
  it('empty', () => {
    expect(hasBotGameBoardResources({})).to.false
  })

  it('values', () => {
    expect(hasBotGameBoardResources({progressSingleStep:1} as BotGameBoardResources)).to.true
    expect(hasBotGameBoardResources({progressIncomeIncrease:1} as BotGameBoardResources)).to.true
    expect(hasBotGameBoardResources({publicity:1} as BotGameBoardResources)).to.true
    expect(hasBotGameBoardResources({data:1} as BotGameBoardResources)).to.true
    expect(hasBotGameBoardResources({vp:1} as BotGameBoardResources)).to.true
  })
})
