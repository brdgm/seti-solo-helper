import { expect } from 'chai'
import getRandomGoldScoreTileSetup from '@/util/getRandomGoldScoreTileSetup'

describe('util/getRandomGoldScoreTileSetup', () => {
  it('getRandomGoldScoreTileSetup', () => {
    const setup = getRandomGoldScoreTileSetup()
    expect(setup.tile.length).to.eq(4)
    expect(setup.side.length).to.eq(4)
  })
})
