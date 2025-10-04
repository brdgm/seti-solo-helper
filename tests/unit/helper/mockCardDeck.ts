import CardDeck from '@/services/CardDeck'

export default function mockCardDeck(params?: MockCardDeckParams, drawCount: number = 0) : CardDeck {  
  const cardDeck = CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? [],
    advanced: params?.advanced ?? []
  })
  for (let i=0; i<drawCount; i++) {
    cardDeck.draw()
  }
  return cardDeck
}

export interface MockCardDeckParams {
  pile?: string[]
  discard?: string[]
  advanced?: string[]
}
