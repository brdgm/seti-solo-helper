import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'

/**
 * Automa cards.
 */
const cards : Card[] = [
  {
    id: '5-10A-12',
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
