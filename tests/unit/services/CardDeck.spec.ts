import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.actionCard, 'actionCard').to.not.undefined
    expect(deck.criteriaCard, 'criteriaCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(20)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(20)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile:['5-10A-12','5-9A-8','3-6A-9'], discard:[]})

    deck.draw()
    expect(deck.actionCard?.id, 'actionCard').to.eq('5-9A-8')
    expect(deck.criteriaCard?.id, 'criteriaCard').to.eq('5-10A-12')

    deck.draw()
    expect(deck.actionCard?.id, 'actionCard').to.eq('3-6A-9')
    expect(deck.criteriaCard?.id, 'criteriaCard').to.eq('5-9A-8')

    deck.draw()
    expect(deck.actionCard, 'actionCard').to.not.undefined
    expect(deck.criteriaCard, 'criteriaCard').to.not.undefined
  })
})
