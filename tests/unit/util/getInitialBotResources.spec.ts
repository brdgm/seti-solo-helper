import { expect } from 'chai'
import getInitialBotResources from '@/util/getInitialBotResources'
import Player from '@/services/enum/Player'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/getInitialBotResources', () => {
  it('startplayer-bot', () => {
    const resources = getInitialBotResources(Player.BOT, DifficultyLevel.LEVEL_1)
    expect(resources.progress).to.eq(1)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(1)
  })

  it('startplayer-player', () => {
    const resources = getInitialBotResources(Player.PLAYER, DifficultyLevel.LEVEL_1)
    expect(resources.progress).to.eq(1)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(2)
  })

  it('startplayer-bot-level4', () => {
    const resources = getInitialBotResources(Player.BOT, DifficultyLevel.LEVEL_4)
    expect(resources.progress).to.eq(4)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(1)
  })

  it('startplayer-bot-level5', () => {
    const resources = getInitialBotResources(Player.BOT, DifficultyLevel.LEVEL_5)
    expect(resources.progress).to.eq(9)
    expect(resources.publicity).to.eq(4)
    expect(resources.vp).to.eq(1)
  })
})
