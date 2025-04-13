import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'

describe('services/CardDeck', () => {
  it('new-1', () => {
    const deck = CardDeck.new(DifficultyLevel.LEVEL_1)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(4)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.advanced.length, 'advanced').to.eq(10)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(4)
    expect(persistence.discard.length, 'discard').to.eq(0)
    expect(persistence.advanced.length, 'advanced').to.eq(10)
  })

  it('new-3', () => {
    const deck = CardDeck.new(DifficultyLevel.LEVEL_3)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(5)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.advanced.length, 'advanced').to.eq(9)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(5)
    expect(persistence.discard.length, 'discard').to.eq(0)
    expect(persistence.advanced.length, 'advanced').to.eq(9)
  })

  it('draw', () => {
    const deck = mockCardDeck({pile:['S.1','S.5','S.2']})

    deck.draw()
    expect(deck.currentCard?.id).to.eq('S.1')
    expect(deck.pileEmpty).to.false

    deck.draw()
    expect(deck.currentCard?.id).to.eq('S.5')
    expect(deck.pileEmpty).to.false

    deck.draw()
    expect(deck.currentCard?.id).to.eq('S.2')
    expect(deck.pileEmpty).to.true
  })

  it('addAdvancedCard', () => {
    const deck = mockCardDeck({pile:['S.1','S.5','S.2'],advanced:['S.6','S.7']})

    deck.addAdvancedCard()
    expect(deck.pile.length, 'pile').to.eq(4)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.advanced.length, 'advanced').to.eq(1)

    deck.draw()
    expect(deck.currentCard?.id).to.eq('S.6')

    deck.draw()
    expect(deck.currentCard?.id).to.eq('S.1')
  })

  it('prepareForNextRound', () => {
    const deck = mockCardDeck({pile:['S.1'],discard:['S.5','S.2'],advanced:['S.6','S.7']})

    deck.prepareForNextRound()
    expect(deck.pile.length, 'pile').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.advanced.length, 'advanced').to.eq(2)
  })
})
