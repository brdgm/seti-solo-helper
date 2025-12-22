import Cards from '@/services/Cards'
import AlienSpecies from '@/services/enum/AlienSpecies'
import CardType from '@/services/enum/CardType'
import Expansion from '@/services/enum/Expansion'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('S.1')

    expect(card).not.undefined
    expect(card?.id).to.eq('S.1')
  })

  it('getAll', () => {
    expect(Cards.getAll(CardType.STARTER, []).length).to.eq(4)
    expect(Cards.getAll(CardType.ADVANCED, []).length).to.eq(10)
    expect(Cards.getAll(CardType.ALIEN, []).length).to.eq(5)
  })

  it('getAll-spaceAgencies', () => {
    expect(Cards.getAll(CardType.STARTER, [Expansion.SPACE_AGENCIES_ORGANIZATIONS]).length).to.eq(5)
    expect(Cards.getAll(CardType.ADVANCED, [Expansion.SPACE_AGENCIES_ORGANIZATIONS]).length).to.eq(10)
    expect(Cards.getAll(CardType.ALIEN, [Expansion.SPACE_AGENCIES_SPECIES]).length).to.eq(8)
  })

  it('getAlienSpeciesCard', () => {
    for (const alienSpecies of getAllEnumValues(AlienSpecies)) {
      expect(Cards.getAlienSpeciesCard(alienSpecies)).to.not.undefined
    }
  })
})
