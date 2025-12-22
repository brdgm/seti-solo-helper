import { expect } from 'chai'
import getAlienSpecies from '@/util/getAlienSpecies'
import AlienSpecies from '@/services/enum/AlienSpecies'
import Expansion from '@/services/enum/Expansion'

describe('util/getAlienSpecies.spec', () => {
  it('baseGame', () => {
    expect(getAlienSpecies([])).to.deep.eq([
      AlienSpecies.MASCAMITES,
      AlienSpecies.ANOMALIES,
      AlienSpecies.OUMUAMUA,
      AlienSpecies.CENTAURIANS,
      AlienSpecies.EXERTIANS
    ])
  })

  it('spaceAgencies', () => {
    expect(getAlienSpecies([Expansion.SPACE_AGENCIES_SPECIES])).to.deep.eq([
      AlienSpecies.MASCAMITES,
      AlienSpecies.ANOMALIES,
      AlienSpecies.OUMUAMUA,
      AlienSpecies.CENTAURIANS,
      AlienSpecies.EXERTIANS,
      AlienSpecies.ARKHOS,
      AlienSpecies.GLYPHIDS,
      AlienSpecies.AMOEBA
    ])
  })
})
