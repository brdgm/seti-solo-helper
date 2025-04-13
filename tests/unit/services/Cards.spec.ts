import Cards from '@/services/Cards'
import AlienSpecies from '@/services/enum/AlienSpecies'
import CardType from '@/services/enum/CardType'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('S.1')

    expect(card).not.undefined
    expect(card?.id).to.eq('S.1')
  })

  it('getAll', () => {
    expect(Cards.getAll(CardType.STARTER).length).to.eq(4)
    expect(Cards.getAll(CardType.ADVANCED).length).to.eq(10)
    expect(Cards.getAll(CardType.ALIEN).length).to.eq(5)
  })

  it('getAlienSpeciesCard', () => {
    getAllEnumValues(AlienSpecies).forEach(alienSpecies => {
      expect(Cards.getAlienSpeciesCard(alienSpecies)).to.not.undefined
    })
  })
})
