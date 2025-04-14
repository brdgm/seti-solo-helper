import { expect } from 'chai'
import getInitialBotResources from '@/util/getInitialBotResources'
import Player from '@/services/enum/Player'

describe('util/getInitialBotResources', () => {
  it('startplayer-bot', () => {
    const resources = getInitialBotResources(Player.BOT)
    expect(resources.progress).to.eq(1)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(1)
  })

  it('startplayer-player', () => {
    const resources = getInitialBotResources(Player.PLAYER)
    expect(resources.progress).to.eq(1)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(2)
  })
})
