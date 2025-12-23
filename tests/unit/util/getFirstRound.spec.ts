import { expect } from 'chai'
import Expansion from '@/services/enum/Expansion'
import getFirstRound from '@/util/getFirstRound'

describe('util/getFirstRound', () => {
  it('baseGame', () => {
    expect(getFirstRound([])).to.eq(1)
  })

  it('spaceAgencies', () => {
    expect(getFirstRound([Expansion.SPACE_AGENCIES_ORGANIZATIONS])).to.eq(2)
  })
})
