import { expect } from 'chai'
import getInitialBotResources from '@/util/getInitialBotResources'

describe('util/getInitialBotResources', () => {
  it('getInitialBotResources', () => {
    const resources = getInitialBotResources()
    expect(resources.progress).to.eq(1)
    expect(resources.publicity).to.eq(4)
  })
})
