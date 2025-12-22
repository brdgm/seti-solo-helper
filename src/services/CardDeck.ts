import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import DifficultyLevel from './enum/DifficultyLevel'
import CardType from './enum/CardType'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import Expansion from './enum/Expansion'

/**
 * Manages the solo card deck with action cards and advanced reserve cards.
 */
export default class CardDeck {

  private readonly _pile
  private readonly _discard
  private readonly _advanced

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
   * Adds further advanced cards (if available) to top of the pile.
   * @param count Number of advanced cards to add
   * @returns Number cards that could not be added (not enough advanced cards left)
   */
  public addAdvancedCards(count: number) : number {
    let actualCount = 0
    for (let i=0; i<count; i++) {
      const card = this._advanced.value.shift()
      if (card) {
        this._pile.value.unshift(card)
        actualCount++
      }
    }
    return count - actualCount
  }

  /**
   * Reshuffle deck for next round.
   */
  public prepareForNextRound() : void {
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
   * @param expansions Expansions
   * @returns CardDeck
   */
  public static new(difficultyLevel: DifficultyLevel, expansions: Expansion[]) : CardDeck {
    const allStarterCards = shuffle(Cards.getAll(CardType.STARTER, expansions))
    const allAdvancedCards = shuffle(Cards.getAll(CardType.ADVANCED, expansions))
    const advancedCardCount = getDifficultyLevelSettings(difficultyLevel).advancedCards
    const cards = shuffle([...allStarterCards, ...allAdvancedCards.slice(0, advancedCardCount)])
    const advanced = allAdvancedCards.slice(advancedCardCount)
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
