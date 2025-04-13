import Cards from '@/services/Cards'
import CardType from '@/services/enum/CardType'
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
})
