import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import DifficultyLevel from './enum/DifficultyLevel'
import CardType from './enum/CardType'

/**
 * Manages the solo card deck with action cards and advanced reserve cards.
 */
export default class CardDeck {

  private _pile
  private _discard
  private _advanced

  private constructor(pile : Card[], discard : Card[], advanced : Card[]) {
    this._pile = ref(pile)
    this._discard = ref(discard)
    this._advanced = ref(advanced)
  }

  public get currentCard() : Card|undefined {
    return this._discard.value[0]
  }

  public get pile() : readonly Card[] {
    return this._pile.value
  }

  public get discard() : readonly Card[] {
    return this._discard.value
  }

  public get advanced() : readonly Card[] {
    return this._advanced.value
  }

  public get pileEmpty() : boolean {
    return this._pile.value.length == 0
  }

  /**
   * Draws next card.
   * If not sufficient cards are left, an error is thrown.
   * @returns Next action card
   */
  public draw() : Card {
    const card = this._pile.value.shift()
    if (!card) {
      throw new Error('Pile is empty.')
    }
    this._discard.value.unshift(card)
    return card
  }

  /**
   * Adds the next advanced card (if any) to top of the pile.
   */
  public addAdvancedCard() {
    const card = this._advanced.value.shift()
    if (card) {
      this._pile.value.unshift(card)
    }
  }

  /**
   * Reshuffle deck for next round.
   */
  public prepareForNextRound() {
    this._pile.value = shuffle([...this._pile.value, ...this._discard.value])
    this._discard.value = []
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id),
      advanced: this._advanced.value.map(card => card.id),
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param difficultyLevel DifficultyLevel
   */
  public static new(difficultyLevel: DifficultyLevel) : CardDeck {
    const starterCards = shuffle(Cards.getAll(CardType.STARTER))
    const advancedCards = shuffle(Cards.getAll(CardType.ADVANCED))
    let cards : Card[]
    let advanced : Card[]
    if ([DifficultyLevel.LEVEL_3, DifficultyLevel.LEVEL_4, DifficultyLevel.LEVEL_5].includes(difficultyLevel)) {
      cards = shuffle([...starterCards, advancedCards[0]])
      advanced = advancedCards.slice(1)
    }
    else {
      cards = starterCards
      advanced = advancedCards
    }
    return new CardDeck(cards, [], advanced)
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get),
      persistence.advanced.map(Cards.get),
    )
  }

}
